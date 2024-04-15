// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import AddStudent from "./student/AddStudent";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [students, setStudents] = useState();
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		fetchStudents();
	}, []);

	const fetchStudents = async () => {
		const { data } = await axios.get("http://localhost:5000/student");
		setStudents(data);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard students={students} />} />
				<Route path="/student/new" element={<AddStudent auth={auth} />} />
				<Route path="/student/view/:id" element={<AddStudent auth={auth} />} />
				<Route path="/student/edit/:id" element={<AddStudent auth={auth} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
