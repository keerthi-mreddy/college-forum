import {
	createStyles,
	Title,
	Container,
	Accordion,
	ThemeIcon,
	getStylesRef,
	rem,
	TextInput,
	ActionIcon,
	useMantineTheme,
	Text,
	Button,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Markup } from "react-render-markup";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import Axios from "axios";
import QuestionModal from "./QuestionModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
	wrapper: {
		paddingTop: `calc(${theme.spacing.xl} * 2)`,
		minHeight: rem(820),
		backgroundImage: `radial-gradient(${
			theme.colors[theme.primaryColor][2]
		} 0%, ${theme.colors[theme.primaryColor][5]} 100%)`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "top left",
		position: "relative",
		color: theme.black,
	},

	title: {
		color: theme.white,
		fontSize: 40,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		marginBottom: `calc(${theme.spacing.xl} * 1)`,
	},

	item: {
		backgroundColor: theme.white,
		borderBottom: 0,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.lg,
		overflow: "hidden",
	},

	control: {
		fontSize: theme.fontSizes.lg,
		padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
		color: theme.black,

		"&:hover": {
			backgroundColor: "transparent",
		},
	},

	content: {
		paddingLeft: theme.spacing.xl,
		lineHeight: 1.6,
		color: theme.black,
	},

	icon: {
		ref: getStylesRef("icon"),
		marginLeft: theme.spacing.md,
	},

	gradient: {
		backgroundImage: `radial-gradient(${
			theme.colors[theme.primaryColor][6]
		} 0%, ${theme.colors[theme.primaryColor][5]} 100%)`,
	},

	itemOpened: {
		[`& .${getStylesRef("icon")}`]: {
			transform: "rotate(45deg)",
		},
	},

	button: {
		display: "block",
		marginTop: theme.spacing.md,

		[theme.fn.smallerThan("sm")]: {
			display: "block",
			width: "100%",
		},
	},
}));

export default function AllQuestions() {
	const { classes } = useStyles();

	const navigate = useNavigate();

	const [questions, setQuestions] = useState([]);
	const [completeQuestions, setCompleteQuestions] = useState([]);

	const userLoggedIn = useSelector((state) => state.userLoggedIn);

	useEffect(() => {
		const getQuestions = async () => {
			if (!userLoggedIn) {
				// alert("Please login first");
				navigate("/");
			}
			const responses = await Axios.get(
				"http://localhost:5000/questions/all"
			);

			const data = responses.data;
			console.log(data);
			setQuestions(data);
			setCompleteQuestions(data);
		};
		getQuestions();
	}, []);

	const theme = useMantineTheme();

	const onChangeHandler = (event) => {
		const searchText = event.target.value;
		const filteredQuestions = completeQuestions.filter(
			(q) =>
				q.title.toLowerCase().includes(searchText) ||
				q.title.includes(searchText)
		);
		filteredQuestions.sort((a, b) => b.createdAt - a.createdAt);
		setQuestions(filteredQuestions);
	};

	return (
		<div className={classes.wrapper}>
			<Container size="sm">
				<Title align="center" className={classes.title}>
					Student Forum
				</Title>
				<Text c="white" align="center" pb="md">
					Browse And Answer recently asked questions by lots of
					students!
				</Text>
				<Container align="center">
					<TextInput
						icon={<IconSearch size="1.1rem" stroke={1.5} />}
						radius="xl"
						size="md"
						rightSection={
							<ActionIcon
								size={32}
								radius="xl"
								color={theme.primaryColor}
								variant="filled">
								{theme.dir === "ltr" ? (
									<IconArrowRight
										size="1.1rem"
										stroke={1.5}
									/>
								) : (
									<IconArrowLeft size="1.1rem" stroke={1.5} />
								)}
							</ActionIcon>
						}
						placeholder="Search questions"
						rightSectionWidth={42}
						onChange={onChangeHandler}
					/>
					<br />
					<QuestionModal />
				</Container>
				<br />
				<br />
				<Accordion
					chevronPosition="right"
					defaultValue="reset-password"
					chevronSize={50}
					variant="separated"
					disableChevronRotation
					chevron={
						<ThemeIcon
							radius="xl"
							className={classes.gradient}
							size={32}>
							<IconPlus size="1.05rem" stroke={1.5} />
						</ThemeIcon>
					}>
					{questions.length === 0 ? (
						<Container align="center" pt="sm">
							<i>OOPS! No questions found!</i>
						</Container>
					) : (
						questions.map((question) => {
							return (
								<Accordion.Item
									key={question._id}
									className={classes.item}
									value={question._id}>
									<Accordion.Control>
										<Text fw={700}>{question.title}</Text>
									</Accordion.Control>
									<Accordion.Panel>
										<Markup markup={question.description} />
										{/* {question.description} */}
										<Text c="dimmed" pt="sm">
											<u>Asked by:</u> &nbsp;
											<a
												href={`user/${question.asked_by}`}>
												{question.author}
											</a>{" "}
											on {question.createdAt}
										</Text>
										<Container align="center" pt="sm">
											<Button
												pt="2"
												align="center"
												variant="light"
												onClick={() => {
													navigate(
														`/question/${question._id}`
													);
												}}>
												Open Question
											</Button>
										</Container>
									</Accordion.Panel>
								</Accordion.Item>
							);
						})
					)}
				</Accordion>
			</Container>
		</div>
		// </MantineProvider>
	);
}
