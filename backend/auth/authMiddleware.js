const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token;

    // Check if the token is present in the cookie
    if (req.cookies && req.cookies['token']) {
        // console.log("Token found in cookies");
        token = req.cookies['token'];
        // console.log(req.cookies);
    }

    else {
        // console.log("Token found in header");
        // If the token is not present in the cookie, check the headers
        token = req.headers.authorization?.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;