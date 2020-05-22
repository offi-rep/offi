const express = require('express');
const router = express.Router();
const _ = require('lodash');
const logger = require('../startup/logging');

const {getUserImages, updateMainImage} = require('../data/images');

router.get('/', (req,res) => {
    const userId = req.header('userId');

    //TODO: update to query Postgres
    const images = getUserImages(userId);

    if (_.isEmpty(images))
        return res.status(404).send(JSON.stringify({result: 'Failed', data: {msg: 'User dont have images'}}));

    const imagesFinal = {}

    //create the final result ( {imageMain: ____, images: [...]} )
    if (_.size(images) == 1) {
        imagesFinal['imageMain'] = images.valueOf(0);
        imagesFinal['images'] = []; 
    } else {
        let currentImageMain = images[0];
        for(image of images) {
            //found updated image
            if (image.dateMainChanged>currentImageMain.dateMainChanged) {
                currentImageMain = image;
            }
        }
        imagesFinal['imageMain'] = currentImageMain;
        if ((indexToRemove = images.indexOf(currentImageMain))!=-1) {
            images.splice(indexToRemove,1);
        }
        imagesFinal['images'] = images;
    }

    return res.status(200).send(JSON.stringify({result: 'Success', data: imagesFinal}));
});

//update main image
router.put('/:imageId', (req,res) => {
    const userId = req.header('userId');
    const newImageMainId = req.params.imageId;
    const result = updateMainImage(userId, newImageMainId);

    if (!result)
        return res.status(404).send(JSON.stringify({result: 'User not found', data: null}));

    const images = getUserImages(userId);
    
    logger.info(`user ${userId} has changed its main image to ${newImageMainId}`);
    logger.debug(JSON.stringify(images));

    return res.status(200).send(JSON.stringify({result: 'Success', data: images}));
});

router.post('/', (req,res) => {
    return res.status(200).send(JSON.stringify(req.files));
});

module.exports = router;