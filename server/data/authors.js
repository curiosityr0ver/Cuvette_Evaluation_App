require('dotenv').config(); // will config the .env file present in the directory

const authors = [
    {
        id: 1,
        name: 'Ishu Mehta',
        pin: process.env.PIN_1
    },
    {
        id: 2,
        name: 'Kumar Shubhranshu',
        pin: process.env.PIN_2
    },
];

module.exports = { authors };