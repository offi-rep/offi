const mockUsers = [
    {
        id: 4, 
        firstName: "yoav",
        age: 32,
        gender: "m",
        location: 'TLV',
        occupation: "fullstack developer",
        height: "174",
        bodyType: "thin",
        education: "graduated",
        freeTxt: "im free text and i know it",
        crushedSentence: "im so cool. believe me - you want me",
        lastOnline: 12343253,
    },
    {
        id: 5, 
        firstName: "uri",
        age: 30,
        gender: "m",
        location: 'TLV',
        occupation: "fullstack developer",
        height: "189",
        bodyType: "muschulene",
        education: "graduated",
        freeTxt: "im free text and i know it",
        crushedSentence: "im so cool. believe me - you want me",
        lastOnline: 12343253,
    },
    {
        id: 7, 
        firstName: "oren",
        age: 30,
        gender: "m",
        location: 'Hertzelia',
        occupation: "looking for a job",
        height: "175",
        bodyType: "thin",
        education: "highschool",
        freeTxt: "I like a lot of stuff just ask me",
        crushedSentence: "when you feel bored you need me",
        lastOnline: 12343413,
    },
    {
        id: 8, 
        firstName: "shira",
        age: 27,
        gender: "f",
        location: 'TLV',
        occupation: "student",
        height: "164",
        bodyType: "curvey",
        education: "highschool",
        freeTxt: "I dont see likes, text me",
        crushedSentence: "ig: shirash.fattygirl",
        lastOnline: 12313253,
    },
    {
        id: 9, 
        firstName: "yulia",
        age: 22,
        gender: "f",
        location: 'Ramat Gan',
        occupation: "corona surviver",
        height: "171",
        bodyType: "thin",
        education: "highschool",
        freeTxt: "I don't know what to say",
        crushedSentence: "im ein ani li mi li",
        lastOnline: 12343247,
    },
    {
        id: 25, 
        firstName: "tom",
        age: 41,
        gender: "f",
        location: "Bat Yam",
        occupation: "nothing",
        height: 155,
        bodyType: "thin",
        education: "none",
        freeTxt: "i dont know what you want me to say",
        crushedSentence: "im cool. very cool",
        lastOnline: 12343247,
    }
];

module.exports.getUsers = () => {
    return mockUsers;
}

module.exports.getUserById = (id) => {
    return mockUsers.find((user) => user.id == id);
}

module.exports.addUser = (user) => {
    user.id = mockUsers.length+1;
    mockUsers.push(user);
    return user.id;
}