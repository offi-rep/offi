const express = require('express');
const router = express.Router();

const {getUsers, getUserById, addUser} = require('../data/usersData');

router.get('/' , (req,res) => {
   const users = getUsers();
   res.status(200).send(JSON.stringify(users));
});

router.get('/:id', (req,res) => {
   const userId = req.params.id;
   const user = getUserById(userId);
   console.log(`found user ${userId}`);
   res.status(200).send(JSON.stringify(user));
});

router.post('/', (req,res) => {
    console.log(JSON.stringify(req.body));
   const {firstName, lastName, age, gender, occupation, height ,bodyType, education, freeTxt, crushedSentence} = req.body;
   const user = {
    firstName,
    lastName,
    age,
    gender,
    occupation,
    height,
    bodyType,
    education,
    freeTxt,
    crushedSentence 
   };

   addUser(user);
   res.status(200).send(JSON.stringify({result: "Success", data: user}));
});

module.exports = router;