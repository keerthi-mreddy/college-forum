import {
	Button,
	Center,
	Container,
	createStyles,
	rem,
	Select,
	Table,
} from "@mantine/core";
import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";

const useStyles = createStyles((theme) => ({
	root: {
		position: "relative",
	},

	input: {
		height: rem(54),
		paddingTop: rem(18),
	},

	label: {
		position: "absolute",
		pointerEvents: "none",
		fontSize: theme.fontSizes.xs,
		paddingLeft: theme.spacing.sm,
		paddingTop: `calc(${theme.spacing.sm} / 2)`,
		zIndex: 1,
	},
}));

const Timetable = () => {
	const { classes } = useStyles();
	const [branch, setBranch] = useState("");
	const [section, setSection] = useState("");
	const [year, setYear] = useState("");


	const submitHandler = (event) => {
		event.preventDefault();
		if (branch.length === 0 || section.length === 0 || year.length === 0) {
			alert(
				"Please enter valid Branch, Section and Year of Engineering!"
			);
		}
		console.log(branch, section, year);
	};

	const timeSlots = [
		"9:00 - 9:55",
		"9:55 - 10:50",
		"10:50 - 11:45",
		"11:45 - 12:25",
		"12:25 - 1:15",
		"1:15 - 2:05",
		"2:05 - 2:55",
	];

	const subjectPoints = [
		["SE", "SE", "FLAT", "BREAK", "OE", "CC", "CC"],
		["CC", "CC", "OE", "BREAK", "UML LAB", "UML LAB", "UML LAB"],
		["OE", "SE", "SE", "BREAK", "FLAT", "FLAT", "CoI"],
		["MPS", "MPS", "MPS", "BREAK", "OE", "ML", "ML"],
		["CoI", "SE", "CC", "BREAK", "ML", "ML", "OE"],
		["FLAT", "FLAT", "ML", "BREAK", "ML LAB", "ML LAB", "ML LAB"],
	]

	return (
		<div>
			<Navbar />
			<Container size="sm">
				<form onSubmit={submitHandler}>
					<Select
						mt="md"
						withinPortal
						data={["CSE", "ECE", "CE", "ME", "EE"]}
						placeholder="Pick one"
						label="Branch of Engineering"
						onChange={setBranch}
						classNames={classes}
						required
					/>
					<Select
						mt="md"
						withinPortal
						data={["1", "2", "3", "4"]}
						placeholder="Pick one"
						label="Year of Engineering"
						onChange={setYear}
						classNames={classes}
						required
					/>
					<Select
						mt="md"
						withinPortal
						data={["A", "B", "C", "D"]}
						placeholder="Pick one"
						label="Section"
						onChange={setSection}
						classNames={classes}
						required
					/>
					<br />
					<br />
					<Center>
						<Button centered variant="light" type="submit">
							Get Timetable
						</Button>
					</Center>
				</form>
			</Container>
			<br /> <br />
			{/* Timetable */}
			<Container sz="xl">
				<Table horizontalSpacing="md" verticalSpacing="sm">
					<thead>
						<tr>
							<th>
								<i>Timeslot</i>
							</th>
							<th>Monday</th>
							<th>Tuesday</th>
							<th>Wednesday</th>
							<th>Thursday</th>
							<th>Friday</th>
							<th>Saturday</th>
						</tr>
					</thead>
					<tbody>
						{timeSlots.map((slot, pos) => {
							console.log(subjectPoints[pos])
							return (
								<tr>
									<td>
										<i>{slot}</i>
									</td>
									<td>{subjectPoints[0][pos - '0']}</td>
									<td>{subjectPoints[1][pos - '0']}</td>
									<td>{subjectPoints[2][pos - '0']}</td>
									<td>{subjectPoints[3][pos - '0']}</td>
									<td>{subjectPoints[4][pos - '0']}</td>
									<td>{subjectPoints[5][pos - '0']}</td>
									{/* <td>{subjectPoints[6][pos - '0']}</td> */}
								</tr>
							);
						})}
					</tbody>
				</Table>
			<br /> <br />
			</Container>
		</div>
	);
};

export default Timetable;
