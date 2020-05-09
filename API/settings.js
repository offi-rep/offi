const express = require('express');
const router = express.Router();
const {getSettings, updateSettings} = require('../data/settings');

const _ = require('lodash');

router.get('/', (req,res) => {
    //TODO change to TOKEN
    const userId = req.header('userId');

    const userSettings = _.pick(getSettings(userId),['lookingFor', 'searchRadius', 'ageMin', 'ageMax']);
    res.status(200).send(JSON.stringify({result: 'Success', data: userSettings}));
})

router.put('/', (req,res) => {
    const userId = req.header('userId');
    const {lookingFor,searchRadius,ageMin,ageMax,currentLocation} = req.body;

    updateSettings(userId, lookingFor, searchRadius, ageMin, ageMax, currentLocation);
    const newSettings = getSettings(userId);
    res.status(200).send(JSON.stringify({result: 'Success', data: newSettings}));
})

module.exports = router;