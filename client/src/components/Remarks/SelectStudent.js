import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
	Button,
	Center,
	Container,
	Group,
	ScrollArea,
	Table,
	Text,
	TextInput,
	UnstyledButton,
	createStyles,
	rem,
	Modal,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
	IconSelector,
	IconChevronDown,
	IconChevronUp,
	IconSearch,
} from "@tabler/icons-react";

import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

function Th({ children, reversed, sorted, onSort }) {
	const { classes } = useStyles();
	const Icon = sorted
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelector;
	return (
		<th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group position="apart">
					<Text fw={500} fz="sm">
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon size="0.9rem" stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</th>
	);
}

function filterData(data, search) {
	const query = search.toLowerCase().trim();
	return data.filter((item) =>
		keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
	);
}

function sortData(data, payload) {
	const { sortBy } = payload;
	console.log(data);

	if (!sortBy) {
		return filterData(data, payload.search);
	}

	return filterData(
		[...data].sort((a, b) => {
			if (payload.reversed) {
				return b[sortBy].localeCompare(a[sortBy]);
			}

			return a[sortBy].localeCompare(b[sortBy]);
		}),
		payload.search
	);
}

const data = [{ fullname: "R", email: "No", rollNumber: "no", branch: "CSE" }];

const SelectStudent = () => {
	const [search, setSearch] = useState("");
	const [sortedData, setSortedData] = useState(data);
	const [sortBy, setSortBy] = useState(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const [allStudents, setAllStudents] = useState([]);

	const [opened, { open, close }] = useDisclosure(false);

	const remarkRef = useRef();
	const [selectedId, setSelectedId] = useState("");
	
	const userDetails = useSelector((state) => state.userDetails);

	const navigate = useNavigate();

	const submitHandler = async (event) => {
		// console.log(userDetails)
		event.preventDefault();
		const remark = remarkRef.current.value;
		const details = {
			studentId: selectedId,
			facultyId: userDetails._id,
			remark: remark
		}
		console.log(details);
		await axios.post('http://localhost:5000/remark/new-remark', details);
		alert('New Remark added');
		navigate('/');
	};

	useEffect(() => {
		const getAllStudentDetails = async () => {
			const response = await axios.get("http://localhost:5000/users/");
			// console.log(response.data);
			setSortedData(response.data);
			setAllStudents(response.data);
		};
		getAllStudentDetails();
	}, []);

	const setSorting = (field) => {
		// console.log(field);
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		setSortedData(
			sortData(sortedData, { sortBy: field, reversed, search })
		);
	};

	const handleSearchChange = (event) => {
		const { value } = event.currentTarget;
		console.log(value);
		setSearch(value);
		setSortedData(
			sortData(allStudents, {
				sortBy,
				reversed: reverseSortDirection,
				search: value,
			})
		);
	};

	const rows = sortedData.map((row) => (
		<tr key={row.fullname}>
			<td>{row.fullname}</td>
			<td>{row.email}</td>
			<td>{row.rollNumber}</td>
			<td>{row.branch}</td>
			<td>
				<Button
					onClick={() => {
						setSelectedId(row._id);
						open();
						return;
					}}>
					New Remark
				</Button>
			</td>
		</tr>
	));

	return (
		<div>
			<Container>
				<ScrollArea>
					{/* <TextInput
						placeholder="Search for Student"
						mb="md"
						icon={<IconSearch size="0.9rem" stroke={1.5} />}
						value={search}
						onChange={handleSearchChange}
					/> */}
					<Table
						horizontalSpacing="md"
						verticalSpacing="xs"
						miw={700}
						sx={{ tableLayout: "fixed" }}>
						<thead>
							<tr>
								<Th
									sorted={sortBy === "fullname"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("fullname")}>
									Full Name
								</Th>
								<Th
									sorted={sortBy === "email"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("email")}>
									Email
								</Th>
								<Th
									sorted={sortBy === "rollNumber"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("rollNumber")}>
									Roll Number
								</Th>
								<Th
									sorted={sortBy === "branch"}
									reversed={reverseSortDirection}
									onSort={() => setSorting("branch")}>
									Branch
								</Th>
							</tr>
						</thead>
						<tbody>
							{rows.length > 0 ? (
								rows
							) : (
								<tr>
									<td colSpan={Object.keys(data[0]).length}>
										<Text weight={500} align="center">
											Nothing found
										</Text>
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</ScrollArea>
			</Container>

			<Modal opened={opened} onClose={close} title="New Remark">
				{/* Modal content */}
				<Text>Remark you want to give to this Student?</Text>
				<br />
				<TextInput placeholder="Remark" mb="md" ref={remarkRef} />
				<Button onClick={submitHandler}>Submit</Button>
			</Modal>
		</div>
	);
};

export default SelectStudent;
