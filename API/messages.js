const express = require('express');
const router = express.Router();
const pgPool = require('../startup/db');
const logger = require('../startup/logging');

const {getMessages, addMessage} = require('../data/msgs');

router.get('/:secondUserId', async (req,res) => {
    const userId = req.header('userId');
    const secondUserId = req.params.secondUserId;

    logger.info(`user (${userId}) is looking for his chat with user (${secondUserId})`);
    const query = {
        text: "SELECT * FROM messages WHERE (from_user_id=$1 AND to_user_id=$2) OR (from_user_id=$2 AND to_user_id=$1) ORDER BY time_sent DESC",
        values: [userId, secondUserId]
    }

    const queryResult = await pgPool.query(query);
    logger.info(`finished searching. ${JSON.stringify(queryResult.rows)}`);

    res.status(200).send(JSON.stringify({result: 'Success', data: queryResult.rows}));
});

router.post('/', async (req,res) => {
    const userId = req.header('userId');
    const {secondUserId,message} = req.body;

    const querySendMessage = {
        text: "INSERT INTO messages(from_user_id,to_user_id,message) SELECT $1,$2,$3",
        values: [userId, secondUserId, message]
    }

    const queryUpdateLastMessage = {
        text: "UPDATE matches SET last_message=$1 WHERE (first_user_id=$2 AND second_user_id=$3) OR (first_user_id=$3 AND second_user_id=$2)",
        values: [message, userId, secondUserId]
    }

    try {
        await pgPool.query(querySendMessage);
        await pgPool.query(queryUpdateLastMessage);
        return res.status(201).send(JSON.stringify({result: 'Success', data: 'Message sent'}));
    } catch (ex) {
        logger.error(`couldnt post new message. ${JSON.stringify(req.body)} \n error msg: ${ex.message}`);
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}))
    }
})

module.exports = router;