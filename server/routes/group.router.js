const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in /api/group GET');

    pool.query(`
        SELECT
            "gr"."id",
            "gr"."group_name",
            COUNT("fr"."id") AS "members"
        FROM
            "group" AS "gr"
            LEFT JOIN "friend" AS "fr"
                ON "gr"."id" = "fr"."group_id"
        WHERE
            "gr"."user_id" = $1
        GROUP BY
            "gr"."id"
        ORDER BY
            "gr"."id" ASC ;
    `, [ req.user.id ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting groups :', error);
        res.sendStatus(500);
    });
});

/**
 * GET route template
 */
router.get('/:keyword', (req, res) => {
    console.log('in /api/group GET');

    pool.query(`
        SELECT
            "gr"."id",
            "gr"."group_name",
            COUNT("fr"."id") AS "members"
        FROM
            "group" AS "gr"
            LEFT JOIN "friend" AS "fr"
                ON "gr"."id" = "fr"."group_id"
        WHERE
            "gr"."user_id" = $1
            AND "gr"."group_name" ILIKE '%'||$2||'%'
        GROUP BY
            "gr"."id"
        ORDER BY
            "gr"."id" ASC ;
    `, [ 
        req.user.id,
        req.params.keyword
    ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting groups :', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in /api/group POST');

    pool.query(`
        INSERT INTO "group" ( "group_name", "user_id" )
        VALUES ( $1, $2 );
    `, [ 
        req.body.groupName,
        req.user.id
     ]).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error inserting a group :', error);
        res.sendStatus(500);
    });
});

/**
 * DELETE route templete
 */
router.delete('/:id', (req, res) => {
    console.log('in /api/group DELETE');

    pool.query(`
        DELETE FROM "group"
        WHERE "id" = $1 ;
    `, [ req.params.id ])
    .then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error deleting a group :', error);
        res.sendStatus(500);
    });
});

router.put('/update', (req, res) => {
    console.log('in /api/group PUT');
    
    pool.query(`
        UPDATE "group"
        SET "group_name" = $1
        WHERE "id" = $2 ;
    `, [
        req.body.groupName,
        req.body.groupId
    ]).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error updating a group :', error);
        res.sendStatus(500);
    });
});

module.exports = router;