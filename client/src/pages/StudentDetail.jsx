// StudentDetail.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentDetail = () => {
	const { id } = useParams();
	const [student, setStudent] = useState(null);

	useEffect(() => {
		// Fetch student details by id from API or database
		// For now, we'll just simulate fetching data
		const fetchedStudent = {
			id: 1,
			name: "John Doe",
			marks: [8, 9, 7, 6, 5, 8],
		}; // Replace with actual fetched data
		setStudent(fetchedStudent);
	}, [id]);

	if (!student) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Student Detail - {student.name}</h1>
			<table>
				<thead>
					<tr>
						<th>Subject</th>
						<th>Marks</th>
					</tr>
				</thead>
				<tbody>
					{student.marks.map((mark, index) => (
						<tr key={index}>
							<td>Subject {index + 1}</td>
							<td>{mark}/10</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default StudentDetail;
