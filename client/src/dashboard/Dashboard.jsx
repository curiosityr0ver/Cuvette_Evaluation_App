// Dashboard.js
// import { useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ students }) => {
	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleString();
	};
	const totalScore = (student) => {
		const { results } = student;
		const db = results.Database.split("/");
		const js = results.JavaScript.split("/");
		const node = results["Node-Express"].split("/");
		const react = results.React.split("/");
		const sum =
			parseInt(db[0]) +
			parseInt(js[0]) +
			parseInt(node[0]) +
			parseInt(react[0]);
		const denom =
			parseInt(db[1]) +
			parseInt(js[1]) +
			parseInt(node[1]) +
			parseInt(react[1]);
		return `${sum}/${denom}`;

		// console.log(parseInt(res));
		// const res =
		// 	0 +
		// 	// results.JavaScript +
		// 	// results.React +
		// 	// results["Node-Express"] +
		// 	// results.Database;
		// 	console.log(res);
	};
	// totalScore();
	return (
		<div>
			<h1>Student Dashboard</h1>
			<Link to={`/student/new`}>Add New Student</Link>
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
								<td>{student.results?.JavaScript}</td>
								<td>{student.results?.React}</td>
								<td>{student.results?.["Node-Express"]}</td>
								<td>{student.results?.Database}</td>
								<td>{student?.crossExamination}</td>
								<td>{student?.explaination}</td>
								<td>{student.verbal}</td>
								<td>{totalScore(student)}</td>
								<td>{student.CTC}</td>
								<td>{student.remark}</td>
								<td>{student.finalFeedback}</td>
								<td>
									<Link to={`/student/view/${student._id}`}>View</Link>
									<Link to={`/student/edit/${student._id}`}>Edit</Link>
									<button>Delete</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
