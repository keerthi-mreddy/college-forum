import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import SelectFaculty from "../../components/Remarks/SelectFaculty";
import { Center, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Remarks = () => {
	const userDetails = useSelector((state) => state.userDetails);
	const navigate = useNavigate();
	useEffect(() => {
		if (!userDetails.verification_status) {
			alert("To access remarks you must verify your user status!");
			navigate("/");
		}
	}, []);

	return (
		<div>
			<Navbar />
			<Center>
				<Text size={40} mt={7} fw={700}>
					Student Remarks
				</Text>
			</Center>
			<SelectFaculty />
		</div>
	);
};

export default Remarks;
