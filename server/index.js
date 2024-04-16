const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // will config the .env file present in the directory


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const PIN_1 = process.env.PIN_1;
const PIN_2 = process.env.PIN_2;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://mehtaishu14:PAMzLaYX0KPpclJJ@cluster0.rjde1cd.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(mongoURI)
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db('express-mongodb-app');
        const usersCollection = db.collection('users');
        const studentsCollection = db.collection('students');

        app.get('/', (req, res) => {
            res.status(200).json({ message: 'Hello, world!' });
        });

        // Authentication route
        app.post('/user/login', (req, res) => {
            const { pin } = req.body;
            console.log("here", pin);
            if (pin == PIN_1) {
                const user = {
                    author: "Ishu Mehta",
                };
                const token = generateToken(user);
                res.json({
                    message: 'Authentication successful',
                    token: token
                });
            } else if (pin == PIN_2) {
                const user = {
                    author: "Kumar Shubhranshu"
                };
                const token = generateToken(user);
                res.json({
                    message: 'Authentication successful',
                    token: token
                });
            }
            res.json({
                message: 'Authentication failed',
            });
        });

        app.post('/user/register', (req, res) => {
            const { pin } = req.body;
            const newUser = req.body;
            newUser.timestamp = new Date();

            usersCollection.insertOne(newUser)
                .then(result => res.json({ message: 'Admin added successfully' }))
                .catch(err => console.error(err));
        });

        // CRUD operations for students
        app.get('/student', (req, res) => {
            // Implement your logic to retrieve all students
            studentsCollection.find({}).toArray()
                .then(students => res.json(students))
                .catch(err => console.error(err));
        });

        app.get('/student/:id', (req, res) => {
            const id = req.params.id;
            studentsCollection.find({}).toArray()
                .then(students => {
                    const student = students.find(student => student._id == id);
                    student
                        ? res.status(200).json(student)
                        : res.status(404).json({ message: 'Student not found' });
                })
                .catch(err => console.error(err));
        });

        app.post('/student', (req, res) => {
            return console.log(req.body);
            const newStudent = req.body;
            newStudent.timestamp = new Date();
            studentsCollection.insertOne(newStudent)
                .then(result => {
                    studentsCollection.find({}).toArray()
                        .then(students => res.json(students))
                        .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
        });

        app.put('/student/:id', (req, res) => {
            const id = req.params.id;
            const updatedStudent = req.body;
            studentsCollection.updateOne({ _id: id }, { $set: updatedStudent })
                .then(result => res.json({ message: 'Student updated successfully' }))
                .catch(err => console.error(err));
        });

        app.delete('/student/:id', (req, res) => {
            const id = req.params.id;
            studentsCollection.deleteOne({ _id: id })
                .then(result => res.json({ message: 'Student deleted successfully' }))
                .catch(err => console.error(err));
        });

        // Serve static files (for single-page app)
        app.use(express.static('public'));

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));


const generateToken = (user) => {
    console.log(user);
    return jwt.sign(user, process.env.SECRET_KEY, {
        'expiresIn': '4h'
    });
};

const validateToken = async (token, tokenSecret) => {
    // returns user info, if the jwt token is valid
    return await jwt.verify(token, tokenSecret,
        (error, payload) => {
            if (error) {
                throw (error);
            }
            req.user = decoded;
        });
};