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
    {
        id: 3,
        name: 'Adfar Rasheed',
        pin: process.env.PIN_3
    }
];

module.exports = { authors };