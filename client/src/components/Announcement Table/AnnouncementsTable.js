import {
	createStyles,
	Table,
	Progress,
	Anchor,
	Text,
	Group,
	ScrollArea,
	rem,
	Modal,
	Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CustomModal from "../Modal/CustomModal";

const mockdata = [
	{
		title: "Commencement of College",
		description:
			"We are commencing the college on this date. Please make sure to attend on the first date itself.",
		date: new Date("2022-03-25"),
		given_by: "Principal",
	},
	{
		title: "Closing of College",
		description:
			"We are commencing the college on this date. Please make sure to attend on the first date itself.",
		date: new Date("2022-03-26"),
		given_by: "Vice Principal",
	},
	{
		title: "Initial Announcement of College",
		description:
			"We are commencing the college on this date. Please make sure to attend on the first date itself.",
		date: new Date("2022-03-24"),
		given_by: "Vice Principal",
	},
];

mockdata.sort((a, b) => {
	return b.date - a.date
})

const giveAnnouncements = 
		mockdata.map((data) => (
			<tr key = {data}>
				<td>
					<CustomModal item={data} />
				</td>
				<td>{data.date.toLocaleString()}</td>
				<td>{data.given_by}</td>
			</tr>
		))
	


export function AnnouncementsTable({ data }) {
	return (
		<ScrollArea>
			<br></br>
			<br></br>
			<div style={{ padding: 20 }}>
				<Table
					sx={{ minWidth: 800 }}
					horizontalSpacing="sm"
					verticalSpacing="sm"
					captionSide="top">
					<caption>
						Find all the Announcements from recent to old
					</caption>
					<thead>
						<tr>
							<th>Announcement Title</th>
							<th>Date of Announcement</th>
							<th>Given By</th>
						</tr>
					</thead>
					<tbody>{giveAnnouncements}</tbody>
				</Table>
			</div>
		</ScrollArea>
	);
}
