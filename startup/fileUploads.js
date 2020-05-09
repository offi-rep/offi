const fileupload = require('express-fileupload');

module.exports = (app) => {
    app.use(fileupload()); //handling file uploads for avatars
}