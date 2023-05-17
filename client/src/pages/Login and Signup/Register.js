import {
	Paper,
	createStyles,
	TextInput,
	Checkbox,
	Button,
	Title,
	Text,
	Anchor,
	rem,
	Select,
} from "@mantine/core";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
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
	const rollNumberRef = useRef();
	const [gender, setGender] = useState("Male");
	const [branch, setBranch] = useState("CSE");
	const [section, setSection] = useState("A");
	const [year, setYear] = useState("1");
	const [role, setRole] = useState("Student");
	const [position, setPosition] = useState("Assistant Professor");
	const navigate = useNavigate();

	const onRegister = () => {
		// alert("in reg");
		// alert(useremailRef.current.value);
		// validating
		console.log(passwordRef);
		const username = usernameRef.current.value;
		const useremail = useremailRef.current.value;
		const rollNumber = rollNumberRef.current.value;
		const password = passwordRef.current.value;
		// const gender = genderRef;

		const requirements = [
			{ re: /[0-9]/, label: "Includes number" },
			{ re: /[a-z]/, label: "Includes lowercase letter" },
			{ re: /[A-Z]/, label: "Includes uppercase letter" },
			{
				re: /[$&+,:;=?@#|'<>.^*()%!-]/,
				label: "Includes special symbol",
			},
		];

		if (password.length < 6) {
			alert("Please make sure you include atleast 6 characters");
			return;
		}

		if (requirements[0].re.test(password) == false) {
			alert("Should include number");
			return;
		}

		if (requirements[1].re.test(password) == false) {
			alert("Should include lowercase letter");
			return;
		}

		if (requirements[2].re.test(password) == false) {
			alert("Should include uppercase letter");
			return;
		}

		if (requirements[3].re.test(password) == false) {
			alert("Should include special character");
			return;
		}

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
			rollNumber,
			password,
			gender,
			branch,
			year,
			section,
			role,
			position,
		});
	};

	return (
		<>
			<Navbar />
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
						// value="R"
						required
					/>
					<TextInput
						label="Email address"
						placeholder="hello@gmail.com"
						size="md"
						mt="md"
						// value="hello@gmail.com"
						ref={useremailRef}
						required
					/>
					<TextInput
						label="Roll Number"
						placeholder="20241A05xx"
						size="md"
						mt="md"
						// value="hello@gmail.com"
						ref={rollNumberRef}
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
						label="Choose whom you are registering as"
						data={[
							{ value: "Student", label: "Student" },
							{
								value: "Faculty",
								label: "Faculty & Administration",
							},
						]}
						required
						value={role}
						mt="md"
						onChange={setRole}
					/>
					{role === "Student" && (
						<>
							<Select
								label="Choose your year of study"
								data={[
									{ value: "1", label: "1" },
									{ value: "2", label: "2" },
									{ value: "3", label: "3" },
									{ value: "4", label: "4" },
									{
										value: "Passed Out",
										label: "Passed Out",
									},
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
									{
										value: "ME",
										label: "Mechanical Engineering",
									},
									{ value: "CE", label: "Civil Engineering" },
									{
										value: "EEE",
										label: "Electrical Engineering",
									},
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
									{ value: "E", label: "E" },
									{ value: "F", label: "F" },
								]}
								required
								value={section}
								mt="md"
								onChange={setSection}
							/>
						</>
					)}

					{role === "Faculty" && (
						<>
							<Select
								label="Your position"
								data={[
									{
										value: "Assistant Professor",
										label: "Assistant Professor",
									},
									{ value: "Professor", label: "Professor" },
									{
										value: "Associate Professor",
										label: "Associate Professor",
									},
									{
										value: "Head of Professor",
										label: "Head of Professor",
									},
									{ value: "Dean", label: "Dean" },
								]}
								required
								value={position}
								mt="md"
								onChange={setPosition}
							/>
						</>
					)}

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
		</>
	);
}
