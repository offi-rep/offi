const settings = [
    {
        userId: 4,
        lookingFor: 'd',
        searchRadius: 2,
        ageMin: 24,
        ageMax: 30,
        currentLocation: {lat: 32.084572, long: 34.772768}
    },
    {
        userId: 5,
        lookingFor: 'f',
        searchRadius: 5,
        ageMin: 22,
        ageMax: 28,
        currentLocation: {lat: 32.084572, long: 34.772768}
    },
    {
        userId: 7,
        lookingFor: 'f',
        searchRadius: 10,
        ageMin: 28,
        ageMax: 35,
        currentLocation: {lat: 32.084572, long: 34.772768}
    },
    {
        userId: 8,
        lookingFor: 'm',
        searchRadius: 5,
        ageMin: 20,
        ageMax: 38,
        currentLocation: {lat: 32.084572, long: 34.772768}
    },
    {
        userId: 9,
        lookingFor: 'f',
        searchRadius: 5,
        ageMin: 20,
        ageMax: 38,
        currentLocation: {lat: 32.084572, long: 34.772768}
    }
]

module.exports.getSettings = (userId) => {
    return settings.find((user) => user.userId == userId);
}

module.exports.setNewUserSettings = (userId) => {
    const newUserSettingsd = {userId, lookingFor: null, searchRadius: null, ageMin: 18, ageMax: 35, currentLocation: {lat: 0, long: 0}};
    settings.push(newUserSettingsd);
}

module.exports.updateSettings = (userId, lookingFor, searchRadius, ageMin, ageMax, currentLocation) => {
    const userSettings = settings.find(user => user.userId == userId);
    userSettings.lookingFor = (typeof lookingFor == 'undefined')?userSettings.lookingFor:lookingFor;
    userSettings.searchRadius = (typeof searchRadius == 'undefined')?userSettings.searchRadius:searchRadius;
    userSettings.ageMin = (typeof ageMin == 'undefined')?userSettings.ageMin:ageMin;
    userSettings.ageMax = (typeof ageMax == 'undefined')?userSettings.ageMax:ageMax;
    userSettings.currentLocation = (typeof currentLocation == 'undefined')?userSettings.currentLocation:currentLocation;
}