import { useState } from "react";
import {
	Tag,
	TagLabel,
	TagLeftIcon,
	Flex,
	Tooltip,
	Input,
} from "@chakra-ui/react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const RemarkPicker = ({
	allRemarks,
	setAllRemarks,
	selectedRemarks,
	setSelectedRemarks,
	disabled,
}) => {
	const [customRemark, setCustomRemark] = useState();

	const toggleRemarkSelection = (remark) => {
		if (disabled) return;
		if (selectedRemarks.includes(remark)) {
			setSelectedRemarks(
				selectedRemarks.filter((selectedRemark) => selectedRemark !== remark)
			);
		} else {
			setSelectedRemarks([...selectedRemarks, remark]);
		}
	};

	const addCustomRemark = () => {
		if (disabled) return;
		setCustomRemark("");
		setAllRemarks([...allRemarks, customRemark]);
		setSelectedRemarks([...selectedRemarks, customRemark]);
	};

	return (
		<Flex flexWrap="wrap">
			{allRemarks.map((rmk, index) => (
				<Tooltip label={rmk} key={index}>
					<Tag
						variant={selectedRemarks.includes(rmk) ? "solid" : "outline"}
						colorScheme={selectedRemarks.includes(rmk) ? "red" : "gray"}
						cursor={disabled ? "no-drop" : "pointer"}
						onClick={() => !disabled && toggleRemarkSelection(rmk)}
						mb={2}
						mr={2}
					>
						<TagLeftIcon
							as={
								selectedRemarks.includes(rmk)
									? AiFillCloseCircle
									: AiFillCheckCircle
							}
							boxSize={4}
						/>
						<TagLabel>{rmk}</TagLabel>
					</Tag>
				</Tooltip>
			))}
			<Input
				placeholder="Add custom remark"
				value={customRemark}
				onChange={(e) => setCustomRemark(e.target.value)}
				disabled={disabled}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						addCustomRemark(customRemark);
						setCustomRemark("");
					}
				}}
			/>
		</Flex>
	);
};

export default RemarkPicker;
