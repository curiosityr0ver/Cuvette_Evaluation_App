import { useEffect, useState } from "react";

const SubjectMarkingWidget = ({ subjectName, results, setResults, auth }) => {
	const [marks, setMarks] = useState(new Array(10).fill(null));

	const toggleMark = (index) => {
		const newMarks = [...marks];
		if (newMarks[index] === null) {
			newMarks[index] = true; // Mark as correct
		} else if (newMarks[index] === true) {
			newMarks[index] = false; // Mark as incorrect
		} else {
			newMarks[index] = null; // Reset mark
		}
		setMarks(newMarks);
	};

	const correctCount = marks.filter((mark) => mark === true).length;

	const addQuestion = () => {
		setMarks([...marks, null]);
		// submitMarks(prev => {
		// 	...prev,
		// 	[subjectName]: `${correctCount}/${marks.length}`
		// });
	};
	const removeQuestion = () => {
		setMarks(marks.slice(0, marks.length - 1));
	};

	useEffect(() => {
		// results.subjectName = `${correctCount}/${marks.length}`;
		setResults({
			...results,
			[subjectName]: [correctCount, marks.length],
		});
	}, [marks]);

	return (
		<div>
			<h5
				style={{
					padding: "0px",
					margin: "0px",
				}}
			>
				{subjectName}{" "}
			</h5>
			<p>
				Correct Questions: {correctCount} / {marks.length}
			</p>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{marks.map((mark, index) => (
					<div
						key={index}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "25px",
							height: "25px",
							borderRadius: "50%",
							border: "1px solid #000",
							margin: "5px",
							backgroundColor:
								mark === null ? "transparent" : mark === true ? "green" : "red",
						}}
						onClick={auth ? () => toggleMark(index) : null}
					>
						{index + 1}
					</div>
				))}
				{auth && (
					<>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "25px",
								height: "25px",
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
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "25px",
								height: "25px",
								borderRadius: "50%",
								border: "1px solid #000",
								margin: "5px",
								backgroundColor: "gray",
							}}
							onClick={() => removeQuestion()}
						>
							-
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SubjectMarkingWidget;
