const users = require('../API/usersApi');
const messages = require('../API/messages');
const potentials = require('../API/potentials');
const bodyParser = require('body-parser');
var cors = require('cors');

module.exports = (app) => {
   app.use(cors());
   app.use(bodyParser.json());
   app.use('/users', users);
   app.use('/messages', messages);
   app.use('/potentials', potentials);
}