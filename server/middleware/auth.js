const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY);
};

const validateToken = async (token, tokenSecret) => {
    // returns user info, if the jwt token is valid
    return jwt.verify(token, tokenSecret,
        (error, payload) => {
            if (error) {
                throw (error);
            }
            req.user = decoded;
        });
};

module.exports = {
    generateToken,
    validateToken,
};