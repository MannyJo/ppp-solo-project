const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'
];
const TOKEN_PATH = './server/modules/token.json';

router.post('/send', (req, res) => {
    console.log('in /api/email/send POST');

    pool.query(`
        SELECT
            *
        FROM
            "gmail_credentials" ;
    `).then(results => {

        const content = {
            "installed": {
                "client_id": results.rows.filter(obj => obj.name === 'client_id')[0].content,
                "project_id": results.rows.filter(obj => obj.name === 'project_id')[0].content,
                "auth_uri": results.rows.filter(obj => obj.name === 'auth_uri')[0].content,
                "token_uri": results.rows.filter(obj => obj.name === 'token_uri')[0].content,
                "auth_provider_x509_cert_url": results.rows.filter(obj => obj.name === 'auth_provider_x509_cert_url')[0].content,
                "client_secret": results.rows.filter(obj => obj.name === 'client_secret')[0].content,
                "redirect_uris": results.rows.filter(obj => obj.name === 'redirect_uris')[0].content.split(',')
            }
        };
        
        authorize(content, sendEmail, req);
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error sending emails', error);
        res.sendStatus(500);
    });
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, req) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback, req);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, req);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback, req) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client, req);
        });
    });
}

async function sendEmail(auth, req) {
    const gmail = google.gmail({ version: 'v1', auth });

    const userInfo = req.user.user_name + ' <' + req.user.user_email + '>';
    const friendEmails = req.body.friendList.map(friend => friend.friend_name + ' <' + friend.friend_email + '>').join(', ');
    const link = req.protocol+'://'+req.body.eventUrl;

    // You can use UTF-8 encoding for the subject using the method below.
    // You can also just use a plain string if you don't need anything fancy.
    const subject = `You\'re invited !!`;
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
        `From: ${userInfo}`,
        `To: ${friendEmails}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: ${utf8Subject}`,
        '',
        `You\'re invited by ${req.user.user_name} !!`,
        `
            <p>You can open the invitation by clicking below</p>
            <a href="${link}">Open the invitation</a>
        `,
    ];
    const message = messageParts.join('\n');

    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    //   const res = await 
    gmail.users.messages.send({
        userId: 'jomansang@gmail.com',
        resource: {
            raw: encodedMessage,
        },
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data);
    });
}

module.exports = router;