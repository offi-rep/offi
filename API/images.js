const express = require('express');
const router = express.Router();

const {getUserImages, updateMainImage} = require('../data/images');

router.get('/', (req,res) => {
    const userId = req.header('userId');
    const images = getUserImages(userId);

    if (images == null)
        return res.status(404).send(JSON.stringify({result: 'User not found', data: null}));

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
})

module.exports = router;