import { Button, Container, Text, Textarea } from "@mantine/core";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import QuestionEditor from "../Editor/QuestionEditor";

import Axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionModalContent = () => {
	const titleRef = useRef();
	const [desc, setDesc] = useState("");

	const userDetails = useSelector((state) => state.userDetails);

	const navigate = useNavigate();
	const submitHandler = async (event) => {
		event.preventDefault();
		// console.log(titleRef.current.value);
		// console.log(desc)
		const response = await Axios.post(
			"http://localhost:5000/questions/new-question",
			{
				title: titleRef.current.value,
				description: desc,
				asked_by: userDetails._id,
				author: userDetails.fullname,
			}
		);
		alert('Question Added');
		window.location.reload();
	};

	return (
		<div>
			<Text size={20} pb="xl">
				Enter the following fields below to add a question.
			</Text>
			<Textarea
				placeholder="Title"
				label="Enter the title and description below"
				size="lg"
				w="60%"
				ref={titleRef}
				withAsterisk
			/>

			<Container size="sm" pb={200} pt={30}>
				<QuestionEditor onEdit={setDesc} />
				<br />
				<Button onClick={submitHandler}>Add a new Question</Button>
			</Container>
		</div>
	);
};

export default QuestionModalContent;
