var express = require('express');
var app = express();
const path = require('path');
const config = require('config');

app.use('/static', express.static(path.join(__dirname, 'public')));

/**
 * TODO: add public/images to .gitignore
 */

require('./startup/cors')(app);
require('./startup/fileUploads')(app);
const logger = require('./startup/logging');
require('./startup/routes')(app);

if (process.platform === 'win32') {
    switch (process.env.NODE_ENV) {
        case "development":
            process.env['PORT'] = 50123;
            break;
        case "test":
                process.env['PORT'] = 50124;
                break;
        case "production":
            process.env['PORT'] = 50125;
            break;
        default:
            process.env['NODE_ENV'] = 'development';
            process.env['PORT'] = 50123;
    }
}

const port = process.env.PORTT || config.get('port');
app.listen(port, () => {logger.info(`listening in port ${port} (Enviornment: ${process.env.NODE_ENV})`)});

