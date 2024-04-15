// AddStudent.js
import { useState, useEffect } from "react";
import SubjectMarkingWidget from "./SubjectMarkingWidget";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddStudent = ({ auth }) => {
	const [page, setPage] = useState();
	const [currStudent, setCurrStudent] = useState();
	const [name, setName] = useState();
	const [interview, setInterview] = useState("Mock");
	const [results, setResults] = useState();
	const [crossExamination, setCrossExamination] = useState("Bad");
	const [explaination, setExplaination] = useState("Bad");
	const [verbal, setVerbal] = useState("Bad");
	const [ctc, setCtc] = useState("Rejected");
	const [remark, setRemark] = useState("No Remarks");
	const [finalFeedback, setFinalFeedback] = useState("No Feedback");

	const location = useLocation();

	const subjects = ["JavaScript", "React", "NodeExpress", "Database"];

	const handleSubmit = async (event) => {
		event.preventDefault();
		const date = new Date();
		const student = {
			name,
			interview,
			results,
			crossExamination,
			explaination,
			verbal,
			ctc,
			remark,
			finalFeedback,
			timestamp: date,
		};
		//axios

		const { data } = await axios.post("http://localhost:5000/student", student);
		console.log(data);
	};

	const getHeader = () => {
		if (page == 0) {
			return "Add Student";
		} else if (page == 1) {
			return "View Student";
		} else {
			return "Edit Student";
		}
	};

	const fetchStudents = async (stud_id) => {
		const { data } = await axios.get(
			`http://localhost:5000/student/${stud_id}`
		);
		setCurrStudent(data);
	};

	useEffect(() => {
		const currPath = location.pathname.split("/");
		if (currPath.length == 3) {
			setPage(0);
		} else if (currPath[2] == "view") {
			setPage(1);
			fetchStudents(currPath[3]);
		} else if (currPath[2] == "edit") {
			setPage(2);
			fetchStudents(currPath[3]);
		}
	}, []);
	useEffect(() => {
		if (currStudent) {
			console.log(currStudent);
			setName(currStudent.name);
			setInterview(currStudent.interview);
			setRemark(currStudent.remark);
			setFinalFeedback(currStudent.finalFeedback);
			setResults(currStudent.results);
			setCrossExamination(currStudent.crossExamination);
			setExplaination(currStudent.explaination);
			setVerbal(currStudent.verbal);
			setCtc(currStudent.ctc);
		}
	}, [currStudent]);
	if (
		name &&
		interview &&
		remark &&
		finalFeedback &&
		results &&
		crossExamination &&
		explaination &&
		verbal &&
		ctc
	) {
		return (
			<div>
				<h1>{getHeader()}</h1>
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
							backgroundColor: "lightgray",
							width: "25%",
							borderRadius: "10px",
						}}
					>
						<label>Name:</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							disabled={!auth}
						/>
						<label>Interview:</label>
						<select
							value={interview}
							onChange={(e) => setInterview(e.target.value)}
							disabled={!auth}
						>
							<option value="3">Mock</option>
						</select>
						<label htmlFor="">Remarks:</label>
						<textarea
							value={remark}
							onChange={(e) => setRemark(e.target.value)}
							disabled={!auth}
							name=""
							id=""
							cols="30"
							rows="10"
						></textarea>
						<label htmlFor="">Final Feedback:</label>
						<textarea
							value={finalFeedback}
							onChange={(e) => setFinalFeedback(e.target.value)}
							disabled={!auth}
							name=""
							id=""
							cols="30"
							rows="10"
						></textarea>
						<button onClick={handleSubmit} disabled={!auth}>
							Add Student
						</button>
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
									results={results[subject]}
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
							width: "25%",
							marginLeft: "8px",
							padding: "0px 3%",
							boxSizing: "border-box",
							border: "3px dashed black",
							borderRadius: "10px",
						}}
					>
						<label>Cross Questioning:</label>
						<select
							value={crossExamination}
							onChange={(e) => setCrossExamination(e.target.value)}
							disabled={!auth}
						>
							<option value="Bad">Bad</option>
							<option value="Average">Average</option>
							<option value="Good">Good</option>
							<option value="Excellent">Excellent</option>
						</select>
						<label>Explaination:</label>
						<select
							value={explaination}
							onChange={(e) => setExplaination(e.target.value)}
							disabled={!auth}
						>
							<option value="Bad">Bad</option>
							<option value="Average">Average</option>
							<option value="Good">Good</option>
							<option value="Excellent">Excellent</option>
						</select>
						<label>Verbal:</label>
						<select
							value={verbal}
							onChange={(e) => setVerbal(e.target.value)}
							disabled={!auth}
						>
							<option value="Bad">Bad</option>
							<option value="Average">Average</option>
							<option value="Good">Good</option>
							<option value="Excellent">Excellent</option>
						</select>
						<label>CTC:</label>
						<select
							value={ctc}
							onChange={(e) => setCtc(e.target.value)}
							disabled={!auth}
						>
							<option value="Rejected">Rejected</option>
							<option value="<3LPA">Below 3 LPA</option>
							<option value="3-5LPA">3-5 LPA</option>
							<option value=">5LPA">Above 5 LPA</option>
							<option value="Reinterview">Re-Interview</option>
						</select>
					</div>
				</div>
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};

export default AddStudent;
