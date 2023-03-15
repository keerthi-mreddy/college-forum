import {
	Paper,
	createStyles,
	TextInput,
	PasswordInput,
	Checkbox,
	Button,
	Title,
	Text,
	Anchor,
	rem,
	InputBase,
	Select,
} from "@mantine/core";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Password } from "../../components/Password/Password";

const useStyles = createStyles((theme) => ({
	wrapper: {
		backgroundSize: "60%",
		backgroundPosition: "right top",
		backgroundImage:
			"url(https://media0.giphy.com/media/xUOxfjsW9fWPqEWouI/giphy.gif)",
	},

	form: {
		borderRight: `${rem(1)} solid ${
			theme.colorScheme === "dark"
				? theme.colors.dark[7]
				: theme.colors.gray[3]
		}`,
		minHeight: rem(900),
		maxWidth: rem(500),
		paddingTop: rem(80),

		[theme.fn.smallerThan("sm")]: {
			maxWidth: "100%",
		},
	},

	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}));

export function Register(props) {
	const { classes } = useStyles();
	const usernameRef = useRef();
	const useremailRef = useRef();
	const passwordRef = useRef();
	const [gender, setGender] = useState("Male");
	const [branch, setBranch] = useState("CSE");
	const [section, setSection] = useState("A");
	const [year, setYear] = useState("1");
	const navigate = useNavigate();

	const onRegister = () => {
		// alert("in reg");
		// alert(useremailRef.current.value);
		// validating
		console.log(passwordRef);
		const username = usernameRef.current.value;
		const useremail = useremailRef.current.value;
		const password = passwordRef.current.value;
		// const gender = genderRef;

		if (password.length === 0) {
			alert("Enter a valid Full Name");
			return;
		}
		if (!useremail.includes("@")) {
			alert("Enter a valid email");
			return;
		}
		if (!password.length > 8) {
			alert("Enter a password having length > 8");
			return;
		}

		props.onLogin({
			username,
			useremail,
			password,
			gender,
			branch,
			year,
			section,
		});
	};

	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<Title
					order={2}
					className={classes.title}
					ta="center"
					mt="md"
					mb={50}>
					Welcome to Student Forum!
				</Title>
				<TextInput
					label="Full Name"
					placeholder="FirstName LastName"
					size="md"
					ref={usernameRef}
					value="Rohith Boppey"
					required
				/>
				<TextInput
					label="Email address"
					placeholder="hello@gmail.com"
					size="md"
					mt="md"
					value="hello@gmail.com"
					ref={useremailRef}
					required
				/>
				<Password customRef={passwordRef} />
				<Select
					label="Choose your Gender"
					data={[
						{ value: "Male", label: "Male" },
						{ value: "Female", label: "Female" },
						{ value: "Other", label: "Other" },
					]}
					required
					value={gender}
					mt="md"
					onChange={setGender}
				/>
				<Select
					label="Choose your year of study"
					data={[
						{ value: "1", label: "1" },
						{ value: "2", label: "2" },
						{ value: "3", label: "3" },
						{ value: "4", label: "4" },
						{ value: "Passed Out", label: "Passed Out" },
					]}
					required
					value={year}
					mt="md"
					onChange={setYear}
				/>
				<Select
					label="Choose your Branch"
					data={[
						{
							value: "CSE",
							label: "Computer Science and Engineering (CSE)",
						},
						{
							value: "ECE",
							label: "Electronics and Communication Engineering (ECE)",
						},
						{ value: "ME", label: "Mechanical Engineering" },
						{ value: "CE", label: "Civil Engineering" },
						{ value: "EEE", label: "Electrical Engineering" },
					]}
					required
					value={branch}
					mt="md"
					onChange={setBranch}
				/>
				<Select
					label="Choose your section"
					data={[
						{ value: "A", label: "A" },
						{ value: "B", label: "B" },
						{ value: "C", label: "C" },
						{ value: "D", label: "D" },
					]}
					required
					value={section}
					mt="md"
					onChange={setSection}
				/>
				<Checkbox
					label="You agree that you are from GRIET college?"
					mt="xl"
					size="md"
				/>
				<Button fullWidth mt="xl" size="md" onClick={onRegister}>
					Register
				</Button>

				<Text ta="center" mt="md">
					Have an account?{" "}
					<Anchor
						href="#"
						weight={700}
						onClick={() => navigate("/login")}>
						Sign in
					</Anchor>
				</Text>
			</Paper>
		</div>
	);
}
