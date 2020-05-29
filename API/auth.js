const express = require('express');
const router = express.Router();
const logger = require('../startup/logging');
const pgPool = require('../startup/db');

router.get('/', async (req,res) => {
    logger.info('user tried to signup');

    const {email} = req.body;

    const query = { 
        text: "SELECT count(email) FROM users_info WHERE email=$1",
        values: [email]
    }

    const queryResult = await pgPool.query(query);

    console.log(JSON.stringify(queryResult.rows));

    if (queryResult.rowCount!=1) {
        return res.status(400).send(JSON.stringify({result: 'Failed', data: null}));
    }
    
    //CREATE TOKEN AND SEND BACK
    return res.status(200).send(JSON.stringify({result: 'Success', data: 'tokenback'}));
});

module.exports = router;