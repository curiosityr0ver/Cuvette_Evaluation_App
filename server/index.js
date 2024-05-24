const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { loginUser, authenticateUser } = require('./controllers/userController');
const { getAllStudents, getStudentById, handleNewStudent, handleStudentUpdate, handleDeleteStudent } = require('./controllers/studentController');
const { generateToken, validateToken } = require('./middleware/auth');
require('dotenv').config(); // will config the .env file present in the directory


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const PIN_1 = process.env.PIN_1;
const PIN_2 = process.env.PIN_2;
const SECRET_KEY = process.env.SECRET_KEY;

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
            res.status(200).json({ message: 'Hello, world!' });
        });

        // Authentication route
        app.post('/user/login', loginUser(PIN_1, PIN_2, SECRET_KEY));

        app.post('/user/register', loginUser(usersCollection));


        // CRUD operations for students
        app.get('/student', getAllStudents(studentsCollection));

        app.get('/student/:id', getStudentById(studentsCollection));

        app.post('/student',
            // verifyToken,
            handleNewStudent(studentsCollection));

        app.put('/student/:id', handleStudentUpdate(studentsCollection));

        app.delete('/student/:id', handleDeleteStudent(studentsCollection));

        // Serve static files (for single-page app)
        app.use(express.static('public'));

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));



