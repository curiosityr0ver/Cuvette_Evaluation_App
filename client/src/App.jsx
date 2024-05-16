// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
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
				<Route path="/student/new" element={<AddStudent type="new" />} />
				<Route path="/student/view/:id" element={<AddStudent type="view" />} />
				<Route path="/student/edit/:id" element={<AddStudent type="edit" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
