const path = require('path');

const images = [
    {userId: 1, url: '../public/images/001.png', dateMainChanged: 1589962926000},
    {userId: 2, url: '../public/images/005.jpg', dateMainChanged: 1588070593},
    {userId: 3, url: '../public/images/004.png', dateMainChanged: 1588503073},
    {userId: 4, url: '../public/images/006.png', dateMainChanged: 1589280193},
    {userId: 3, url: '../public/images/003/png', dateMainChanged: 1589962926000},
    {userId: 2, url: '../public/images/002.jpg', dateMainChanged: 1589280193},
];

module.exports.getUserImages = (userId) => {
    const imagesList = images.filter(image => image.userId == userId).map(image => {
        const obj = {};
        obj['url'] = image.url;
        obj['dateMainChanged'] = image.dateMainChanged;
        return obj;
    });
    return imagesList;
}

module.exports.updateMainImage = (userId, newMainImage) => {
    const user = images.find(user => user.userId == userId);

    if (typeof user == 'undefined')
        return false;

    for (let image of user.images) {
        if (image.id == newMainImage) {
            const updateTime = new Date();
            image.dateMainChanged = updateTime.getTime();

            logger.info(`user updated main image ${image.id} to at ${updateTime.toString()}`);
            break;
        }
    }

    return true
}

module.exports.addUserImages = (userId, ...images) => {
    const user = images.find(user => user.userId == userId);
    
    if (typeof user == 'undefined')
        return null;

    for (let image of images) {
        const newImage = {src: image.url, isMain: imageIsMain};
        user.images.push(newImage);
    }
}