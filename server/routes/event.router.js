const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const fs = require('fs');

/**
 * GET route for sending event list
 */
router.get('/', (req, res) => {
    console.log('in /api/event GET');
    pool.query(`
        SELECT
            ROW_NUMBER() OVER (ORDER BY "start_date" ASC, "id" ASC) as "number",
            "id",
            "user_id",
            "title",
            to_char("start_date", 'MM/DD/YYYY') as "start_date",
            to_char("end_date", 'MM/DD/YYYY') as "end_date",
            "message",
            "secret_message",
            "address",
            "lng",
            "lat",
            "img_url"
        FROM
            "event"
        ORDER BY
            "start_date" DESC,
            "id" DESC;
    `).then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error getting event list :', error);
            res.sendStatus(500);
        });
});

/**
 * POST route to insert new invitation data
 */
router.post('/', (req, res) => {
    console.log('in /api/event POST');

    let insertEvent = `
        INSERT INTO "event" (
            "user_id",
            "title",
            "end_date",
            "message",
            "secret_message",
            "address",
            "lng",
            "lat",
            "img_url"
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9
        ) RETURNING "id" ;
    `;

    let insertEventFriend = `
        INSERT INTO "event_friend" (
            "event_id",
            "friend_id",
            "show_secret"
        ) VALUES 
    `;

    let imageFile = req.files.file;

    let writeStream = fs.createWriteStream(`./server/uploadImages/${Date.now()}.jpg`);

    writeStream.write(imageFile.data, 'base64');
    writeStream.on('finish', () => {  
        console.log('wrote all data to file');
    });
    
    // close the stream
    writeStream.end();  

    res.sendStatus(200);

    // imageFile.mv(`${__dirname}/public/123.jpg`, (err) => {
    //     if (err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //     }
    //     res.sendStatus(200);
    //     //   res.json({file: `public/${req.body.filename}.jpg`});
    // });


    // pool.query(insertEvent,[
    //     req.user.id,
    //     req.body.title,
    //     req.body.endDate,
    //     req.body.message,
    //     req.body.secretMessage,
    //     req.body.location,
    //     req.body.lng,
    //     req.body.lat,
    //     req.body.imageUrl
    // ]).then(results => {
    //     const eventId = results.rows[0].id;
    //     let params = [];
    //     let chunks = [];

    //     req.body.selectedFriends.forEach(friend => {
    //         let valueClause = [];
    //         Object.keys(friend).forEach(property => {
    //             if(property === 'id'){
    //                 params.push(eventId);
    //                 valueClause.push('$'+params.length);
    //                 params.push(friend[property]);
    //                 valueClause.push('$'+params.length);
    //             } else if(property === 'checked'){
    //                 params.push(friend[property]);
    //                 valueClause.push('$'+params.length);
    //             }
    //         });
    //         chunks.push('('+valueClause.join(', ')+')');
    //     });

    //     pool.query(insertEventFriend + chunks.join(', ') + ';', params)
    //         .then(() => {
    //             res.sendStatus(201);
    //         }).catch(error => {
    //             console.log('Error inserting new invitation data :', error);
    //             pool.query('DELETE FROM "event" WHERE "id" = $1;', [eventId]);
    //             res.sendStatus(500);
    //         });
    // }).catch(error => {
    //     console.log('Error inserting new invitation data :', error);
    //     res.sendStatus(500);
    // });
});

/**
 * DELETE route
 */
router.delete('/:id', (req, res) => {
    console.log('in /api/event DELETE');

    pool.query(`
        DELETE FROM "event"
        WHERE "id" = $1;
    `, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error getting event list :', error);
            res.sendStatus(500);
        });
});

module.exports = router;