const users = require('../API/usersApi');
const messages = require('../API/messages');
const potentials = require('../API/potentials');
const bodyParser = require('body-parser');

module.exports = (app) => {
   app.use(bodyParser.json());
   app.use('/users', users);
   app.use('/messages', messages);
   app.use('/potentials', potentials);

   app.get('*', (req,res) => {
      res.status(404).send(JSON.stringify({result: 'Page not found', data: null}));
   });
}