const { authors } = require("../data/authors");
const { generateToken } = require("../middleware/auth");

const loginUser = () => (req, res) => {
    const { pin } = req.body;

    const author = authors.find(author => author.pin == pin);
    if (!author) {
        return res.json({ message: 'Invalid PIN' });
    } else {
        const token = generateToken(author);
        return res.json({
            message: 'User registered successfully',
            token: token,
        });
    }
};

module.exports = {
    loginUser,
};
