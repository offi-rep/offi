const matches = [
    {userId: 1, matches: [{userId: 3, isMatched: true, isMessagesActive: true, showMyPictures: false, dateAdded: 1589962926000}, {userId: 4, isMatched: true, isMessagesActive: false, showMyPictures: false, dateAdded: 1589963046}]},
    {userId: 2, matches: [{userId: 3, isMatched: false, isMessagesActive: false, showMyPictures: false, dateAdded: 1589280193}]},
    {userId: 3, matches: [{userId: 1, isMatched: true, isMessagesActive: true, showMyPictures: true, dateAdded: 1588070593}]},
    {userId: 4, matches: [{userId: 1, isMatched: true, isMessagesActive: false, showMyPictures: false, dateAdded: 1588503073}]},
];

module.exports.getMatchesById = (userId) => {
    const myMatches = matches.filter(user => user.userId == userId && user.isMatched);
    return myMatches;
};

module.exports.addMatch = (userId, userLikedId) => { 
    const user = matches.find(user => user.userId == userId);
    const userLiked = matches.find(user => user.userId == userLikedId);

    let match = userLiked.matches.findIndex(match => match.userId == userId);
    //new match
    if (match != -1) {
        user.matches.push({userId: userLiked.userId, isMatched: true, showMyPictures: false});
        matches[match].isMatched = true;
        return true;
    }
    //not a match
    else {
        user.matches.push({userId: userLiked.userId, isMatched: false, showMyPictures: false});
        return false;
    }
}

module.exports.setNewUserMatches = (userId) => {
    matches.push({userId, matches: []});
}