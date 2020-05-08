const express = require('express');
const router = express.Router();

const {getMessages} = require('../data/msgs');

router.get('/:personOne/:personTwo', (req,res) => {
    const person1 = req.params.personOne;
    const person2 = req.params.personTwo;

    const conversation = getMessages(person1,person2);

    res.status(200).send(JSON.stringify({result: 'Success', data: conversation}));
});

module.exports = router;