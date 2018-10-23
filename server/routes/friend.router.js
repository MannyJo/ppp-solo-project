const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in /api/friend GET');

    pool.query(`
        SELECT
            *
        FROM
            "friend"
        WHERE
            "user_id" = $1
        ;
    `, [ req.user.id ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting friends :', error);
        res.sendStatus(500);
    })
});

module.exports = router;