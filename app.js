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

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    logger.info('user just signed in');
    socket.emit('user-signed-in', {message: 'hello user'});
});