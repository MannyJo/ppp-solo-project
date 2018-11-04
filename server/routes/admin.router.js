const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in /api/admin GET');

    pool.query(`
        SELECT
            COUNT("id") AS "count"
        FROM
            "user"
        ;
    `).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting total user count :', error);
        res.sendStatus(500);
    })
});

router.get('/:year', (req, res) => {
    console.log('in /api/admin/year GET');
    const year = req.params.year;

    const yearSelect = `
        SELECT
            'Jan' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '01')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Feb' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '02')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Mar' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '03')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Apr' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '04')
            , 0) AS "count"
        UNION ALL
        SELECT
            'May' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '05')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Jun' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '06')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Jul' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '07')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Aug' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '08')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Sep' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '09')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Oct' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '10')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Nov' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '11')
            , 0) AS "count"
        UNION ALL
        SELECT
            'Dec' AS "month",
            COALESCE(
                (SELECT
                    COUNT("id") AS "count"
                FROM
                    "user"
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM')
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1
                    AND TO_CHAR("timestamp", 'MM') = '12')
            , 0) AS "count"
        ;
    `;

    pool.query(yearSelect, [
        year
    ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting user data :', error);
        res.sendStatus(500);
    });
});

router.get('/:year/:month', (req, res) => {
    console.log('in /api/admin/year GET');

    const year = req.params.year;
    const month = req.params.month<10?'0'+req.params.month:req.params.month;

    const monthSelect = `
        SELECT
            'Sun' AS "day",
            COALESCE(
                (SELECT
                    COUNT(*) AS "count"
                FROM
                    "user"
                WHERE
                    1=1
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM'),
                    DATE_PART('DOW', "timestamp")
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1 
                    AND TO_CHAR("timestamp", 'MM') = $2
                    AND DATE_PART('DOW', "timestamp") = 0)
            , 0) AS "count"
        UNION ALL
        SELECT
            'Mon' AS "day",
            COALESCE(
                (SELECT
                    COUNT(*) AS "count"
                FROM
                    "user"
                WHERE
                    1=1
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM'),
                    DATE_PART('DOW', "timestamp")
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1 
                    AND TO_CHAR("timestamp", 'MM') = $2
                    AND DATE_PART('DOW', "timestamp") = 1)
            , 0) AS "count"
        UNION ALL
        SELECT
            'Tue' AS "day",
            COALESCE(
                (SELECT
                    COUNT(*) AS "count"
                FROM
                    "user"
                WHERE
                    1=1
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM'),
                    DATE_PART('DOW', "timestamp")
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1 
                    AND TO_CHAR("timestamp", 'MM') = $2
                    AND DATE_PART('DOW', "timestamp") = 2)
            , 0) AS "count"
        UNION ALL
        SELECT
            'Wed' AS "day",
            COALESCE(
                (SELECT
                    COUNT(*) AS "count"
                FROM
                    "user"
                WHERE
                    1=1
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM'),
                    DATE_PART('DOW', "timestamp")
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1 
                    AND TO_CHAR("timestamp", 'MM') = $2
                    AND DATE_PART('DOW', "timestamp") = 3)
            , 0) AS "count"
        UNION ALL
        SELECT
            'Thu' AS "day",
            COALESCE(
                (SELECT
                    COUNT(*) AS "count"
                FROM
                    "user"
                WHERE
                    1=1
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM'),
                    DATE_PART('DOW', "timestamp")
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1 
                    AND TO_CHAR("timestamp", 'MM') = $2
                    AND DATE_PART('DOW', "timestamp") = 4)
            , 0) AS "count"
        UNION ALL
        SELECT
            'Fri' AS "day",
            COALESCE(
                (SELECT
                    COUNT(*) AS "count"
                FROM
                    "user"
                WHERE
                    1=1
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM'),
                    DATE_PART('DOW', "timestamp")
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1 
                    AND TO_CHAR("timestamp", 'MM') = $2
                    AND DATE_PART('DOW', "timestamp") = 5)
            , 0) AS "count"
        UNION ALL
        SELECT
            'Sat' AS "day",
            COALESCE(
                (SELECT
                    COUNT(*) AS "count"
                FROM
                    "user"
                WHERE
                    1=1
                GROUP BY
                    TO_CHAR("timestamp", 'YYYY'),
                    TO_CHAR("timestamp", 'MM'),
                    DATE_PART('DOW', "timestamp")
                HAVING
                    TO_CHAR("timestamp", 'YYYY') = $1 
                    AND TO_CHAR("timestamp", 'MM') = $2
                    AND DATE_PART('DOW', "timestamp") = 6)
            , 0) AS "count"
        ;
    `;

    pool.query(monthSelect, [
        year, month
    ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting user data :', error);
        res.sendStatus(500);
    });
});

module.exports = router;