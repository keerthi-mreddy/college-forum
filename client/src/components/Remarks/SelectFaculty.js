import {
	Button,
	Center,
	Container,
	Select,
	createStyles,
	rem,
	Table,
	Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { convertDate } from "../../util/Important Functions";

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

const SelectFaculty = () => {
	const { classes } = useStyles();

	const [allFaculties, setAllFaculties] = useState([]);
	const [facultyNames, setFacultyNames] = useState([]);
	const [allRemarks, setAllRemarks] = useState([]);

	const [facultyName, setFacultyName] = useState("");

	const userDetails = useSelector((state) => state.userDetails);

	useEffect(() => {
		const getAllFaculties = async () => {
			const response = await axios.get("http://localhost:5000/faculty/");
			// console.log(response.data);
			setAllFaculties(response.data);
			const names = [];
			for (let fac of response.data) {
				names.push(`${fac.position} - ${fac.fullname}`);
			}
			setFacultyNames(names);
		};
		getAllFaculties();
	}, []);

	const submitHandler = async (event) => {
		event.preventDefault();
		// console.log(facultyName);
		const ind = facultyNames.findIndex(function (name) {
			return name === facultyName;
		});
		// console.log(ind);
		const remarkRequest = {
			studentId: userDetails._id,
			facultyId: allFaculties[ind]._id,
		};
		console.log(remarkRequest);
		const response = await axios.post(
			"http://localhost:5000/remark/get-remark",
			remarkRequest
		);
		const remarks = response.data;
		remarks.reverse();
		setAllRemarks(remarks);
	};

	return (
		<div>
			<Container size="sm" mb={30}>
				<form onSubmit={submitHandler}>
					<Select
						mt="md"
						withinPortal
						data={facultyNames}
						onChange={setFacultyName}
						placeholder="Pick one"
						label="Choose Faculty"
						classNames={classes}
						required
					/>
					<br />
					<br />
					<Center>
						<Button variant="light" type="submit">
							Get Remarks
						</Button>
					</Center>
				</form>
			</Container>

			<Container size="sm">
				{allRemarks.length !== 0 ? (
					<div>
						<Center mb={20}>{allRemarks.length} remarks found</Center>
						<Table>
							<thead>
								<tr>
									<th>Time of Remark</th>
									<th>Remark</th>
								</tr>
							</thead>
							<tbody>
								{allRemarks.map((re) => {
									return <tr key = {re.createdAt}>
										<td>{convertDate(re.createdAt)}</td>
										<td>{re.remark}</td>
									</tr>;
								})}
							</tbody>
						</Table>
						{/* {allRemarks.map((re) => {
							return <p>{re.remark}</p>
						})} */}
					</div>
				) : (
					<Center>
						<Text>0 remarks found</Text>
					</Center>
				)}
			</Container>
		</div>
	);
};

export default SelectFaculty;
