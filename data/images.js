const images = [
    {id: 1, userId: 4, url: '/static/images/001.png', dateMainChanged: 1589962926000},
    {id: 2, userId: 5, url: '/static/images/005.jpg', dateMainChanged: 1588085592000},
    {id: 3, userId: 7, url: '/static/images/004.png', dateMainChanged: 1588503073000},
    {id: 4, userId: 8, url: '/static/images/006.png', dateMainChanged: 1588593073000},
    {id: 5, userId: 9, url: '/static/images/003/png', dateMainChanged: 1589962926000},
    {id: 6, userId: 5, url: '/static/images/002.jpg', dateMainChanged: 1588084033000},
    {id: 7, userId: 5, url: '/static/images/009.jpg', dateMainChanged: 1588085592010},
];

const getUserImages = (userId) => {
    const imagesList = images.filter(image => image.userId == userId).map(image => {
        const obj = {};
        obj['url'] = image.url;
        obj['dateMainChanged'] = image.dateMainChanged;
        return obj;
    });
    return imagesList;
}


const updateMainImage = (userId, newMainImageId) => {
    const user = images.find(user => user.userId == userId);
    
    if (typeof user == 'undefined')
    return false;
    
    for (image of images) {
        if (image.id == newMainImageId) {
            const currentDate = new Date();
            image.dateMainChanged = currentDate.getTime();
            break;
        }
    }
    
    return true;
}

const addUserImages = (userId, ...images) => {
    const user = images.find(user => user.userId == userId);
    
    if (typeof user == 'undefined')
    return null;
    
    for (let image of images) {
        const newImage = {src: image.url, isMain: imageIsMain};
        user.images.push(newImage);
    }
}

module.exports.getUserImages = getUserImages;
module.exports.updateMainImage = updateMainImage;
module.exports.addUserImages = addUserImages;