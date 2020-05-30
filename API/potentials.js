const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');
const pgPool = require('../startup/db');

//TODO: USE TOKEN details instead of the 1st query
//TODO: add radius of km
router.get('/', async (req,res) => {
    //TODO change to TOKEN
    const userId = req.header('userId');
    logger.debug(`Selecting all potentials for user ${userId}`);

    const queryMyPref = {
        text: "SELECT s.looking_for,s.age_min,s.age_max,u.gender FROM users_settings as s INNER JOIN users_info as u ON u.id=s.user_id WHERE user_id=$1",
        values: [userId]
    }

    const userPref = await pgPool.query(queryMyPref);
    const {looking_for: lookingFor,age_min: ageMin,age_max: ageMax, gender: myGender} = userPref.rows[0];

    const queryPotentials = {
        text: "SELECT u.id,u.name,u.gender,u.age,u.location,u.occupation,u.height,u.bodytype,u.education,u.freetxt,u.crushed_sentence FROM users_info as u INNER JOIN users_settings as s ON u.id=s.user_id WHERE u.gender=$1 AND s.looking_for=$5 AND u.age BETWEEN $2 AND $3 AND u.id!=$4 AND id NOT IN( SELECT CASE WHEN first_user_id != $4 THEN first_user_id ELSE second_user_id END AS liked_id FROM matches WHERE first_user_id=$4 OR second_user_id=$4)",
        values: [lookingFor,ageMin,ageMax,userId,myGender]
    }

    const userPotentials = await pgPool.query(queryPotentials);

    logger.debug(`users found: ${JSON.stringify(userPotentials)}`);
    res.status(200).send(userPotentials.rows);
});

module.exports = router;

/**
 * SQL QUERY TO GET ALL PEOPLE I ALREADY VISITED: (Need to update hardcoded 4 to dynamic user_id)
    SELECT
    CASE
        WHEN first_user_id != 4 THEN first_user_id
        ELSE second_user_id
    END AS liked_id
    FROM
        matches
    WHERE
        first_user_id=4 OR second_user_id=4
 
 
 
 
 
 
        */