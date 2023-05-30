import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import AllQuestions from "../../components/Questions/AllQuestions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Questions = () => {
	const userDetails = useSelector((state) => state.userDetails);
	const navigate = useNavigate();
	useEffect(() => {
		// console.log(userDetails.verification_status);
		if (
			userDetails.verification_status !== undefined &&
			!userDetails.verification_status
		) {
			alert("To access questions you must verify your user status!");
			navigate("/");
		}
	}, []);
	return (
		<div>
			<Navbar />
			<AllQuestions />
		</div>
	);
};

export default Questions;
