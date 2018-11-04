const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id/:email', (req, res) => {
    console.log('in /api/guest GET');

    pool.query(`
        SELECT
            "ev"."id",
            "ev"."title",
            TO_CHAR("ev"."start_date", 'MM/DD/YYYY') AS "start_date",
            TO_CHAR("ev"."end_date", 'MM/DD/YYYY') AS "end_date",
            "ev"."message",
            "ev"."secret_message",
            "ev"."address",
            "ev"."lng",
            "ev"."lat",
            "ev"."img_url",
            "ef"."show_secret",
            "ef"."attend_cd",
            "fr"."id" AS "friend_id"
        FROM
            "event" AS "ev"
            LEFT JOIN "event_friend" AS "ef"
                ON "ev"."id" = "ef"."event_id"
            LEFT JOIN "friend" AS "fr"
                ON "ef"."friend_id" = "fr"."id"
        WHERE
            "ev"."id" = $1
            AND "fr"."friend_email" = $2 ;
    `, [
        req.params.id,
        decodeURIComponent(req.params.email)
    ]).then(results => {
        const response = {
            isVerified: results.rowCount>0?true:false,
            invitation: results.rows
        };
        
        res.send(response);
    }).catch(error => {
        console.log('Error verifying guest user :', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log('in /api/guest POST');

    pool.query(`
        UPDATE "event_friend"
        SET "attend_cd" = $1
        WHERE "event_id" = $2
            AND "friend_id" = $3 ;
    `, [
        req.body.attendCd,
        req.body.eventId,
        req.body.friendId
    ]).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error updating attend status :', error);
        res.sendStatus(500);
    });
});

module.exports = router;