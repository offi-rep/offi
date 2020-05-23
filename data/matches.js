const matches = [
    {userId: 5, userLikedId: 8, isMatched: true, isMessagesActive: true, showMyPictures: false, dateAdded: 1589962926000},
    {userId: 5, userLikedId: 9, isMatched: true, isMessagesActive: false, showMyPictures: false, dateAdded: 1589963046},
    {userId: 7, userLikedId: 8, isMatched: false, isMessagesActive: false, showMyPictures: false, dateAdded: 1589280193},
    {userId: 8, userLikedId: 5, isMatched: true, isMessagesActive: true, showMyPictures: true, dateAdded: 1588070593},
    {userId: 9, userLikedId: 5, isMatched: true, isMessagesActive: false, showMyPictures: false, dateAdded: 1588503073},
    {userId: 9, userLikedId: 9, isMatched: false, isMessagesActive: false, showMyPictures: false, dateAdded: 1588503073},
];


//TODO CHECK AFTER REFACTOR OF MATCHES

module.exports.getMatchesById = (userId) => {
    const myMatches = matches.filter(user => user.userId == userId && user.isMatched);
    return myMatches;
};

module.exports.addMatch = (userId, userLikedId) => { 
    const userLikedLikes = matches.filter(user => user.userId == userLikedId);

    let match = userLikedLikes.find(match => match.userId == userLikedId && match.userLikedId == userId);
    console.log(match);
    const date = new Date();
    //new match
    if (match != null) {
        match.isMatched = true;
        matches.push({userId: userId, userLikedId: userLikedId, isMatched: true, showMyPictures: false, isMessagesActive: false, dateAdded: date.getTime()});
        console.log(JSON.stringify(matches));
        return true;
    }
    //not a match
    else {
        matches.push({userId: userId, userLikedId: userLikedId, isMatched: false, showMyPictures: false, isMessagesActive: false, dateAdded: date.getTime()});
        console.log(JSON.stringify(matches));
        return false;
    }
}