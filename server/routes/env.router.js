const express = require('express');
const router = express.Router();

const API_KEY = process.env.API_KEY;

router.get('/map', (req, res) => {
    res.send(API_KEY);
});

module.exports = router;