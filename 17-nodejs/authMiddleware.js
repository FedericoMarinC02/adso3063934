const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret';
 
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
 
    if(!token) return res.status(401).json({error: 'Access Denied!'});
 
    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({error: 'Invalid Token!'});
    }
 
};