const msgs = [
    {
        timestamp: 1588947351000,
        idFrom: 2,
        idTo: 3,
        value: "Hi what's up?",
        isRead: true
    },
    {
        timestamp: 1588947352000,
        idFrom: 3,
        idTo: 2,
        value: "good. what about you?",
        isRead: true
    },
    {
        timestamp: 1588947360100,
        idFrom: 2,
        idTo: 3,
        value: "im ok. where are you from?",
        isRead: true
    },
    {
        timestamp: 1588947380100,
        idFrom: 3,
        idTo: 2,
        value: "TLV. you?",
        isRead: false
    }
]

module.exports.getMessages = (idPersonOne, idPersonTwo) => {
    const messages = msgs.filter((msg) => { return (msg.idFrom==idPersonOne && msg.idTo==idPersonTwo) || (msg.idFrom == idPersonTwo && msg.idTo == idPersonOne)}).map((msg) => {return {timestamp: msg.timestamp, message: msg.value}});
    return messages;
}

module.exports.addMessage = (message) => {
    msgs.push(message);
}