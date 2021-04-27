const jwt = require('jsonwebtoken');
const jwtSecret = 'secret-token';

module.exports = async (req, res, next) => {
    const token = req.headers.auth;

    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }
    
    try {    
        const decoded = jwt.verify(token, jwtSecret);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
}