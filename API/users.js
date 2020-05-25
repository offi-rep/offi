const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');
const pgPool = require('../startup/db');
const _ = require('lodash');

//TODO: remove this function from the API
router.get('/' , async (req,res) => {
   logger.info('user requesting for all users');
   const queryResult = await pgPool.query('SELECT id,name,age,gender,height FROM users_info');
   
   logger.debug(`users found: ${JSON.stringify(queryResult.rows)}`);
   
   res.status(200).send(JSON.stringify({result: 'Success', data: queryResult.rows}));
});

router.get('/:id', async (req,res) => {
   const userId = req.params.id;
   const queryResult = await pgPool.query('SELECT name,age,gender,height FROM users_info WHERE id=$1',[userId]);
   
   if (_.isNil(queryResult.rows[0])) {
      logger.info(`user ${userId} not exists`);
      res.status(404).send(JSON.stringify({result: 'Failed', data: {msg: 'user not found'}}));
   }
   res.status(200).send(JSON.stringify(queryResult.rows[0]));
});

router.post('/', async (req,res) => {
   const {firstName, age, gender, location, occupation, height ,bodyType, education, freeTxt, crushedSentence} = req.body;
   values = [firstName, age, gender, location, occupation, height, bodyType, education, freeTxt, crushedSentence];

   const currLocation = {"lat": 2, "long": 3};
   //TODO: move these 2 queries into SP with transaction-commit-rollback
   try {
      const addUserQueryResult = await pgPool.query('INSERT INTO users_info(name,age,gender,location,occupation,height,bodytype,education,freetxt,crushedsentence) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',values);
      await pgPool.query("INSERT INTO users_settings(user_id, looking_for, search_radius, age_min, age_max, current_location) VALUES($1, 'f',15,18,30,$2)", [addUserQueryResult.rows[0].id,currLocation]);
      logger.info(`new user ${JSON.stringify(addUserQueryResult.rows)} was added`);
      res.status(201).send(JSON.stringify({result: "Success", data: JSON.stringify(addUserQueryResult.rows[0])}));

   } catch (ex) { 
      res.status(500).send(JSON.stringify({result: "Failed", data: {msg: ex.message}}));
   }
});

router.put('/', async (req,res) => {
   const userId = req.header('userId');
   const {firstName, age, gender, location, occupation, height ,bodyType, education, freeTxt, crushedSentence} = req.body;
   const values = [firstName, age, gender, location, occupation, height, bodyType, education, freeTxt, crushedSentence, userId];
   
   const queryResult = await pgPool.query('UPDATE users_info SET name=$1, age=$2, gender=$3, location=$4, occupation=$5, height=$6, bodyType=$7, education=$8, freeTxt=$9, crushedSentence=$10 WHERE id=$11 RETURNING *', values);

   logger.info(`user's info was updated to ${JSON.stringify(queryResult.rows[0])}`);

   res.status(200).send(JSON.stringify({result: "Success", data: queryResult.rows[0]}));
});

module.exports = router;