// AddStudent.js
import { useState, useEffect, useContext } from "react";
import SubjectMarkingWidget from "../components/SubjectMarkingWidget";
import {
	Input,
	Button,
	Stack,
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import RemarkPicker from "../components/RemarkPicker";
import { addStudent, updateStudent } from "../../api/students";
import { UserContext } from "../context/UserContext";
import { interviewOptions, statusOptions } from "../../data/options";
import { communicationOptions } from "../../data/options";
import { fetchStudent } from "../../api/students";
import { useNavigate } from "react-router-dom";
import { remarks } from "../../data/Remarks";
import { parseOldStudent } from "../../data/parseOldStudent";
import CustomRadioInput from "../components/CustomRadioInput";
import styles from "./AddStudent.module.css";

const AddStudent = ({ type, refreshStudentsOnLanding }) => {
	const [name, setName] = useState();
	const [interview, setInterview] = useState(interviewOptions[0]);
	const [results, setResults] = useState();
	const [allRemarks, setAllRemarks] = useState(remarks);
	const [score, setScore] = useState();
	const [selectedRemarks, setSelectedRemarks] = useState([]);
	const [communication, setCommunication] = useState(communicationOptions[0]);
	const [explaination, setExplaination] = useState(5);
	const [crossQuestioning, setCrossQuestioning] = useState(5);
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
			crossQuestioning,
			timestamp: date,
			version: 2,
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
			fetchStudent(studentID, auth).then((_data) => {
				const data = parseOldStudent(_data);
				setName(data.name);
				setInterview(data.interview);
				setResults(data.results);
				setScore(data.finalScore);
				setStatus(data.status || statusOptions[1]);
				setCommunication(data.communication);
				setCrossQuestioning(data.crossQuestioning || 5);
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

	const incrementCrossQtn = () => {
		if (disabled() || crossQuestioning == 10) return;
		setCrossQuestioning(crossQuestioning + 1);
	};
	const decrementCrossQtn = () => {
		if (disabled() || crossQuestioning == 0) return;
		setCrossQuestioning(crossQuestioning - 1);
	};
	const incrementExplaination = () => {
		if (disabled() || explaination == 10) return;
		setExplaination(explaination + 1);
	};
	const decrementExplaination = () => {
		if (disabled() || explaination == 0) return;
		setExplaination(explaination - 1);
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
				<div className={styles.sectionOne}>
					<Input
						type="text"
						value={name}
						variant={"subtle"}
						onChange={(e) => setName(e.target.value)}
						disabled={disabled()}
						placeholder="Student Name"
					/>
					<CustomRadioInput
						label="Interview"
						value={interview}
						setValue={setInterview}
						options={interviewOptions}
						disabled={disabled()}
					/>
					<Stack
						spacing={5}
						direction="row"
						alignItems="center"
						bg="gray.50"
						p={3}
						borderRadius="lg"
						mb={4}
					>
						<Text fontWeight={600}>Cross-Questioning: </Text>
						<NumberInput
							disabled={disabled()}
							value={crossQuestioning}
							min={0}
							max={10}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper onClick={() => incrementCrossQtn()} />
								<NumberDecrementStepper onClick={() => decrementCrossQtn()} />
							</NumberInputStepper>
						</NumberInput>
						<Text fontWeight={600}>Explaination </Text>
						<NumberInput
							disabled={disabled()}
							value={explaination}
							min={0}
							max={10}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper
									onClick={() => incrementExplaination()}
								/>
								<NumberDecrementStepper
									onClick={() => decrementExplaination()}
								/>
							</NumberInputStepper>
						</NumberInput>
					</Stack>
					<CustomRadioInput
						label="Communication"
						value={communication}
						setValue={setCommunication}
						options={communicationOptions}
						disabled={disabled()}
					/>
					<CustomRadioInput
						label="Status"
						value={status}
						setValue={setStatus}
						options={statusOptions}
						disabled={disabled()}
					/>

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
				<div className={styles.sectionTwo}>
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
				<div className={styles.sectionThree}>
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
