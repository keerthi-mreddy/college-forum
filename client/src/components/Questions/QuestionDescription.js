import React, { useEffect, useState } from "react";
import QuestionEditor from "../Editor/QuestionEditor";
import { Button, Container, Spoiler, Tabs, Text } from "@mantine/core";
import { Markup } from "react-render-markup";
import { IconBallpen, IconMessage } from "@tabler/icons-react";

import Axios from "axios";

const QuestionDescription = (props) => {
	const [answer, setAnswer] = useState();

	const submitHandler = () => {
		console.log(answer);
	};

	return (
		<div>
			{/* Here question details */}
			<Container size="lg">
				<Text size={70}>{props.questionDetails.title}</Text>
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
								{props.allAnswers.map((answer) => {
									return (
										<Container align="center" pb={80}>
											<Spoiler
												maxHeight={40}
												showLabel="Show more"
												hideLabel="Hide">
												{answer.answer}
											</Spoiler>
										</Container>
									);
								})}
							</>
						) : (
							<></>
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
