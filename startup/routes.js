const users = require('../API/usersApi');
const bodyParser = require('body-parser');

module.exports = (app) => {
   app.use(bodyParser.json());
   app.use('/users', users);
}