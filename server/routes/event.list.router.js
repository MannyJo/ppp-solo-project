const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for sending event list
 */
router.get('/', (req, res) => {
    pool.query(`
        SELECT
            ROW_NUMBER() OVER (ORDER BY "start_date" ASC) as "number",
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
            "start_date" DESC ;
    `).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting event list :', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;