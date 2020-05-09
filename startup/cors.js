const cors = require('cors');

//open CORS
module.exports = (app) => {
    app.use(cors());
}