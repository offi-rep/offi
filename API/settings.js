const express = require('express');
const router = express.Router();
const pgPool = require('../startup/db');
const logger = require('../startup/logging');
const _ = require('lodash');

router.get('/', async (req,res) => {
    logger.info('request for all settings');

    const query = {
        text: "SELECT * from users_settings",
        values: null
    }

    const queryResult = await pgPool.query(query);
    logger.debug(`settings found (${queryResult.rowCount}): ${JSON.stringify(queryResult.rows)}`);
    res.status(200).send(JSON.stringify({result: 'Success', data: queryResult.rows}));
});

router.get('/:id', async (req,res) => {
    const userId = req.params.id;

    logger.info(`selecting user ${userId} settings`);
    const query = {
        text: "SELECT * FROM users_settings WHERE user_id=$1",
        values: [userId]
    }

    const queryResult = await pgPool.query(query);
    logger.debug(`user ${userId} settings: ${JSON.stringify(queryResult.rows[0])}`);
    return res.status(200).send(JSON.stringify({result: 'Success', data: queryResult.rows[0]}));
});

router.put('/', async (req,res) => {
    logger.info('user updates his user settings');

    const userId = req.header('userId');
    const {looking_for,search_radius,age_min,age_max,current_location} = req.body;

    const query = {
        text: "UPDATE users_settings SET looking_for=$1, search_radius=$2, age_min=$3, age_max=$4, current_location=$5 WHERE user_id=$6 RETURNING *",
        values: [looking_for, search_radius, age_min, age_max, current_location, userId]
    }
    try {
        const queryResult = await pgPool.query(query);
        logger.debug(`user ${userId} updated his user settings`);
        return res.status(200).send(JSON.stringify({result: 'Success', data: queryResult.rows[0]}));

    } catch (ex) {
        logger.error(ex.message);
        return res.status(500).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}));
    }
})

module.exports = router;