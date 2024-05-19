// AddStudent.js
import { useState, useEffect, useContext } from "react";
import SubjectMarkingWidget from "../components/SubjectMarkingWidget";
import {
	Input,
	Button,
	Stack,
	Radio,
	RadioGroup,
	Text,
} from "@chakra-ui/react";
import RemarkPicker from "../components/RemarkPicker";
import { addStudent, updateStudent } from "../../api/students";
import { UserContext } from "../context/UserContext";
import { interviewOptions, statusOptions } from "../../data/options";
import { communicationOptions } from "../../data/options";
import { explainationOptions } from "../../data/options";
import { fetchStudent } from "../../api/students";
import { useNavigate } from "react-router-dom";
import { remarks } from "../../data/Remarks";

const AddStudent = ({ type, refreshStudentsOnLanding }) => {
	const [name, setName] = useState();
	const [interview, setInterview] = useState("Evaluation");
	const [results, setResults] = useState();
	const [allRemarks, setAllRemarks] = useState(remarks);
	const [score, setScore] = useState();
	const [selectedRemarks, setSelectedRemarks] = useState([]);
	const [communication, setCommunication] = useState();
	const [explaination, setExplaination] = useState();
	const [status, setStatus] = useState();
	const [loading, setLoading] = useState(false);
	const { auth, getAuth } = useContext(UserContext);
	const navigate = useNavigate();

	const subjects = ["JavaScript", "React", "NodeExpress", "Database"];
	const handleSubmit = async (event) => {
		event.preventDefault();
		const date = new Date();
		const student = {
			name,
			interview,
			results,
			finalScore: score,
			remark: selectedRemarks,
			status,
			communication,
			explaination,
			timestamp: date,
		};
		setLoading(true);
		if (type === "edit") {
			const studentID = window.location.href.split("/")[5];
			updateStudent(studentID, student, auth).then((data) => {
				console.log(data);
				setLoading(false);
				alert("Student Updated Successfully");
			});
		} else if (type === "new") {
			addStudent(student, auth).then((data) => {
				console.log(data);
				setLoading(false);
				alert("Student Added Successfully");
			});
		}
	};

	useEffect(() => {
		if (!auth) {
			getAuth();
		}
		if ((type === "edit" || type == "new") && !auth) {
			navigate("/");
		}
		if (type === "view" || type === "edit") {
			const studentID = window.location.href.split("/")[5];
			fetchStudent(studentID, auth).then((data) => {
				setName(data.name);
				setInterview(data.interview);
				setResults(data.results);
				setScore(data.finalScore);
				setStatus(data.status || statusOptions[1]);
				setCommunication(data.communication);
				setExplaination(data.explaination);
				setSelectedRemarks(data.remark);
				data.remark.forEach((remark) => {
					if (!allRemarks.includes(remark)) {
						setAllRemarks([...allRemarks, remark]);
					}
				});
			});
		}
	}, []);

	const disabled = () => {
		if (type === "view" || loading) {
			return true;
		}
		return false;
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					width: "100vw",
					padding: "4px",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "space-around",
						padding: "12px",
						backgroundColor: "lightgray",
						width: "35%",
						borderRadius: "10px",
					}}
				>
					<Input
						type="text"
						value={name}
						variant={"subtle"}
						onChange={(e) => setName(e.target.value)}
						disabled={disabled()}
						placeholder="Student Name"
					/>
					<RadioGroup
						defaultValue="Evaluation"
						value={interview}
						onChange={(val) => setInterview(val)}
						isDisabled={disabled()}
					>
						<Stack
							spacing={5}
							direction="row"
							bg="gray.50"
							p={4}
							borderRadius="lg"
							m={4}
						>
							<Text fontWeight={600}>Interview: </Text>
							{interviewOptions.map((option, index) => (
								<Radio key={index} colorScheme="green" value={option}>
									{option}
								</Radio>
							))}
						</Stack>
					</RadioGroup>
					<RadioGroup
						defaultValue="Good"
						value={communication}
						onChange={(val) => setCommunication(val)}
						isDisabled={disabled()}
					>
						<Stack
							spacing={5}
							direction="row"
							bg="gray.50"
							p={4}
							borderRadius="lg"
							mb={4}
						>
							<Text fontWeight={600}>Communication: </Text>
							{communicationOptions.map((option, index) => (
								<Radio key={index} colorScheme="green" value={option}>
									{option}
								</Radio>
							))}
						</Stack>
					</RadioGroup>
					<RadioGroup
						defaultValue={explainationOptions[0]}
						value={explaination}
						onChange={(val) => setExplaination(val)}
						isDisabled={disabled()}
					>
						<Stack
							spacing={5}
							direction="row"
							bg="gray.50"
							p={4}
							borderRadius="lg"
						>
							<Text fontWeight={600}>Explaination: </Text>
							{explainationOptions.map((option, index) => (
								<Radio key={index} colorScheme="green" value={option}>
									{option}
								</Radio>
							))}
						</Stack>
					</RadioGroup>
					<RadioGroup
						defaultValue={statusOptions[1]}
						value={status}
						onChange={(val) => setStatus(val)}
						isDisabled={disabled()}
					>
						<Stack
							spacing={5}
							direction="row"
							bg="gray.50"
							p={4}
							borderRadius="lg"
						>
							<Text fontWeight={600}>Status: </Text>
							{statusOptions.map((option, index) => (
								<Radio key={index} colorScheme="green" value={option}>
									{option}
								</Radio>
							))}
						</Stack>
					</RadioGroup>
					<div display="flex">
						<Button mt={"25"} onClick={handleSubmit} isDisabled={disabled()}>
							{loading ? "Loading" : "Submit"}
						</Button>
						<Button
							mt={"25"}
							onClick={() => {
								refreshStudentsOnLanding();
								navigate("/");
							}}
							isDisabled={loading}
						>
							Home
						</Button>
					</div>
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
								score={score?.[subject] || 0}
								setScore={setScore}
								disabled={disabled()}
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
						allRemarks={allRemarks}
						setAllRemarks={setAllRemarks}
						selectedRemarks={selectedRemarks}
						setSelectedRemarks={setSelectedRemarks}
						disabled={disabled()}
					/>
				</div>
			</div>
		</div>
	);
};

export default AddStudent;
