const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');
const {addMatch, getMatchesById} = require('../data/matches');

router.put('/', (req,res) => {
    //TODO change to TOKEN
    const userId = req.header('userId');
    const {userLikedId} = req.body;

    addMatch(userId, userLikedId);
    logger.debug(JSON.stringify(getMatchesById(userId)));
    res.status(200).send(JSON.stringify({result: 'Success', data: `${userLikedId} is now in ${userId} likes list`}));
})

module.exports = router;