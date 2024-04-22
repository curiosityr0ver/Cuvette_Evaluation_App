// Dashboard.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import NavBar from "../components/NavBar";

const Dashboard = ({ students, auth, setAuth }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (students) {
			setLoading(false);
		}
	}, [students]);

	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleString("en-US", {
			day: "numeric",
			month: "short",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
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
		<div className={styles.page}>
			<NavBar auth={auth} setAuth={setAuth} />
			<h1>Student Dashboard</h1>

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Date</th>
						<th>Interview</th>
						<th>JS</th>
						<th>React</th>
						<th>Node-Express</th>
						<th>Database</th>
						<th>Cross Qtn</th>
						<th>Explaination</th>
						<th>Verbal Comm</th>
						<th>Total</th>
						<th>CTC</th>
						<th>Remarks</th>
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
								<td className={styles.inline}>
									{formatDate(student.timestamp)}
								</td>
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
					{loading && <tr>Loading...</tr>}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
