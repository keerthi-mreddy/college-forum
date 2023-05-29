import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import SelectStudent from "../../components/Remarks/SelectStudent";
import { Center, Text } from "@mantine/core";

const FacultyRemarks = () => {
	return (
		<div>
			<Navbar />
			<Center>
				<Text size={40} mt={7} fw={700} mb={30}>
					Faculty Remarks
				</Text>
			</Center>
			<SelectStudent />
		</div>
	);
};

export default FacultyRemarks;
