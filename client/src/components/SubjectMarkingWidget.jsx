import { useEffect, useState } from "react";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";

const SubjectMarkingWidget = ({
	subjectName,
	results,
	setResults,
	score,
	setScore,
	disabled,
}) => {
	const totalQuestions = 7;
	const [questionStates, setQuestionStates] = useState(
		new Array(totalQuestions).fill(0)
	);
	const [clicked, setClicked] = useState(false);
	const [copyScore, setCopyScore] = useState(0);

	useEffect(() => {
		if (results && results.length > 0) {
			setQuestionStates(results);
		}
	}, [results]);

	useEffect(() => {
		const scoreOutOf10 = Math.ceil(
			((correctCount + partiallyCorrectCount * 0.5) / questionStates.length) *
				10
		);
		setCopyScore(scoreOutOf10);
		if (!clicked) return;
		setScore((_score) => {
			const newScore = { ..._score };
			newScore[subjectName] = scoreOutOf10;
			return newScore;
		});
	}, [questionStates]);

	const toggleMark = (index) => {
		if (disabled) return;
		setClicked(true);
		questionStates[index] = (questionStates[index] + 1) % 4; // Cycle through 0, 1, 2, 3
		setQuestionStates([...questionStates]);
	};

	const addQuestion = () => {
		if (!disabled) setQuestionStates([...questionStates, 0]);
	};
	const removeQuestion = () => {
		if (!disabled) setQuestionStates([...questionStates.slice(0, -1)]);
	};

	useEffect(() => {
		setResults((results) => {
			const newResults = { ...results };
			newResults[subjectName] = questionStates;
			return newResults;
		});
	}, [questionStates]);

	const incrementScore = () => {
		if (disabled || score == 10) return;
		setScore((_score) => {
			const newScore = { ..._score };
			newScore[subjectName] = score > 0 ? score + 1 : 1;
			return newScore;
		});
	};
	const decrementScore = () => {
		if (disabled || score == 0) return;
		setScore((_score) => {
			const newScore = { ..._score };
			newScore[subjectName] = score > 0 ? score - 1 : 1;
			return newScore;
		});
	};

	const getColor = (state) => {
		if (state === 1) return "green";
		if (state === 2) return "yellow";
		if (state === 3) return "red";
		return "transparent";
	};

	const correctCount = questionStates.filter((state) => state === 1).length;
	const partiallyCorrectCount = questionStates.filter(
		(state) => state === 2
	).length;

	return (
		<div>
			<h2>{subjectName}</h2>
			<p>
				Correct Questions: {correctCount + partiallyCorrectCount * 0.5} /{" "}
				{questionStates.length}
			</p>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{questionStates.map((state, index) => (
					<div
						key={index}
						style={{
							width: "25px",
							height: "25px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: "50%",
							border: "1px solid #000",
							margin: "5px",
							backgroundColor: getColor(state),
							cursor: disabled ? "no-drop" : "pointer",
						}}
						onClick={() => toggleMark(index)}
					>
						{index + 1}
					</div>
				))}
				<div
					style={{
						width: "25px",
						height: "25px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: "50%",
						border: "1px solid #000",
						margin: "5px",
						backgroundColor: "gray",
					}}
					onClick={() => addQuestion()}
				>
					+
				</div>
				<div
					style={{
						width: "25px",
						height: "25px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: "50%",
						border: "1px solid #000",
						margin: "5px",
						backgroundColor: "gray",
					}}
					onClick={() => removeQuestion()}
				>
					-
				</div>
			</div>
			<div
				style={{
					width: "120px",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: "10px",
				}}
			>
				<NumberInput disabled={disabled} value={score || 0} min={0} max={10}>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper onClick={() => incrementScore()} />
						<NumberDecrementStepper onClick={() => decrementScore()} />
					</NumberInputStepper>
				</NumberInput>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						fontWeight: "bold",
						padding: "5px 10px",
						borderRadius: "2px",
						outline: "1px solid #000",
						backgroundColor: "lightgray",
					}}
				>
					{copyScore}
				</div>
			</div>
		</div>
	);
};

export default SubjectMarkingWidget;
