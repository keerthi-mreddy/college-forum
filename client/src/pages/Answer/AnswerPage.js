import React, { useEffect, useRef, useState } from "react";
import {
	ActionIcon,
	Button,
	Center,
	Container,
	Group,
	Spoiler,
	Tabs,
	Text,
	Textarea,
} from "@mantine/core";
import { Markup } from "react-render-markup";
import {
	IconBallpen,
	IconHeart,
	IconHeartFilled,
	IconMessage,
} from "@tabler/icons-react";

import Axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { convertDate } from "../../util/Important Functions";

const AnswerPage = () => {
	const [questionDetails, setQuestionDetails] = useState({});
	const [answerDetails, setAnswerDetails] = useState({});
	const [allComments, setAllComments] = useState([]);
	const [upvotes, setUpvotes] = useState(0);

	const userDetails = useSelector((state) => state.userDetails);

	const [liked, setLiked] = useState(false);

	const commentRef = useRef();

	const Location = useLocation();

	useEffect(() => {
		setQuestionDetails(Location.state.questionDetails);
		const getAllComments = async () => {
			const response = await Axios.post(
				"http://localhost:5000/questions/get-comments",
				{
					answerId: Location.state.answerDetails._id,
				}
			);
			console.log(response.data);
			if (response.data.length > 0) {
				if (response.data[0].upvoted_by.includes(userDetails._id)) {
					setLiked(true);
				}
				setAnswerDetails(response.data[0]);
				setAllComments(response.data[0].comments);
				setUpvotes(response.data[0].upvoted_by.length);
			}
		};
		getAllComments();
	}, [Location.state, userDetails, setLiked]);

	// console.log(props);
	const submitHandler = async () => {
		const comment = commentRef.current.value;
		console.log(comment);
		if (comment.length === 0) {
			alert("Please enter a valid comment");
			return;
		}
		await Axios.post("http://localhost:5000/questions/new-comment", {
			answerId: answerDetails._id,
			author: userDetails.fullname,
			comment: comment,
			given_by: userDetails._id,
		});
		alert("Your comment has been added successfully!");
		window.location.reload();
	};

	const likeHandler = async () => {
		setLiked((state) => {
			return !state;
		});
		if (liked === false) {
			setUpvotes((prev) => {
				return prev++;
			});
		} else {
			setUpvotes((prev) => {
				return prev--;
			});
		}
		await Axios.post("http://localhost:5000/questions/upvote", {
			answerId: answerDetails._id,
			userId: userDetails._id,
		});
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
					on {convertDate(questionDetails.createdAt)}{" "}
				</Text>
				<Markup markup={questionDetails.description} />
				<Text fw={500} fz="xl" pt="sm">
					<a href={`../user/${questionDetails.asked_by}`}>
						{questionDetails.author}
					</a>{" "}
					has answered saying:
				</Text>
				<Container size="md">
					<Markup markup={answerDetails.answer} />
				</Container>
				<>
					<Group align="left" display="flex">
						<ActionIcon onClick={likeHandler} color="red">
							{liked ? <IconHeartFilled /> : <IconHeart />}
						</ActionIcon>
						<Text>{upvotes}</Text>
					</Group>
					{liked ? (
						<i>You have upvoted the answer</i>
					) : (
						<i>Click here to upvote</i>
					)}
				</>
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
														marginBottom: 20,
													}}>
													<a
														href={`../user/${comment.given_by}`}>
														{comment.author}
													</a>{" "}
													on{" "}
													{convertDate(
														comment.createdAt
													)}{" "}
													says:
													<br />
													<Container
														size="100"
														align="center"></Container>
												</div>
												{comment.comment}
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
							{/* <QuestionEditor onEdit={setComment} /> */}
							<Textarea
								placeholder="New Comment"
								label="Enter your comment below"
								size="lg"
								w="100%"
								withAsterisk
								ref={commentRef}
							/>
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
