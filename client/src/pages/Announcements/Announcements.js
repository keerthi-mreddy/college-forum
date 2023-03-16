import React from "react";
import { AnnouncementsTable } from "../../components/Announcement Table/AnnouncementsTable";
import { Navbar } from "../../components/Navbar/Navbar";

const Announcement = () => {
	return (
		<div>
			<Navbar />
			<AnnouncementsTable />
		</div>
	);
};

export default Announcement;
