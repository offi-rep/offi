const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');
const jwt = require('jsonwebtoken');
const pgPool = require('../startup/db');

router.get('/', async (req,res) => {
    logger.info('user tried to signup');

    const {email} = req.body;

    const query = { 
        text: "SELECT u.id,u.name,u.gender,s.looking_for,s.age_min,s.age_max FROM users_info as u INNER JOIN users_settings as s ON u.id=s.user_id WHERE u.email=$1;",
        values: [email]
    }

    const queryResult = await pgPool.query(query);

    if (queryResult.rowCount!=1) {
        return res.status(400).send(JSON.stringify({result: 'Failed', data: null}));
    }
    
    const {id, name, gender, looking_for, age_min, age_max} = queryResult.rows[0];

    const token = jwt.sign({id, name, gender, looking_for, age_min, age_max}, process.env.P_TOKEN, { expiresIn: '7d' });
    return res.status(200).send(JSON.stringify({result: 'Success', data: token}));
});

module.exports = router;