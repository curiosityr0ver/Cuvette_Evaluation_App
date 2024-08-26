const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const { loginUser } = require('./controllers/userController');
const { getAllStudents, getStudentById, handleNewStudent, handleStudentUpdate, handleDeleteStudent } = require('./controllers/studentController');
require('dotenv').config(); // will config the .env file present in the directory


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI;
MongoClient.connect(mongoURI)
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db('express-mongodb-app');
        const usersCollection = db.collection('users');
        const studentsCollection = db.collection('students');


        app.get('/', (req, res) => {
            res.json({ message: 'Welcome to the Express MongoDB App' });
        });

        app.get('/testing', (req, res) => {
            res.json({
                message: 'Shhhh...',
                string: process.env.MONGODB_URI
            });
        });

        // Authentication route
        app.post('/user/login', loginUser());

        // CRUD operations for students
        app.get('/student', getAllStudents(studentsCollection));

        app.get('/student/:id', getStudentById(studentsCollection));

        app.post('/student',
            // verifyToken,
            handleNewStudent(studentsCollection));

        app.put('/student/:id', handleStudentUpdate(studentsCollection));

        app.delete('/student/:id', handleDeleteStudent(studentsCollection));

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));



