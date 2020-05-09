const path = require('path');

const images = [
    {userId: 1, images: [{id: 1, src: '../public/images/001.jpg', isMain: true}]},
    {userId: 2, images: [{id: 1, src: '../public/images/002.jpg', isMain: true},{src: '../public/images/003.jpg', isMain: false}]},
    {userId: 3, images: [{id: 1, src: '../public/images/004.jpg', isMain: false}, {id:2, src: '../public/images/005.jpg', isMain: true}]},
    {userId: 4, images: [{id: 1, src: '../public/images/006.jpg', isMain: true}]},
];

module.exports.getUserImages = (userId) => {
    const user = images.find(user => user.userId == userId);
    if (typeof user == 'undefined')
        return null;

    return user.images;
}

module.exports.updateMainImage = (userId, newMainImage) => {
    const user = images.find(user => user.userId == userId);

    if (typeof user == 'undefined')
        return false;

    for (let image of user.images) {
        if (image.id == newMainImage) {
            console.log('new: ' + JSON.stringify(image));
            image.isMain = true;
        } else {
            console.log('old: ' + JSON.stringify(image));
            image.isMain = false;
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