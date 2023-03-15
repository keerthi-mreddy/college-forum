import React from "react";
import { AllServices } from "../../components/AllServices/AllServices";
import { Navbar } from "../../components/Navbar/Navbar";

const Homepage = () => {
	return (
		<div>
			<Navbar />
			<AllServices />
		</div>
	);
};

export default Homepage;
