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

    //TODO: remove people who dis/liked me and I visited using "visited" field
    const queryPotentials = {
        text: "SELECT m.liked,* FROM (SELECT u.id as tid,u.name,u.gender,u.age,u.location,u.occupation,u.height,u.bodytype,u.education,u.freetxt,u.crushed_sentence FROM users_info as u INNER JOIN users_settings as s ON u.id = s.user_id WHERE u.gender = $1 AND s.looking_for = $2 AND u.age BETWEEN $3 AND $4 AND u.id != $5 AND id NOT IN(SELECT second_user_id FROM matches WHERE first_user_id=$5)) as t LEFT JOIN matches as m ON t.tid = m.first_user_id AND m.second_user_id=$5 ORDER by tid",
        values: [lookingFor,myGender,ageMin,ageMax,userId]
    }

    const userPotentials = await pgPool.query(queryPotentials);

    logger.debug(`users found: ${JSON.stringify(userPotentials.rows)}`);
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