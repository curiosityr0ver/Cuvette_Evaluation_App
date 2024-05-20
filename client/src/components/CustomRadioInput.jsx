import { Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

function CustomRadioInput({ label, value, setValue, options, disabled }) {
	return (
		<RadioGroup
			value={value}
			onChange={(val) => setValue(val)}
			isDisabled={disabled}
		>
			<Stack
				spacing={5}
				direction="row"
				alignItems="center"
				bg="gray.50"
				p={4}
				borderRadius="lg"
				m={4}
			>
				<Text fontWeight={600}>{`${label}:`} </Text>
				{options.map((option, index) => (
					<Radio key={index} colorScheme="green" value={option}>
						{option}
					</Radio>
				))}
			</Stack>
		</RadioGroup>
	);
}

export default CustomRadioInput;
