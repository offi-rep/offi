const cors = require('cors');

//TODO change origin to domains we want to give access to the API
module.exports = function (app) {
    app.use(cors({
        exposedHeaders: ['token'],
        origin: '*'
    }));
}