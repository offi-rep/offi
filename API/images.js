const express = require('express');
const router = express.Router();
const _ = require('lodash');
const logger = require('../startup/logging');
const multer = require('multer');
const storage = multer.diskStorage({destination: 'public/images/', filename: (req,file,cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const indexOfDot = file.originalname.lastIndexOf('.');
    const extension = file.originalname.substring(indexOfDot,file.originalname.length);
    cb(null, uniqueSuffix.concat(extension));
}});
const upload = multer({storage: storage, limits:{fileSize: 1048576}});
const pgPool = require('../startup/db');

const {getUserImages} = require('../data/images');

//TODO: send back array of objects {url: ____, picture_order: _____}
router.get('/', async (req,res) => {
    const userId = req.header('userId');

    const query = {
        text: 'SELECT url,picture_order FROM images WHERE user_id=$1',
        values: [userId]
    }

    try {
        const queryResult = await pgPool.query(query);
        return res.status(200).send(JSON.stringify({result: 'Success', data: queryResult.rows}));
    } catch (ex) {
        logger.info(`couldnt retrieve user ${userId} images`);
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: ex.message}}));
    }
});

router.put('/', (req, res) => {
    const userId = req.header('userId');
    const {images} = req.body;

    for(image of images) {
        const query = {
            text: 'UPDATE images SET picture_order=$1 WHERE user_id=$2 AND url=$3',
            values: [image.picture_order, userId, image.url]
        }
        try {
            await pgPool.query(query);
            logger.info(`successfully updated image ${image.url} for user ${userId} to picture_order ${image.picture_order}`);
        } catch (ex) {
            logger.info(`failed to update image ${image.url} for user ${userId} to picture_order ${image.picture_order}`);
        }
    }

    res.status(200).send(JSON.stringify({result: 'Success', data: []}));
});

router.delete('/', (req,res) => {
    res.status(501).end();
})

router.post('/', upload.array('user_pictures', 5), async (req,res) => {
    const userId = req.header('userId');
    logger.info(`user ${userId} uploads ${_.size(req.files)} pictures`);
    
    const failedUpload = [];
    const succesfullyUploaded = [];
    for(let picture of req.files) {
        const query = {
            text: "INSERT INTO images(user_id,url) VALUES(4,$1)",
            values: [/*userId,*/ picture.filename]
        }
        try {
            await pgPool.query(query);
            succesfullyUploaded.push(picture.filename);
        } catch (ex) {
            logger.info(`file ${picture.originalname} couldnt upload: ${ex.message}`);
            failedUpload.push(picture.originalname);
        }
    }

    //if all pictures uploaded successfully - failed will be an empty list and vise versa with uploaded list
    return res.status(200).send(JSON.stringify({result: 'Success', uploaded: succesfullyUploaded, failed: failedUpload}));
});

module.exports = router;