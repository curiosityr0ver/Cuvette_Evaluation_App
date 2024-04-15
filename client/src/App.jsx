// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import AddStudent from "./student/AddStudent";
import { useEffect, useState } from "react";
import axios from "axios";

// import StudentDetail from "./StudentDetail";
// import AddStudent from "./AddStudent";

function App() {
	const [students, setStudents] = useState();
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
				{/* <Route path="/student/:id" component={StudentDetail} /> */}
				<Route path="/student/new" element={<AddStudent />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
