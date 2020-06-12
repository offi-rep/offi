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

//TODO: send back array of objects {url: ____, order: _____}
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

router.put('/', (req, res) => {
    //change the order of pictures
});

router.delete('/', (req,res) => {
    //delete picture(s)
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