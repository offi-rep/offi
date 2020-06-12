const users = require('../API/users');
const messages = require('../API/messages');
const potentials = require('../API/potentials');
const matches = require('../API/matches');
const settings = require('../API/settings');
const images = require('../API/images');
const auth = require('../API/auth');
const signup = require('../API/signup');
const bodyParser = require('body-parser');
require('express-async-errors');

module.exports = (app) => {

   app.use(bodyParser.json());
   app.use('/users', users);
   app.use('/messages', messages);
   app.use('/potentials', potentials);
   app.use('/matches', matches);
   app.use('/settings', settings);
   app.use('/images', images);
   app.use('/auth', auth);
   app.use('/signup', signup);

   app.get('*', (req,res) => {
      res.status(404).send(JSON.stringify({result: 'Page not found', data: null}));
   });
}