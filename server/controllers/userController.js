const { authors } = require("../data/authors");
const { generateToken } = require("../middleware/auth");

const loginUser = () => (req, res) => {
    const { pin } = req.body;


    authors.forEach(author => {
        if (author.pin == pin) {
            const token = generateToken(author);
            return res.json({
                message: 'User registered successfully',
                token: token,
                author: author.name
            });
        }
    });
    return res.json({ message: 'Invalid PIN' });
};

module.exports = {
    loginUser,
};
