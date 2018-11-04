const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('in /api/detail GET');

    const selectEventDetail = `
        SELECT
            "id",
            "title",
            TO_CHAR("start_date", 'MM/DD/YYYY') AS "start_date",
            TO_CHAR("end_date", 'MM/DD/YYYY') AS "end_date",
            "message",
            "secret_message",
            "address",
            "lng",
            "lat",
            "img_url"
        FROM
            "event"
        WHERE
            "id" = $1 ;
    `;

    const selectEventMembers = `
        SELECT
            "fr"."id",
            "fr"."friend_name",
            "ef"."show_secret",
            "ef"."attend_cd"
        FROM
            "event_friend" AS "ef"
            LEFT JOIN "friend" AS "fr"
                ON "ef"."friend_id" = "fr"."id"
        WHERE
            "ef"."event_id" = $1
        ORDER BY
            "fr"."friend_name" ASC ;
    `;

    Promise.all([
        pool.query(selectEventDetail, [ req.params.id ]), 
        pool.query(selectEventMembers, [ req.params.id ])
    ]).then(results => {
        const eventDetail = {
            detail: results[0].rows[0],
            members: results[1].rows
        };

        res.send(eventDetail);
    }).catch(error => {
        console.log('Error getting event item :', error);
        res.sendStatus(500);
    });
});

router.put('/update', (req, res) => {
    console.log('in /api/detial/update PUT');

    let updateEvent = `
        UPDATE "event"
        SET
            "title" = $1,
            "end_date" = $2,
            "message" = $3,
            "secret_message" = $4,
            "address" = $5,
            "img_url" = $6,
            "lat" = $7,
            "lng" = $8
        WHERE
            "id" = $9 ;
    `;

    let deleteEventFriend = `
        DELETE FROM "event_friend"
        WHERE "event_id" = $1 ;
    `;

    let insertEventFriend = `
        INSERT INTO "event_friend" (
            "event_id",
            "friend_id",
            "show_secret",
            "attend_cd"
        ) VALUES (
            $1, $2, $3, $4
        );
    `;

    Promise.all([
        pool.query(updateEvent, [ 
            req.body.title, 
            req.body.endDate, 
            req.body.message, 
            req.body.secretMessage, 
            req.body.location, 
            req.body.fileName?req.protocol+'://'+req.get('host')+'/api/event/image/'+req.body.fileName:req.body.img_url,
            req.body.lat,
            req.body.lng,
            req.body.id, 
        ]), 
        pool.query(deleteEventFriend, [ req.body.id ])
    ]).then(() => {
        const insertFriends = req.body.selectedFriends.map(friend => (
            pool.query(insertEventFriend, [
                req.body.id, 
                friend.id,
                friend.show_secret,
                friend.attend_cd
            ])
        ));
        
        Promise.all(insertFriends)
            .then(() => {
                res.sendStatus(200);
            }).catch(error => {
                console.log('Error updating event friends info');
            });
    }).catch(error => {
        console.log('Error updating event info');
    });
});

module.exports = router;