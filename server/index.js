const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Define your Express.js routes here
app.get('/', (req, res) => {
    res.status(200).send('Hello from Express.js on Vercel!');
});

app.listen(5000, () => console.log("Server ready on port 5000."));


// Wrap your Express app with serverless
module.exports.handler = serverless(app);