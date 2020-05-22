const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');
const {setNewUserSettings} = require('../data/settings');
const {getUsers, getUserById, addUser} = require('../data/usersData');
const pgPool = require('../startup/db');

//TODO: remove this function from the API
router.get('/' , async (req,res) => {
   logger.info('user requesting for all users');
   const users = getUsers();
   
   const results = await pgPool.query('SELECT id,name,age FROM users_info');
   console.table(results.rows);
   
   res.status(200).send(JSON.stringify(users));
});

router.get('/:id', (req,res) => {
   const userId = req.params.id;
   const user = getUserById(userId);
   res.status(200).send(JSON.stringify(user));
});

router.post('/', (req,res) => {
   const {firstName, age, gender, location, occupation, height ,bodyType, education, freeTxt, crushedSentence} = req.body;
   const user = {
    firstName,
    age,
    gender,
    location,
    occupation,
    height,
    bodyType,
    education,
    freeTxt,
    crushedSentence 
   };

   const userId = addUser(user);
   setNewUserSettings(userId);
   res.status(201).send(JSON.stringify({result: "Success", data: user}));
});

router.put('/', (req,res) => {
   const userId = req.header('userId');
   const {firstName, age, gender, location, occupation, height ,bodyType, education, freeTxt, crushedSentence} = req.body;

   const user = getUserById(userId);
   user.firstName = firstName;
   user.age = age;
   user.gender = gender;
   user.location = location;
   user.occupation = occupation;
   user.height = height;
   user.bodyType = bodyType;
   user.education = education;
   user.freeTxt = freeTxt;
   user.crushedSentence = crushedSentence;

   res.status(200).send(JSON.stringify({result: "Success", data: user}));
});

module.exports = router;