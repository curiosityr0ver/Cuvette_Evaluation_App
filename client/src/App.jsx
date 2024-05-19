// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import AddStudent from "./pages/AddStudent";
import { useEffect, useState, useContext } from "react";
import { fetchStudents } from "../api/students";
import { UserContext } from "./context/UserContext";

function App() {
	const [students, setStudents] = useState();
	const { auth, setAuth } = useContext(UserContext);
	useEffect(() => {
		refreshStudentsOnLanding();
		const token = localStorage.getItem("token");
		if (token) {
			setAuth(token);
		}
	}, []);

	function refreshStudentsOnLanding() {
		fetchStudents().then((data) => {
			setStudents(data);
		});
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Dashboard students={students} auth={auth} setAuth={setAuth} />
					}
				/>
				<Route
					path="/student/new"
					element={
						<AddStudent
							type="new"
							refreshStudentsOnLanding={refreshStudentsOnLanding}
						/>
					}
				/>
				<Route
					path="/student/view/:id"
					element={
						<AddStudent
							type="view"
							refreshStudentsOnLanding={refreshStudentsOnLanding}
						/>
					}
				/>
				<Route
					path="/student/edit/:id"
					element={
						<AddStudent
							type="edit"
							refreshStudentsOnLanding={refreshStudentsOnLanding}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
