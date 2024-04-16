// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import ExistingStudent from "./student/ExistingStudent";
import AddStudent from "./student/AddStudent";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [students, setStudents] = useState();
	const [auth, setAuth] = useState();

	useEffect(() => {
		fetchStudents();
		const token = localStorage.getItem("token");
		if (token) {
			setAuth(token);
		}
	}, []);
	const SERVER_URL =
		import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";
	console.log(SERVER_URL);
	const fetchStudents = async () => {
		const { data } = await axios.get(`${SERVER_URL}/student`);
		setStudents(data);
		console.log("data: ", data);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Dashboard students={students} auth={auth} setAuth={setAuth} />
					}
				/>
				<Route path="/student/new" element={<AddStudent auth={auth} />} />
				<Route path="/student/view/:id" element={<ExistingStudent />} />
				<Route
					path="/student/edit/:id"
					element={<ExistingStudent auth={auth} students={students} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
