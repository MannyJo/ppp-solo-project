const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in /api/friend GET');

    pool.query(`
        SELECT
            "fr"."id",
            "fr"."friend_name",
            "fr"."friend_email",
            "fr"."group_id",
            "gr"."group_name"
        FROM
            "friend" AS "fr"
            LEFT JOIN "group" AS "gr"
                On "fr"."group_id" = "gr"."id"
        WHERE
            "fr"."user_id" = $1
        ORDER BY
            "fr"."friend_name" ASC
        ;
    `, [ req.user.id ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting friends :', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log('in /api/friend POST');

    pool.query(`
        INSERT INTO "friend" ( "user_id", "group_id", "friend_name", "friend_email" )
        VALUES ( $1, $2, $3, $4 );
    `, [
        req.user.id,
        req.body.groupId,
        req.body.friendName,
        req.body.friendEmail
    ]).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error inserting friends :', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    console.log('in /api/friend DELETE');

    pool.query(`
        DELETE FROM "friend"
        WHERE "id" = $1 ;
    `, [ req.params.id ]).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error deleting friends :', error);
        res.sendStatus(500);
    });
});

module.exports = router;