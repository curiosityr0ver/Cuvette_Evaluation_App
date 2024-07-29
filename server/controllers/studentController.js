const getStudentById = (studentsCollection) => (req, res) => {
    const id = req.params.id;
    studentsCollection.find({}).toArray()
        .then(students => {
            const student = students.find(student => student._id == id);
            student
                ? res.status(200).json(student)
                : res.status(404).json({ message: 'Student not found' });
        })
        .catch(err => console.error(err));
};

const handleDeleteStudent = (studentsCollection) => (req, res) => {
    const id = req.params.id;
    studentsCollection.deleteOne({ _id: id })
        .then(result => res.json({ message: 'Student deleted successfully' }))
        .catch(err => console.error(err));
};

const handleStudentUpdate = (studentsCollection) => (req, res) => {
    const id = req.params.id;
    var ObjectId = require('mongodb').ObjectId;
    const query = { _id: new ObjectId(req.params.id) };
    const updatedStudent = { ...req.body };
    delete updatedStudent.timestamp;
    studentsCollection.updateOne(query, { $set: updatedStudent })
        .then(result => {
            res.json({ message: 'Student updated successfully' });
        })
        .catch(err => console.error(err));
};

const handleNewStudent = (studentsCollection) => (req, res) => {
    try {
        const newStudent = {
            ...req.body,
            timestamp: new Date(),
            author: req.author,
        };
        studentsCollection.insertOne(newStudent)
            .then(result => {
                studentsCollection.find({}).toArray()
                    .then(students => res.status(201).json({ message: 'Student added successfully', students }))
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    } catch (error) {
        res.status(401).json({ message: 'Invalid Authorization' });
    }
};

const getAllStudents = (studentsCollection) => (req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    studentsCollection.find({
        timestamp: {
            $gte: thirtyDaysAgo
        }
    }).toArray()
        .then(students => {
            console.log(students);
            return res.json(students);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
};

module.exports = {
    getAllStudents,
    getStudentById,
    handleNewStudent,
    handleStudentUpdate,
    handleDeleteStudent,
};
