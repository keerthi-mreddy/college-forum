import {
	createStyles,
	Title,
	Text,
	Button,
	Container,
	rem,
} from "@mantine/core";
import { Navbar } from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: "relative",
		paddingTop: rem(120),
		paddingBottom: rem(80),

		[theme.fn.smallerThan("sm")]: {
			paddingTop: rem(80),
			paddingBottom: rem(60),
		},
	},

	inner: {
		position: "relative",
		zIndex: 1,
	},

	dots: {
		position: "absolute",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[5]
				: theme.colors.gray[1],

		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	dotsLeft: {
		left: 0,
		top: 0,
	},

	title: {
		textAlign: "center",
		fontWeight: 800,
		fontSize: rem(40),
		letterSpacing: -1,
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		marginBottom: theme.spacing.xs,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,

		[theme.fn.smallerThan("xs")]: {
			fontSize: rem(28),
			textAlign: "left",
		},
	},

	highlight: {
		color: theme.colors[theme.primaryColor][
			theme.colorScheme === "dark" ? 4 : 6
		],
	},

	description: {
		textAlign: "center",

		[theme.fn.smallerThan("xs")]: {
			textAlign: "left",
			fontSize: theme.fontSizes.md,
		},
	},

	controls: {
		marginTop: theme.spacing.lg,
		display: "flex",
		justifyContent: "center",

		[theme.fn.smallerThan("xs")]: {
			flexDirection: "column",
		},
	},

	control: {
		"&:not(:first-of-type)": {
			marginLeft: theme.spacing.md,
		},

		[theme.fn.smallerThan("xs")]: {
			height: rem(42),
			fontSize: theme.fontSizes.md,

			"&:not(:first-of-type)": {
				marginTop: theme.spacing.md,
				marginLeft: 0,
			},
		},
	},
}));

export default function UserStatus() {
	const userDetails = useSelector((state) => state.userDetails);
	const userLoggedIn = useSelector((state) => state.userLoggedIn);

	const navigate = useNavigate();

	useEffect(() => {
		console.log(userDetails.facultyID);
		if (!userLoggedIn) {
			navigate("/login");
		}
	});

	const { classes } = useStyles();

	const verfiyHandler = () => {
		if (userDetails.facultyID !== undefined) {
			window.location.replace(
				`http://localhost:8080/?rollNumber=${userDetails.facultyID}&role=faculty`
			);
		} else {
			window.location.replace(
				`http://localhost:8080/?rollNumber=${userDetails.rollNumber}&role=user`
			);
		}
	};

	return (
		<>
			<Navbar />
			<Container className={classes.wrapper} size={1400}>
				<div className={classes.inner}>
					<Title className={classes.title}>
						Check your{" "}
						<Text
							component="span"
							className={classes.highlight}
							inherit>
							User Profile Status
						</Text>{" "}
						here
					</Title>

					<Container p={0} size={600}>
						{userDetails.verification_status === false ? (
							<Text
								size="lg"
								color="dimmed"
								className={classes.description}>
								Your User Profile with Roll Number{" "}
								<span style={{ color: "blue" }}>
									{userDetails.rollNumber}
								</span>{" "}
								has{" "}
								<span style={{ color: "red" }}>
									not been verified.
								</span>{" "}
								<br />
								Please verify using the given instructions.
							</Text>
						) : (
							<Text
								size="lg"
								color="dimmed"
								className={classes.description}>
								Your User Status has{" "}
								<span style={{ color: "green" }}>
									been verified.
								</span>{" "}
							</Text>
						)}
					</Container>

					<div className={classes.controls}>
						{userDetails.verification_status === false && (
							<Button
								className={classes.control}
								size="lg"
								onClick={verfiyHandler}>
								Verify Your User Profile
							</Button>
						)}
						{/* <Button
							className={classes.control}
							size="lg"
							variant="default"
							color="gray">
							Book a demo
						</Button> */}
					</div>
				</div>
			</Container>
		</>
	);
}
