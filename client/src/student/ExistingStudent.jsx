// AddStudent.js
import {
	useEffect,
	useState,
	// useEffect
} from "react";
import SubjectMarkingWidget from "./SubjectMarkingWidget";
import { Input, Button, Select } from "@chakra-ui/react";
import RemarkPicker from "../components/RemarkPicker";
import { fetchStudent } from "../../api/students";

const AddStudent = ({ auth }) => {
	const [name, setName] = useState();
	const [interview, setInterview] = useState("Mock");
	const [results, setResults] = useState();
	const [remark, setRemark] = useState([]);
	const studentID = window.location.href.split("/")[5];
	const [fruits, setFruits] = useState([
		"Who is often considered the greatest writer in the English language and the world's greatest dramatist?",
		"Which play is known as the 'Scottish Play'?",
		"In which play does the character Hamlet famously utter the phrase 'To be, or not to be'?",
		"Who is the famous star-crossed lover in Shakespeare's tragedy 'Romeo and Juliet'?",
		"Which play features the character Puck and is known for its magical elements?",
		// Add more questions as needed
	]);

	useEffect(() => {
		fetchStudent(studentID, auth).then((data) => {
			console.log(data);
			setName(data.name);
			setInterview(data.interview);
			setResults(data.results);
			setRemark(data.remark);
		});
	}, []);

	const subjects = ["JavaScript", "React", "NodeExpress", "Database"];

	const handleSubmit = async (event) => {
		event.preventDefault();
		const date = new Date();
		const student = {
			name,
			interview,
			results,
			remark,
			timestamp: date,
		};
	};

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
						disabled={!auth}
						placeholder="Student Name"
					/>
					<Select
						value={interview}
						variant={"subtle"}
						onChange={(e) => setInterview(e.target.value)}
						disabled={!auth}
						placeholder="Select Interview Type"
					>
						<option value="Mock">Mock</option>
						<option value="Evaluation">Evaluation</option>
					</Select>
					<Button mt={"100"} onClick={handleSubmit} disabled={!auth}>
						Add Student
					</Button>
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
							{results && (
								<SubjectMarkingWidget
									subjectName={subject}
									results={results}
									setResults={setResults}
									auth={auth}
								/>
							)}
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
					/>
				</div>
			</div>
		</div>
	);
};

export default AddStudent;
