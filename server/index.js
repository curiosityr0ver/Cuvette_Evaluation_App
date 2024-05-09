const express = require('express');
const app = express();

app.use(express.json());

// Define your Express.js routes here
app.get('/', (req, res) => {
    res.status(200).send('Hello from Express.js on Vercel!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server ready on port 5000."));