const express = require('express');
const router = express.Router();

const {getSettings} = require('../data/settings');
const {getUsers} = require('../data/usersData');

//TODO filter only people who look for my gender
//TODO add radius of km
//TODO filter only people in my age range
router.get('/', (req,res) => {
    const userId = req.header('userId');
    const settings = getSettings(userId);

    const users = getUsers().filter((user) => user.gender == settings.lookingFor);

    res.status(200).send(users);
});

module.exports = router;