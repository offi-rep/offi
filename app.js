var express = require('express');
var app = express();

require('./startup/routes')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`listening in port ${port}`)});