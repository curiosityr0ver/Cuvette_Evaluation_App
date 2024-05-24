const { authors } = require("../data/authors");
const { generateToken } = require("../middleware/auth");

const loginUser = (PIN_1, PIN_2) => (req, res) => {
    const authorArray = authors;
    const { pin } = req.body;

    // res.json({
    //     message: 'User registered successfully',
    //     PIN_1: PIN_1,
    //     PIN_2: PIN_2,
    //     authors: authorArray
    // });

    authors.forEach(author => {
        if (author.pin == pin) {
            const token = generateToken(author);
            return res.json({
                message: 'User registered successfully',
                token: token,
            });
        }
    });

};

const authenticateUser = (PIN_1, PIN_2) => (req, res) => {
    const { pin } = req.body;
    let user;

    if (pin == PIN_1) {
        user = { author: "Ishu Mehta" };
    } else if (pin == PIN_2) {
        user = { author: "Kumar Shubhranshu" };
    }

    if (user) {
        const token = generateToken(user);
        return res.json({
            message: 'Authentication successful',
            token: token,
            author: user.author
        });
    }

    return res.json({
        message: 'Authentication failed',
    });
};

module.exports = {
    loginUser,
    authenticateUser
};
