// Dashboard.js
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ students, auth, setAuth }) => {
	const [pin, setPin] = useState();

	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleString("en-US", {
			day: "numeric",
			month: "short",
			year: "2-digit",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};
	const SERVER_URL =
		import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";
	const handleLogin = async () => {
		const { data } = await axios.post(`${SERVER_URL}/user/login`, {
			pin,
		});
		if (data.token) {
			localStorage.setItem("token", data.token);
			setAuth(data.token);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setAuth(null);
	};

	const totalScore = (student) => {
		const { results } = student;
		const db = results?.Database || [0, 10];
		const js = results?.JavaScript || [0, 10];
		const node = results?.NodeExpress || [0, 10];
		const react = results.React || [0, 10];
		const sum = db[0] + js[0] + node[0] + react[0];
		const denom = db[1] + js[1] + node[1] + react[1];
		return [sum, denom];
	};

	return (
		<div>
			<h1>Student Dashboard</h1>
			<h3>Enter PIN</h3>
			<button onClick={handleLogin}>Login</button>
			<button onClick={handleLogout}>Logout</button>

			<input
				value={pin}
				onChange={(e) => setPin(e.target.value)}
				type="password"
			/>
			<br />

			{auth && <Link to={`/student/new`}>Add New Student</Link>}
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Date</th>
						<th>Interview</th>
						<th>JavaScript</th>
						<th>React</th>
						<th>Node-Express</th>
						<th>Database</th>
						<th>Cross Questioning</th>
						<th>Explaination</th>
						<th>Verbal Comm</th>
						<th>Total</th>
						<th>CTC</th>
						<th>Remark</th>
						<th>Final Feedback</th>
						<th>Actions</th>
						<th>Author</th>
					</tr>
				</thead>
				<tbody>
					{students
						?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
						?.map((student) => (
							<tr key={student._id}>
								<td>{student.name}</td>
								<td>{formatDate(student.timestamp)}</td>
								<td>{student.interview}</td>
								<td>{student.results?.JavaScript?.join("/")}</td>
								<td>{student.results?.React?.join("/")}</td>
								<td>{student.results?.NodeExpress?.join("/")}</td>
								<td>{student.results?.Database?.join("/")}</td>
								<td>{student?.crossExamination}</td>
								<td>{student?.explaination}</td>
								<td>{student?.verbal}</td>
								<td>{totalScore(student).join("/")}</td>
								<td>{student.CTC}</td>
								<td>{student.remark}</td>
								<td>{student.finalFeedback}</td>
								<td>
									<Link to={`/student/view/${student._id}`}>View</Link>
									<Link to={`/student/edit/${student._id}`}>Edit</Link>
								</td>
								<td>{student?.author}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
