const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const pgPool = require('../startup/db');
const logger = require('../startup/logging');

router.post('/', async (req,res) => {
    logger.info(`new user signup! ${JSON.stringify(req.body)}`);
    const {name, age, gender, location, occupation, height, bodytype, education, freetxt, crushed_sentence, looking_for, search_radius, age_min, age_max, current_location, idToken: token} = req.body;

    const client = new OAuth2Client();
    async function verify() {
        logger.info('start verify user before signup');
        const ticket = await client.verifyIdToken({
            idToken: token,
        });

        const payload = ticket.getPayload();
        logger.info('finished verify user before signup')
        return payload;
    }

    try {
        const {email,aud,sub} = await verify();

        //TODO: use transaction with commit!!!
        const queryCreateUser = {
            text: "INSERT INTO users_info(name, age, gender, location, occupation, height, bodytype, education, freetxt, crushed_sentence, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id",
            values: [name, age, gender, location, occupation, height, bodytype, education, freetxt, crushed_sentence, email]
        }

        const user = await pgPool.query(queryCreateUser);
        const id = user.rows[0].id;

        const queryCreateAuth = {
            text: "INSERT INTO public.users_auth(user_id, email, aud, sub) VALUES ($1, $2, $3, $4);",
            values: [id, email, aud, sub]
        }

        await pgPool.query(queryCreateAuth);

        const queryCreateSettings = {
            text: "INSERT INTO users_settings(user_id,looking_for, search_radius, age_min, age_max, current_location) VALUES($1,$2,$3,$4,$5,$6)",
            values: [id,looking_for, search_radius, age_min, age_max,current_location]
        }
    
        await pgPool.query(queryCreateSettings);

        //TODO: extract jwt.sign() to external module (duplicated in auth API)
        const token = jwt.sign({id, name, gender, looking_for, age_min, age_max}, process.env.P_TOKEN, { expiresIn: '7d' });
        res.status(201).send(JSON.stringify({result: 'Success', data: token}));
    } catch (ex) {
        res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}));
    }
});

module.exports = router;