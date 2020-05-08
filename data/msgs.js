const msgs = [
    {
        timestamp: 1588947351000,
        idFrom: 2,
        ifTo: 3,
        msg: "Hi what's up?",
        isRead: true
    },
    {
        timestamp: 1588947352000,
        idFrom: 3,
        ifTo: 2,
        msg: "good. what about you?",
        isRead: true
    },
    {
        timestamp: 1588947360100,
        idFrom: 2,
        ifTo: 3,
        msg: "im ok. where are you from?",
        isRead: true
    },
    {
        timestamp: 1588947380100,
        idFrom: 3,
        ifTo: 2,
        msg: "TLV. you?",
        isRead: false
    }
]

export const getMessages = (idPersonOne, idPersonTwo) => {
    const messages = msgs.filter((msg) => {msg.idFrom==idPersonOne && msg.idFrom==idPersonTwo || msg.idFrom==idPersonOne && msg.idFrom==idPersonTwo}).map((msg) => { return {timestamp: msg.timestamp, message: msg.msg}});
    return messages;
}