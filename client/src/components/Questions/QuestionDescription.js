import React, { useState } from "react";
import QuestionEditor from "../Editor/QuestionEditor";
import { Button, Center, Container, Spoiler, Tabs, Text } from "@mantine/core";
import { Markup } from "react-render-markup";
import { IconBallpen, IconMessage } from "@tabler/icons-react";

import Axios from "axios";
import { useSelector } from "react-redux";

const QuestionDescription = (props) => {
	const [answer, setAnswer] = useState();
	const userDetails = useSelector((state) => state.userDetails);
	console.log(props)
	const submitHandler = async () => {
		console.log(userDetails);
		if(answer.length === 0) {
			alert('Please enter a valid answer');
			return;
		}
		await Axios.post("http://localhost:5000/questions/new-answer", {
			questionId: props.questionDetails._id,
			given_by: userDetails._id,
			answer: answer,
			author: props.questionDetails.author
		});
		alert("Your answer has been added successfully!");
		window.location.reload();
	};

	return (
		<div>
			{/* Here question details */}
			<Container size="lg">
				<Text size={55}>{props.questionDetails.title}</Text>
				<Markup markup={props.questionDetails.description} />
				{/* {question.description} */}
				<Text c="dimmed" pt="sm">
					<u>Asked by:</u> &nbsp;
					<a href={`../user/${props.questionDetails.asked_by}`}>
						{props.questionDetails.author}
					</a>{" "}
					on {props.questionDetails.createdAt}{" "}
				</Text>

				<Tabs
					orientation="horizontal"
					defaultValue="View answers"
					pt={30}>
					<Tabs.List grow>
						<Tabs.Tab
							value="View answers"
							icon={<IconMessage size="1.2rem" />}>
							{" "}
							<Text size={20}>View answers</Text>
						</Tabs.Tab>
						<Tabs.Tab
							value="Answer this question"
							icon={<IconBallpen size="1.2rem" />}>
							<Text size={20}>Answer this question</Text>
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="View answers" pl="xs">
						{props.allAnswers.length !== 0 ? (
							<>
								<Container pb={80}>
									{props.allAnswers.map((answer) => {
										return (
											<Spoiler
												mt={30}
												mb={30}
												sx={(theme) => ({
													backgroundColor:
														theme.colorScheme ===
														"dark"
															? theme.colors
																	.dark[6]
															: theme.colors
																	.gray[0],
													padding: theme.spacing.xl,
													borderRadius:
														theme.radius.md,
													cursor: "pointer",

													"&:hover": {
														backgroundColor:
															theme.colorScheme ===
															"dark"
																? theme.colors
																		.dark[5]
																: theme.colors
																		.gray[1],
													},
												})}
												maxHeight={80}
												showLabel="Show more"
												hideLabel="Hide">
												<Markup
													markup={answer.answer}
												/>
												<div>
													<u>Answered by:</u> &nbsp;
													<a
														href={`../user/${answer.given_by}`}>
														{
															answer.author
														}
													</a>{" "}
													on{" "}
													{
														answer
															.createdAt
													}{" "}
												</div>
											</Spoiler>
										);
									})}
								</Container>
							</>
						) : (
							<Center
								size="100%"
								h={400}
								mt={30}
								mb={90}
								align="center"
								sx={(theme) => ({
									backgroundColor:
										theme.colorScheme === "dark"
											? theme.colors.dark[6]
											: theme.colors.gray[0],
									padding: theme.spacing.xl,
									borderRadius: theme.radius.md,
									cursor: "pointer",

									"&:hover": {
										backgroundColor:
											theme.colorScheme === "dark"
												? theme.colors.dark[5]
												: theme.colors.gray[1],
									},
								})}>
								No answers found, please add!
							</Center>
						)}
					</Tabs.Panel>

					<Tabs.Panel value="Answer this question" pl="xs">
						<Container pt={40} align="center" pb={80}>
							<QuestionEditor onEdit={setAnswer} />
							<br />
							<Button onClick={submitHandler}>
								Add a new Answer to this question
							</Button>
						</Container>
					</Tabs.Panel>
				</Tabs>
			</Container>
		</div>
	);
};

export default QuestionDescription;
