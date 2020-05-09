var express = require('express');
var app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')));


require('./startup/cors')(app);
const logger = require('./startup/logging');
require('./startup/routes')(app);


const port = process.env.PORT || 5000;
app.listen(port, () => {logger.info(`listening in port ${port} (Enviornment: ${process.env.NODE_ENV})`)});