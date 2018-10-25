const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('in /api/detail GET');
    // console.log('id :', req.params.id);

    pool.query(`
        SELECT
            *
        FROM
            "event"
        WHERE
            "id" = $1 ;
    `, [ req.params.id ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting event item :', error);
        res.sendStatus(500);
    });
});

module.exports = router;