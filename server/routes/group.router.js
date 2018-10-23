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
            *
        FROM
            "group"
        WHERE
            "user_id" = $1
        ORDER BY
            "id" ASC ;
    `, [ req.user.id ]).then(results => {
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

});

module.exports = router;