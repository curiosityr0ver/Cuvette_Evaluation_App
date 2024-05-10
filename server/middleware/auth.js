const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }
    try {
        console.log("aaja bhai");
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.author;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;