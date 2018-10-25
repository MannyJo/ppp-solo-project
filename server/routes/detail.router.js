const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('in /api/detail GET');
    // console.log('id :', req.params.id);

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
            "ef"."show_secret"
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

module.exports = router;