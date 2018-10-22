const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for sending event list
 */
router.get('/', (req, res) => {
    console.log('in /api/event GET');
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
    console.log('in /api/event POST');
    res.sendStatus(201);
});

/**
 * DELETE route
 */
router.delete('/:id', (req, res) => {
    console.log('in /api/event DELETE');
    
    pool.query(`
        DELETE FROM "event"
        WHERE "id" = $1 ;
    `, [ req.params.id ]).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error getting event list :', error);
        res.sendStatus(500);
    });
});

module.exports = router;