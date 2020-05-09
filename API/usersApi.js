const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');
const {setNewUserMatches} = require('../data/matches');
const {setNewUserSettings} = require('../data/settings');
const {getUsers, getUserById, addUser} = require('../data/usersData');

router.get('/' , (req,res) => {
   const users = getUsers();
   res.status(200).send(JSON.stringify(users));
});

router.get('/:id', (req,res) => {
   const userId = req.params.id;
   const user = getUserById(userId);
   res.status(200).send(JSON.stringify(user));
});

router.post('/', (req,res) => {
   const {firstName, age, gender, occupation, height ,bodyType, education, freeTxt, crushedSentence} = req.body;
   const user = {
    firstName,
    age,
    gender,
    occupation,
    height,
    bodyType,
    education,
    freeTxt,
    crushedSentence 
   };

   const userId = addUser(user);
   setNewUserMatches(userId);
   setNewUserSettings(userId);
   res.status(201).send(JSON.stringify({result: "Success", data: user}));
});

module.exports = router;