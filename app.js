var http = require('http');
var express = require('express');
var app = express();
var controllers = require('./controllers');
controllers.init(app);

var server = http.createServer(app);
server.listen(3000, '127.0.0.1');