const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtValidation = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'No token'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message: 'Not authorised', err});
    }
    
}

module.exports = jwtValidation;