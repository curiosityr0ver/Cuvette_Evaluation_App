// Dashboard.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import NavBar from "../components/NavBar";
import { Button } from "@chakra-ui/react";

const Dashboard = ({ students, auth, setAuth }) => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

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

	const totalScore = (topics) => {
		let total = 0;
		total += topics?.JavaScript?.reduce((acc, curr) => acc + curr, 0) || 0;
		total += topics?.React?.reduce((acc, curr) => acc + curr, 0) || 0;
		total += topics?.NodeExpress?.reduce((acc, curr) => acc + curr, 0) || 0;
		total += topics?.Database?.reduce((acc, curr) => acc + curr, 0) || 0;
		let max = 0;
		max += topics?.JavaScript?.length || 0;
		max += topics?.React?.length || 0;
		max += topics?.NodeExpress?.length || 0;
		max += topics?.Database?.length || 0;
		return total + "/" + max;
	};

	const reduceScore = (topic) => {
		if (topic === undefined) return "0/0";
		return topic?.reduce((acc, curr) => acc + curr, 0) + "/" + topic?.length;
	};

	return (
		<div className={styles.page}>
			<NavBar auth={auth} setAuth={setAuth} />
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Date</th>
						<th>Interview</th>
						{/* <th>JS</th>
						<th>React</th>
						<th>Node-Express</th>
						<th>Database</th>
						<th>Total</th> */}
						<th>Remarks</th>
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
								{/* <td>{reduceScore(student.results?.JavaScript)}</td>
								<td>{reduceScore(student.results?.React)}</td>
								<td>{reduceScore(student.results?.NodeExpress)}</td>
								<td>{reduceScore(student.results?.Database)}</td>
								<td>{totalScore(student?.results)}</td> */}
								<td>{student.remark}</td>
								<td>
									<Button
										onClick={() => navigate(`/student/view/${student._id}`)}
									>
										View
									</Button>
									<Button
										onClick={() => navigate(`/student/edit/${student._id}`)}
									>
										Edit
									</Button>
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
