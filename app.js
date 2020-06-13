var express = require('express');
var app = express();
const path = require('path');
const config = require('config');

app.use('/static', express.static(path.join(__dirname, 'public')));

/**
 * TODO: add public/images to .gitignore
 */

require('./startup/cors')(app);
require('./startup/db');

const logger = require('./startup/logging');
require('./startup/routes')(app);

const port = process.env.PORT || config.get('port');
const server = app.listen(port, async () => {
    logger.info(`listening in port ${port} (Enviornment: ${process.env.NODE_ENV})`);
});

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service: 'yahoo',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    }
});
const signInOptions = {
    from: 'offirep@yahoo.com',
    to: 'yoavke@gmail.com',
    subject: 'User signed in to Uffi',
    text: 'User just signed in.'
};

const signOutOptions = {
    from: 'offirep@yahoo.com',
    to: 'yoavke@gmail.com',
    subject: 'User signed off from Uffi',
    text: 'User just signout.'
};

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    logger.info('user just signed in');
    
    /** REMOVE EMAILS */
    transporter.sendMail(signInOptions, function(error, info){
        logger.info('user signed in. sent');
        console.log(error, JSON.stringify(process.env.EMAIL_USER));
    });

    socket.on('disconnect', (reason) => {
        logger.info('user signed off');
        transporter.sendMail(signOutOptions, function(error, info) {
            logger.info('user signed off. sent');
        })
    })
    /** END REMOVE EMAILS */

    socket.emit('user-signed-in', {message: 'hello user'});
});