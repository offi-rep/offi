const express = require('express');
const router = express.Router();

const {getMessages, addMessage} = require('../data/msgs');

router.get('/:personOne/:personTwo', (req,res) => {
    const person1 = req.params.personOne;
    const person2 = req.params.personTwo;

    const conversation = getMessages(person1,person2);

    res.status(200).send(JSON.stringify({result: 'Success', data: conversation}));
});

router.post('/', (req,res) => {
    const {idFrom, idTo, value} = req.body;
    const message = {
        timestamp: Date.now(),
        idFrom,
        idTo,
        value,
        isRead: false
    };

    addMessage(message);
    const messages = getMessages(idFrom, idTo);

    res.status(200).send(JSON.stringify({result: 'Success', data: messages}));
})

module.exports = router;