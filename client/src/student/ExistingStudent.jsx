// AddStudent.js
import { useState, useEffect } from "react";
import SubjectMarkingWidget from "./SubjectMarkingWidget";
import { Input, Button, Select } from "@chakra-ui/react";
import RemarkPicker from "../components/RemarkPicker";
import { addStudent } from "../../api/students";
import { remarks } from "../../data/Remarks";
import { fetchStudent } from "../../api/students";

const ExistingStudent = ({ auth }) => {
	const [name, setName] = useState();
	const [interview, setInterview] = useState("Mock");
	const [results, setResults] = useState();
	const [remark, setRemark] = useState([]);
	const [communication, setCommunication] = useState();
	const [explaination, setExplaination] = useState();
	const [loading, setLoading] = useState(false);

	const [fruits, setFruits] = useState(remarks);

	const subjects = ["JavaScript", "React", "NodeExpress", "Database"];

	const handleSubmit = async (event) => {
		event.preventDefault();
		const date = new Date();
		const student = {
			name,
			interview,
			results,
			remark,
			communication,
			explaination,
			timestamp: date,
		};
		console.log(student);
		setLoading(true);
		addStudent(student, auth).then((data) => {
			console.log(data);
			setLoading(false);
		});
	};
	useEffect(() => {
		const studentID = window.location.href.split("/")[5];
		fetchStudent(studentID, auth).then((data) => {
			console.log(data);
			setName(data.name);
			setInterview(data.interview);
			setResults(data.results);
			setCommunication(data.communication);
			setExplaination(data.explaination);
			setRemark(data.remark);
		});
	}, []);

	return (
		<div>
			<div
				style={{
					display: "flex",
					width: "100vw",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "space-around",
						padding: "0px 1%",
						backgroundColor: "lightgray",
						width: "25%",
						borderRadius: "10px",
					}}
				>
					<Input
						type="text"
						value={name}
						variant={"subtle"}
						onChange={(e) => setName(e.target.value)}
						disabled
						placeholder="Student Name"
					/>
					<Select
						value={interview}
						variant={"subtle"}
						onChange={(e) => setInterview(e.target.value)}
						disabled
						placeholder="Select Interview Type"
					>
						<option value="Mock">Mock</option>
						<option value="Evaluation">Evaluation</option>
					</Select>
					<Select
						value={communication}
						variant={"subtle"}
						onChange={(e) => setCommunication(e.target.value)}
						disabled
						placeholder="Communication"
					>
						<option value="Fluent">Fluent</option>
						<option value="Mid">Mid</option>
						<option value="Below Avg">Below Avg</option>
					</Select>
					<Select
						value={explaination}
						variant={"subtle"}
						onChange={(e) => setExplaination(e.target.value)}
						disabled
						placeholder="Explaination"
					>
						<option value="Excellent">Excellent</option>
						<option value="Good">Good</option>
						<option value="Below Avg">Below Avg</option>
					</Select>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "35%",
						marginLeft: "8px",
						paddingLeft: "20px",
						boxSizing: "border-box",
						border: "3px dashed black",
						borderRadius: "10px",
					}}
				>
					{subjects.map((subject, index) => (
						<div key={index}>
							<SubjectMarkingWidget
								subjectName={subject}
								results={results?.[subject] || []}
								setResults={setResults}
								auth={false}
							/>
						</div>
					))}
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "38%",
						marginLeft: "8px",
						padding: "0px 3%",
						boxSizing: "border-box",
						border: "3px dashed black",
						borderRadius: "10px",
					}}
				>
					<label htmlFor="">Remarks: </label>
					<RemarkPicker
						remarks={remark}
						setRemark={setRemark}
						fruits={fruits}
						setFruits={setFruits}
						auth={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default ExistingStudent;
