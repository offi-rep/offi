//TODO: use HTTPS only!

const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');
const jwt = require('jsonwebtoken');
const pgPool = require('../startup/db');
const {OAuth2Client} = require('google-auth-library');

router.post('/', async (req,res) => {
    const {idToken: token} = req.body;

    //GOOGLE verification of the id token
    const client = new OAuth2Client();
    async function verify() {
        logger.info('start verify user before signin');
        const ticket = await client.verifyIdToken({
            idToken: token,
        });

        const payload = ticket.getPayload();
        const {sub,aud,email} = payload;

        //search details in Uffi db
        const query = { 
            text: "SELECT  u.id,u.name,u.gender,s.looking_for,s.age_min,s.age_max,a.email,a.aud,a.sub FROM users_info as u INNER JOIN users_settings as s ON u.id=s.user_id INNER JOIN users_auth as a ON s.user_id=a.user_id WHERE u.email=$1  AND a.aud=$2 AND a.sub=$3",
            values: [email, aud, sub]
        }
        const queryResult = await pgPool.query(query);

        logger.info('finished verify user before signin');
        if (queryResult.rowCount!=1) {
            return false;
        }
        return queryResult.rows[0];
    }
    try {
        //verify token
        const verified = await verify();

        //not verified - user not exists yet
        if (!verified) {
            res.status(200).send(JSON.stringify({result: 'Failed', data: null}));
        }

        const {id, name, gender, looking_for, age_min, age_max} = verified;
        const jwtToken = jwt.sign({id, name, gender, looking_for, age_min, age_max}, process.env.P_TOKEN, { expiresIn: '7d' });
        return res.status(200).send(JSON.stringify({result: 'Success', data: jwtToken}));
    } catch (ex) {
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: JSON.stringify(ex.message)}}));
    }
});

module.exports = router;


