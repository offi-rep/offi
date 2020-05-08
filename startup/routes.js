const users = require('../API/usersApi');
const messages = require('../API/messages');
const bodyParser = require('body-parser');

module.exports = (app) => {
   app.use(bodyParser.json());
   app.use('/users', users);
   app.use('/messages', messages);
}