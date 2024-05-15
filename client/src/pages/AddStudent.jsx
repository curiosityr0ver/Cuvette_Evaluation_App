// AddStudent.js
import { useState, useEffect, useContext } from "react";
import SubjectMarkingWidget from "../components/SubjectMarkingWidget";
import {
	Input,
	Button,
	Select,
	Stack,
	Radio,
	RadioGroup,
	Text,
	Flex,
} from "@chakra-ui/react";
import RemarkPicker from "../components/RemarkPicker";
import { addStudent } from "../../api/students";
import { remarks } from "../../data/Remarks";
import { UserContext } from "../context/UserContext";
import { interviewOptions } from "../../data/options";
import { communicationOptions } from "../../data/options";
import { explainationOptions } from "../../data/options";
import { fetchStudent } from "../../api/students";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
	const [name, setName] = useState();
	const [interview, setInterview] = useState("Evaluation");
	const [results, setResults] = useState();
	const [remark, setRemark] = useState([]);
	const [communication, setCommunication] = useState();
	const [explaination, setExplaination] = useState();
	const [loading, setLoading] = useState(false);
	const { auth, getAuth } = useContext(UserContext);
	const type = window.location.href.split("/")[4];
	const disabled = type === "view" ? true : false;
	const navigate = useNavigate();

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
			alert("Student Added Successfully");
		});
	};

	useEffect(() => {
		if (!auth) {
			getAuth();
		}
		if (type === "view" || (type === "edit" && auth)) {
			const studentID = window.location.href.split("/")[5];
			fetchStudent(studentID, auth).then((data) => {
				setName(data.name);
				setInterview(data.interview);
				setResults(data.results);
				setCommunication(data.communication);
				setExplaination(data.explaination);
				setRemark(data.remark);
			});
		}
	}, []);
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
						disabled={disabled}
						placeholder="Student Name"
					/>
					<RadioGroup
						defaultValue="Evaluation"
						value={interview}
						onChange={(val) => setInterview(val)}
						isDisabled={disabled}
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
						isDisabled={disabled}
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
						defaultValue="Good"
						value={explaination}
						onChange={(val) => setExplaination(val)}
						isDisabled={disabled}
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
					<div display="flex">
						<Button
							mt={"25"}
							onClick={handleSubmit}
							isDisabled={loading || disabled}
						>
							{loading ? "Loading" : "Submit"}
						</Button>
						<Button
							mt={"25"}
							onClick={() => navigate("/")}
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
						auth={auth}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	);
};

export default AddStudent;
