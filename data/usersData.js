const mockUsers = [{
           id: 1, 
           firstName: "uri",
           age: 30,
           gender: "m",
           occupation: "fullstack developer",
           height: "189",
           bodyType: "muschulene",
           education: "graduated",
           freeTxt: "im free text and i know it",
           crushedSentence: "im so cool. believe me - you want me",
           lastOnline: 12343253,
       },
       {
        id: 2, 
        firstName: "oren",
        age: 30,
        gender: "m",
        occupation: "looking for a job",
        height: "175",
        bodyType: "thin",
        education: "highschool",
        freeTxt: "I like a lot of stuff just ask me",
        crushedSentence: "when you feel bored you need me",
        lastOnline: 12343413,
    },
    {
        id: 3, 
        firstName: "shira",
        age: 27,
        gender: "f",
        occupation: "student",
        height: "164",
        bodyType: "curvey",
        education: "highschool",
        freeTxt: "I dont see likes, text me",
        crushedSentence: "ig: shirash.fattygirl",
        lastOnline: 12313253,
    },
    {
        id: 4, 
        firstName: "yulia",
        age: 22,
        gender: "f",
        occupation: "corona surviver",
        height: "171",
        bodyType: "thin",
        education: "highschool",
        freeTxt: "I don't know what to say",
        crushedSentence: "im ein ani li mi li",
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