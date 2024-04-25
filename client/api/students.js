import axios from 'axios';

const SERVER_URL =
    import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";

export const fetchStudents = async () => {
    const { data } = await axios.get(`${SERVER_URL}/student`);
    return data;
};

export const addStudent = async (student, auth) => {
    const { data } = await axios.post(`${SERVER_URL}/student`, student, {
        headers: {
            Authorization: "Bearer " + auth,
        },
    });
    return data;
};

export const fetchStudent = async (studentID, auth) => {
    const { data } = await axios.get(`${SERVER_URL}/student/${studentID}`, {
        headers: {
            Authorization: "Bearer " + auth,
        },
    });
    return data;
};