// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import ExistingStudent from "./student/ExistingStudent";
import AddStudent from "./student/AddStudent";
import { useEffect, useState } from "react";
import { fetchStudents } from "../api/students";

function App() {
	const [students, setStudents] = useState();
	const [auth, setAuth] = useState();

	useEffect(() => {
		fetchStudents().then((data) => {
			console.log(data);
			setStudents(data);
		});
		const token = localStorage.getItem("token");
		if (token) {
			setAuth(token);
		}
	}, []);
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
