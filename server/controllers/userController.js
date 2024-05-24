const loginUser = (usersCollection) => (req, res) => {
    const { pin } = req.body;
    const newUser = { ...req.body, timestamp: new Date() };

    usersCollection.insertOne(newUser)
        .then(result => res.json({ message: 'Admin added successfully' }))
        .catch(err => console.error(err));
};
const authenticateUser = () => (req, res) => {
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
    authenticateUser,
};
