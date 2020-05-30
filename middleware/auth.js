const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async (req,res,next) => {
    const token = req.header('token');
    
    //token not provided
    if (!token) {
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: 'Forbidden'}}));
    }
    
    try {
        const encoded = await jwt.verify(token, process.env.P_TOKEN);
        req.user = encoded;

        next();
    } catch (ex) {
        //token not valid
        return res.status(401).send(JSON.stringify({result: 'Failed', data: {msg: 'Not authorized'}}));
    }


};

module.exports = auth;