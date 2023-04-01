import React, { useEffect, useState } from "react";
import { Button, Center, Container, Spoiler, Tabs, Text } from "@mantine/core";
import { Markup } from "react-render-markup";
import { IconBallpen, IconMessage } from "@tabler/icons-react";

import Axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionEditor from "../../components/Editor/QuestionEditor";
import { Navbar } from "../../components/Navbar/Navbar";

const AnswerPage = (props) => {
	const navigate = useNavigate();

	const [questionDetails, setQuestionDetails] = useState({});
	const [answerDetails, setAnswerDetails] = useState({});
	const [allComments, setAllComments] = useState([]);
	const [comment, setComment] = useState("");

	const Location = useLocation();

	useEffect(() => {
		setQuestionDetails(Location.state.questionDetails);
		setAnswerDetails(Location.state.answerDetails);
		const getAllComments = async () => {
			const response = await Axios.post(
				"http://localhost:5000/questions/get-comments",
				{
					answerId: Location.state.answerDetails._id,
				}
			);
			console.log(response.data);
			if (response.data.length > 0) {
				setAllComments(response.data[0].comments);
			}
		};
		getAllComments();
	}, []);

	const userDetails = useSelector((state) => state.userDetails);
	// console.log(props);
	const submitHandler = async () => {
		console.log(comment);
		await Axios.post("http://localhost:5000/questions/new-comment", {
			answerId: answerDetails._id,
			author: userDetails.fullname,
			comment: comment,
			given_by: userDetails._id,
		});
		alert("Your answer has been added successfully!");
		window.location.reload();
	};

	return (
		<div>
			<Navbar />
			<Container size="lg">
				<Text size={55}>{questionDetails.title}</Text>
				<Text fw={500} fz="lg" pt="sm">
					<u>Asked by:</u> &nbsp;
					<a href={`../user/${questionDetails.asked_by}`}>
						{questionDetails.author}
					</a>{" "}
					on {questionDetails.createdAt}{" "}
				</Text>
				<Markup markup={questionDetails.description} />
				<Text fw={500} fz="xl" pt="sm">
					<a href={`../user/${questionDetails.asked_by}`}>
						{questionDetails.author}
					</a>{" "}
					have answered saying:
				</Text>
				<Container size="md">
					<Markup markup={answerDetails.answer} />
				</Container>
				<Tabs
					orientation="horizontal"
					defaultValue="View comments"
					pt={30}>
					<Tabs.List grow>
						<Tabs.Tab
							value="View comments"
							icon={<IconMessage size="1.2rem" />}>
							{" "}
							<Text size={20}>View comments</Text>
						</Tabs.Tab>
						<Tabs.Tab
							value="Add a new comment"
							icon={<IconBallpen size="1.2rem" />}>
							<Text size={20}>Add a new comment</Text>
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="View comments" pl="xs">
						{allComments.length !== 0 ? (
							<>
								<Container
									pb={80}
									style={{
										backgroundColor: "rgba(255, 255, 255)",
									}}>
									{allComments.map((comment) => {
										return (
											<Spoiler
												key={comment._id}
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
													markup={comment.comment}
												/>
												<br /> <br />
												<div
													style={{
														marginBottom: 20,
													}}>
													<u>Commented by:</u> &nbsp;
													<a
														href={`../user/${comment.given_by}`}>
														{comment.author}
													</a>{" "}
													on {comment.createdAt}{" "}
													<br />
													<Container
														size="100"
														align="center"></Container>
												</div>
											</Spoiler>
										);
									})}
								</Container>
							</>
						) : (
							<Center
								size="100%"
								h={200}
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
								No comments found!
							</Center>
						)}
					</Tabs.Panel>

					<Tabs.Panel value="Add a new comment" pl="xs">
						<Container pt={40} align="center" pb={80}>
							<QuestionEditor onEdit={setComment} />
							<br />
							<Button onClick={submitHandler}>
								Add a new Comment
							</Button>
						</Container>
					</Tabs.Panel>
				</Tabs>
			</Container>
		</div>
	);
};

export default AnswerPage;
