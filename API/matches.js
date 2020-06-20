const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const logger = require('../startup/logging');
const pgPool = require('../startup/db');

router.put('/', async (req,res) => {
    //TODO change to TOKEN
    const userId = req.header('userId');
    const {userLiked, isMatch} = req.body;

    const query = {
        text: "UPDATE matches SET is_matched=$1,date_liked=CURRENT_TIMESTAMP,visited=true WHERE first_user_id=$2 AND second_user_id=$3",
        values: [isMatch, userLiked, userId]
    }

    try {
        await pgPool.query(query);
        if (isMatch == true) {
            logger.debug(`user ${userId} liked back user ${userLiked} and it's a match!`);
            return res.status(200).send(JSON.stringify({result: 'Success', data: {msg: `matched!`}}));
        } else {
            logger.debug(`user ${userId} liked user ${userLiked} but it's not a match`);
            return res.status(200).send(JSON.stringify({result: 'Success', data: {msg: `not matched!`}}));
        }
    } catch (ex) {
        logger.error(`failed to update match for ${userId} and ${userLiked}: ${JSON.stringify(ex)}`);
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}));
    }

});

router.post('/', async (req,res) => {
    const userId = req.header('userId');
    const {userLiked, isLiked} = req.body;

    //TODO: re-check the likedUser hasn't liked this user yet.

    const query = {
        text: "INSERT INTO matches(first_user_id,second_user_id,liked) VALUES($1,$2,$3)",
        values: [userId, userLiked, isLiked]
    }
    
    try{
        await pgPool.query(query);
        logger.debug(`user ${userId} ${!isLiked?'dis':''}liked user ${userLiked}`);
        return res.status(201).send(JSON.stringify({result: 'Success', data: {msg: `User ${userId} ${!isLiked?'dis':''}liked ${userLiked}`}}));
    } catch (ex) {
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}));
    }
});

router.get('/', async (req,res) => {
    const userId = req.header('userId');
    
    logger.info(`User (id:${userId}) searching for his matches`);
    const query = {
        text: "SELECT u.id as liked_user_id,m.last_message,u.name,u.location,u.age FROM matches AS m INNER JOIN users_info AS u ON (m.first_user_id=u.id AND m.first_user_id!=$1) OR (m.second_user_id=u.id AND m.second_user_id!=$1) WHERE is_matched=true AND (first_user_id=$1 OR second_user_id=$1);",
        values: [userId]
    }

    try {
        const queryResult = await pgPool.query(query);
        logger.debug(`matches found for user: ${userId} ${JSON.stringify(queryResult.rows)}`);
        return res.status(200).send(JSON.stringify({result: 'Success', data: queryResult.rows}));
    } catch (ex) {
        logger.info(`failed to retrieve matches for ${userId}`);
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}));
    }

});

module.exports = router;