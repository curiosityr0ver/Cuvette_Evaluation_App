const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

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
            // Implement your authentication logic here
            // For simplicity, let's assume the user is always authenticated
            res.json({ message: 'Authentication successful' });
        });

        app.post('/user/register', (req, res) => {
            const { username, pin, auth } = req.body;
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
