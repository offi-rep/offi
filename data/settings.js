const settings = [
    {
        userId: 1,
        lookingFor: 'f',
        searchRadius: 2,
        ageMin: 24,
        ageMax: 30
    },
    {
        userId: 2,
        lookingFor: 'f',
        searchRadius: 5,
        ageMin: 22,
        ageMax: 28
    },
    {
        userId: 3,
        lookingFor: 'm',
        searchRadius: 10,
        ageMin: 28,
        ageMax: 35
    },
    {
        userId: 4,
        lookingFor: 'f',
        searchRadius: 5,
        ageMin: 20,
        ageMax: 38
    }
]

module.exports.getSettings = (userId) => {
    return settings.find((user) => user.userId == userId);
}