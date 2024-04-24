// AddStudent.js
import {
	useState,
	// useEffect
} from "react";
import SubjectMarkingWidget from "./SubjectMarkingWidget";
import axios from "axios";
import { Input, Textarea, Button, Select } from "@chakra-ui/react";
import RemarkPicker from "../components/RemarkPicker";

const AddStudent = ({ auth }) => {
	const [name, setName] = useState();
	const [interview, setInterview] = useState("Mock");
	const [results, setResults] = useState();
	const [ctc, setCtc] = useState("Rejected");
	const [remark, setRemark] = useState([]);
	const [finalFeedback, setFinalFeedback] = useState("No Feedback");
	const [loading, setLoading] = useState(false);

	const [fruits, setFruits] = useState([
		"Who is often considered the greatest writer in the English language and the world's greatest dramatist?",
		"Which play is known as the 'Scottish Play'?",
		"In which play does the character Hamlet famously utter the phrase 'To be, or not to be'?",
		"Who is the famous star-crossed lover in Shakespeare's tragedy 'Romeo and Juliet'?",
		"Which play features the character Puck and is known for its magical elements?",
		// Add more questions as needed
	]);

	const subjects = ["JavaScript", "React", "NodeExpress", "Database"];

	const handleSubmit = async (event) => {
		event.preventDefault();
		const date = new Date();
		const student = {
			name,
			interview,
			results,
			ctc,
			remark,
			finalFeedback,
			timestamp: date,
		};
		//axios
		// const token = localStorage.getItem("token");
		console.log(student);
		const SERVER_URL =
			import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";
		const { data } = await axios.post(`${SERVER_URL}/student`, student, {
			headers: {
				Authorization: "Bearer " + auth,
			},
		});
		console.log(data);
	};

	return (
		<div>
			<h1>Add Student</h1>
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
						padding: "0px 1%",
						backgroundColor: "lightgray",
						width: "25%",
						borderRadius: "10px",
					}}
				>
					<label>Name:</label>
					<Input
						type="text"
						value={name}
						variant={"subtle"}
						onChange={(e) => setName(e.target.value)}
						disabled={!auth}
					/>
					<label>Interview:</label>
					<Select
						value={interview}
						variant={"subtle"}
						onChange={(e) => setInterview(e.target.value)}
						disabled={!auth}
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
							<SubjectMarkingWidget
								subjectName={subject}
								setResults={setResults}
								auth={auth}
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
					/>
				</div>
			</div>
		</div>
	);
};

export default AddStudent;
