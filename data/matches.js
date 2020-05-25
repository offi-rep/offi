const matches = [
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