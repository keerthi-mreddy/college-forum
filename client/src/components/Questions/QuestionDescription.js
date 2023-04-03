import React, { useState } from "react";
import QuestionEditor from "../Editor/QuestionEditor";
import {
	Button,
	Center,
	Container,
	Select,
	Spoiler,
	Tabs,
	Text,
} from "@mantine/core";
import { Markup } from "react-render-markup";
import { IconBallpen, IconHeartFilled, IconMessage, IconNotes } from "@tabler/icons-react";

import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../../util/Important Functions";

const QuestionDescription = (props) => {
	const navigate = useNavigate();

	const [answer, setAnswer] = useState();
	const userDetails = useSelector((state) => state.userDetails);
	const [sortBy, setSortBy] = useState("createdAt");

	const submitHandler = async () => {
		// console.log(userDetails);
		console.log(answer);
		if (answer === undefined || answer === null || answer.length === 0) {
			alert("Please enter a valid answer");
			return;
		}
		await Axios.post("http://localhost:5000/questions/new-answer", {
			questionId: props.questionDetails._id,
			given_by: userDetails._id,
			answer: answer,
			author: userDetails.fullname,
		});
		alert("Your answer has been added successfully!");
		window.location.reload();
	};

	const sortMethods = {
		createdAt: {
			method: (a, b) => {
				const ad = new Date(a.createdAt);
				const bd = new Date(b.createdAt);
				return bd - ad;
			},
		},
		upvotes: {
			method: (a, b) => {
				return b.upvoted_by.length - a.upvoted_by.length;
			},
		},
	};

	return (
		<div>
			{/* Here question details */}
			<Container size="lg">
				<Text size={55}>{props.questionDetails.title}</Text>
				<Markup markup={props.questionDetails.description} />
				<Text fw={500} pt="sm">
					<u>Asked by:</u> &nbsp;
					<a href={`../user/${props.questionDetails.asked_by}`}>
						{props.questionDetails.author}
					</a>{" "}
					on {convertDate(props.questionDetails.createdAt)}{" "}
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
						{props.allAnswers.sort(sortMethods[sortBy].method)
							.length !== 0 ? (
							<>
								<Container pb={80}>
									<Select
										mt="md"
										withinPortal
										data={[
											{
												value: "createdAt",
												label: "Time of Creation",
											},
											{
												value: "upvotes",
												label: "Number of upvotes",
											},
										]}
										placeholder="Sort by"
										size="sm"
										value={sortBy}
										onChange={setSortBy}
									/>
									{props.allAnswers.map((answer) => {
										return (
											<Spoiler
												key={answer._id}
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
												<div
													style={{
														float: "right",
													}}>
													<IconHeartFilled size={15} />
													{answer.upvoted_by.length}
												</div>
												{convertDate(answer.createdAt)}
												<Markup
													markup={answer.answer}
												/>
												<div
													style={{
														marginBottom: 20,
													}}>
													<u>Answered by:</u> &nbsp;
													<a
														href={`../user/${answer.given_by}`}>
														{answer.author}
													</a>{" "}
													on{" "}
													{convertDate(
														answer.createdAt
													)}{" "}
													<br />
													<Container
														size="100%"
														align="center">
														<Button
															mt={20}
															onClick={() => {
																navigate(
																	`../answer/${answer._id}`,
																	{
																		state: {
																			questionDetails:
																				props.questionDetails,
																			answerDetails:
																				answer,
																		},
																	}
																);
															}}>
															Open answer
														</Button>
													</Container>
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
