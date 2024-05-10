// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import ExistingStudent from "./pages/ExistingStudent";
import AddStudent from "./pages/AddStudent";
import { useEffect, useState, useContext } from "react";
import { fetchStudents } from "../api/students";
import { UserContext } from "./context/UserContext";

function App() {
	const [students, setStudents] = useState();
	// const [auth, setAuth] = useState();
	const { auth, getAuth, setAuth } = useContext(UserContext);
	useEffect(() => {
		fetchStudents().then((data) => {
			console.log(data);
			setStudents(data);
		});
		console.log(getAuth());
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
