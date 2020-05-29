const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    const token = req.header('token');
    
    if (!token) {
        return res.status(400).send(JSON.stringify({result: 'Failed', data: {msg: 'Forbidden'}}));
    }
    
    try {
        const encoded = await jwt.verify(token, process.env.P_TOKEN);
        req.user = encoded;
        next();
    } catch (ex) {
        return res.status(401).send(JSON.stringify({result: 'Failed', data: {msg: 'Not authorized'}}));
    }


};

module.exports = auth;