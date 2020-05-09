const matches = [
    {userId: 1, matches: [{userId: 3, isMatched: true, showMyPictures: false}, {userId: 4, isMatched: true, showMyPictures: false}]},
    {userId: 2, matches: [{userId: 3, isMatched: false, showMyPictures: false}]},
    {userId: 3, matches: [{userId: 1, isMatched: true, showMyPictures: true}]},
    {userId: 4, matches: [{userId: 1, isMatched: true, showMyPictures: false}]},
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
    }
    //not a match
    else {
        user.matches.push({userId: userLiked.userId, isMatched: false, showMyPictures: false});
    }
}

module.exports.setNewUserMatches = (userId) => {
    matches.push({userId, matches: []});
}