const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {getUserImages, updateMainImage} = require('../data/images');

router.get('/', (req,res) => {
    const userId = req.header('userId');

    //TODO: update to query Postgres
    const images = getUserImages(userId);

    if (_.isEmpty(images))
        return res.status(404).send(JSON.stringify({result: 'User dont have images', data: null}));

    const result = {}
    //{main: www.uffi.com/images/001.jpg, images: []}

    //find the main image
    if (_.size(images) == 1) {
        result['imageMain'] = images.valueOf(0);
        result['images'] = []; 
    } else {
        //
    }

    return res.status(200).send(JSON.stringify({result: 'Success', data: images}));
});

//update main image
router.put('/:imageId', (req,res) => {
    const userId = req.header('userId');
    const result = updateMainImage(userId, req.params.imageId);

    if (!result)
        return res.status(404).send(JSON.stringify({result: 'User not found', data: null}));

    const images = getUserImages(userId);
    return res.status(200).send(JSON.stringify({result: 'Success', data: images}));
});

router.post('/', (req,res) => {
    return res.status(200).send(JSON.stringify(req.files));
});

module.exports = router;