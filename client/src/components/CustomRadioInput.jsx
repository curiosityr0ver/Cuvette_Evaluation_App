import { Radio, RadioGroup, Container, Text } from "@chakra-ui/react";

function CustomRadioInput({ label, value, setValue, options, disabled }) {
	return (
		<RadioGroup
			value={value}
			onChange={(val) => setValue(val)}
			isDisabled={disabled}
		>
			<Container
				display="flex"
				spacing={5}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				bg="white"
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
			</Container>
		</RadioGroup>
	);
}

export default CustomRadioInput;
