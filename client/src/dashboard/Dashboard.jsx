// Dashboard.js
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ students }) => {
	useEffect(() => {
		console.log(students);
	}, [students]);

	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleString();
	};

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
						<th>View Details</th>
					</tr>
				</thead>
				<tbody>
					{students?.map((student) => (
						<tr key={student._id}>
							<td>{student.name}</td>
							<td>{formatDate(student.timestamp)}</td>
							<td>{student.interview}</td>
							<td>{student.results?.JavaScript}</td>
							<td>{student.results?.React}</td>
							<td>{student.results?.["Node-Express"]}</td>
							<td>{student.results?.Database}</td>
							<td>{student?.["Cross-Examination"]}</td>
							<td>{student.Explaination}</td>
							<td>{student.verbal}</td>
							<td>{student.total}</td>
							<td>{student.CTC}</td>
							<td>{student.remark}</td>
							<td>{student["Final-Feedback"]}</td>
							<Link to={`/student/${student._id}`}>View</Link>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
