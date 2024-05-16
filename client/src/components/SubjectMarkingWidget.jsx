import { useEffect, useState } from "react";

const SubjectMarkingWidget = ({
	subjectName,
	results,
	setResults,
	disabled,
}) => {
	const totalQuestions = 5;
	const [questionStates, setQuestionStates] = useState(
		new Array(totalQuestions).fill(0)
	);
	useEffect(() => {
		if (results && results.length > 0) {
			setQuestionStates(results);
		}
	}, [results]);

	const toggleMark = (index) => {
		if (disabled) return;
		const newQuestionStates = [...questionStates];
		newQuestionStates[index] = (newQuestionStates[index] + 1) % 4; // Cycle through 0, 1, 2, 3
		setQuestionStates(newQuestionStates);
		setResults((results) => {
			const newResults = { ...results };
			newResults[subjectName] = newQuestionStates;
			return newResults;
		});
	};

	const addQuestion = () => {
		if (!disabled) setQuestionStates([...questionStates, 0]);
	};
	const removeQuestion = () => {
		if (!disabled) setQuestionStates(questionStates.slice(0, -1));
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
		</div>
	);
};

export default SubjectMarkingWidget;
