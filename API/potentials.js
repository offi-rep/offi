const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');

const {getSettings} = require('../data/settings');
const {getUsers} = require('../data/usersData');

//TODO filter only people who look for my gender
//TODO add radius of km
//TODO filter only people in my age range
router.get('/', (req,res) => {
    //TODO change to TOKEN
    const userId = req.header('userId');
    logger.debug(`Selecting all potentials for user ${userId}`);

    const userSettings = getSettings(userId);
    const users = getUsers().filter((user) => user.gender == userSettings.lookingFor);

    logger.debug(`users found: ${JSON.stringify(users)}`);
    res.status(200).send(users);
});

module.exports = router;