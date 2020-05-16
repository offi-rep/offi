var express = require('express');
var app = express();
const path = require('path');
const config = require('config');

app.use('/static', express.static(path.join(__dirname, 'public')));

/**
 * TODO: add public/images to .gitignore
 */

require('./startup/cors')(app);
const pgPool = require('./startup/db');

require('./startup/fileUploads')(app);
const logger = require('./startup/logging');
require('./startup/routes')(app);

const port = process.env.PORTT || config.get('port');
app.listen(port, async () => {
    logger.info(`listening in port ${port} (Enviornment: ${process.env.NODE_ENV})`);
});

// const results = await pool.query('SELECT id,name,age FROM users_info');
// console.table(results.rows);