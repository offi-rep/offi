const express = require('express');
const router = express.Router();
const pgPool = require('../startup/db');
const logger = require('../startup/logging');

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

router.get('/:secondUserId/count', async (req,res) => {
    const userId = req.header('userId');
    const secondUserId = req.params.secondUserId;
    logger.info(`user ${userId} ask how many messages he didnt read from user ${secondUserId}`)

    //select how many messages secondUserId sent me and I didn't read them
    const queryGetMessages = {
        text: "SELECT CAST(count(is_read) AS Integer) FROM messages where is_read=false AND ((from_user_id=$1 AND to_user_id=$2));",
        values: [secondUserId, userId]
    }

    const queryMarkRead = {
        text: "UPDATE messages SET is_read=true WHERE from_user_id=$1 AND to_user_id=$2 AND is_read=false",
        values: [secondUserId, userId]
    }

    //mark old messages as read
    try {
        await (pgPool.query(queryMarkRead));
    } catch (ex) {
        logger.warn(`Couldnt mark messages as is_read=true - error message: ${ex.message}`);
    }

    //get the messages
    try {
        const queryGetMessagesResult = await pgPool.query(queryGetMessages);
        logger.info(`there are ${queryGetMessagesResult.rows[0].count} unread messages from ${secondUserId} to user ${userId} `);
        return res.status(200).send(JSON.stringify({result: 'Success', data: queryGetMessagesResult.rows[0].count}));
    } catch (ex) {
        logger.error(`error for select unread messages: ${JSON.stringify(ex)}`);
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}));
    }
});

router.post('/', async (req,res) => {
    const userId = req.header('userId');
    const {secondUserId,message} = req.body;
    logger.info(`user sending message. from ${userId} to ${secondUserId}: ${message} `);

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
        logger.info(`message sent ${message}`);
        pgPool.query(queryUpdateLastMessage);
        return res.status(201).send(JSON.stringify({result: 'Success', data: 'Message sent'}));
    } catch (ex) {
        logger.error(`couldnt post new message. ${JSON.stringify(req.body)} \n error msg: ${ex.message}`);
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}))
    }
});



module.exports = router;