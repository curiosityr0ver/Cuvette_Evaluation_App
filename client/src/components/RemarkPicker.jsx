import React, { useState } from "react";
import {
	Tag,
	TagLabel,
	TagLeftIcon,
	TagCloseButton,
	Flex,
	Tooltip,
	Select,
	Input,
} from "@chakra-ui/react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const FruitsSelector = ({
	fruits,
	setFruits,
	remarks: selectedRemarks,
	setRemark: setSelectedRemarks,
	auth,
}) => {
	console.log(auth);
	const [customFruit, setCustomFruit] = useState();
	const toggleRemarkSelection = (remark) => {
		if (!auth) return;
		if (selectedRemarks.includes(remark)) {
			setSelectedRemarks(
				selectedRemarks.filter((selectedRemark) => selectedRemark !== remark)
			);
		} else {
			setSelectedRemarks([...selectedRemarks, remark]);
		}
	};

	const addFruit = (fruit) => {
		if (!auth) return;
		setFruits([...fruits, fruit]);
		setSelectedRemarks([...selectedRemarks, fruit]);
	};

	return (
		<Flex flexWrap="wrap">
			{fruits.map((fruit, index) => (
				<Tooltip label={fruit} key={index}>
					<Tag
						variant={selectedRemarks.includes(fruit) ? "solid" : "outline"}
						colorScheme={selectedRemarks.includes(fruit) ? "red" : "gray"}
						cursor="pointer"
						onClick={() => toggleRemarkSelection(fruit)}
						mb={2}
						mr={2}
					>
						<TagLeftIcon
							as={
								selectedRemarks.includes(fruit)
									? AiFillCloseCircle
									: AiFillCheckCircle
							}
							boxSize={4}
						/>
						<TagLabel>{fruit}</TagLabel>
					</Tag>
				</Tooltip>
			))}
			<Input
				placeholder="Add custom fruit"
				value={customFruit}
				onChange={(e) => setCustomFruit(e.target.value)}
				disabled={!auth}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						addFruit(customFruit);
						setCustomFruit("");
					}
				}}
			/>
		</Flex>
	);
};

export default FruitsSelector;
