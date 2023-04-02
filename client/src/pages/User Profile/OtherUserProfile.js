import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../../components/Navbar/Navbar";

import Axios from "axios";

import "./userprofile.css";
import { useNavigate, useParams } from "react-router-dom";

const OtherUserProfile = () => {
	// console.log(props)
	const [userDetails, setUserDetails] = useState({});
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		const getUserDetails = async () => {
			const response = await Axios.get(
				`http://localhost:5000/users/${id}`
			);
			console.log(response.data);
			if (response.data.length === 0) {
				navigate("/error");
			}else{
				setUserDetails(response.data[0]);
			}
		};
		getUserDetails();
	});

	return (
		<div>
			<Navbar />
			<div class="container-up middle">
				<div class="outer">
					<div
						id="OtherUserProfilepage"
						class="profile-nav col-md-14 middle">
						<div class="panel">
							<div class="container-up user-heading round">
								<h1 style={{ fontSize: 28 }}>
									<br />
									You are viewing{" "}
									<i><u>{userDetails.fullname}</u></i>'s profile
								</h1>
							</div>
						</div>

						<div>
							<div class="row">
								<table
									className="table-m"
									border="1px"
									style={{ margin: "20px" }}>
									<tr>
										<th className="th-m">Email</th>
										<td className="td-m">
											{userDetails.email}
										</td>
									</tr>
									<tr>
										<th className="th-m">Full Name</th>
										<td className="td-m">
											{userDetails.fullname}
										</td>
									</tr>
									<tr>
										<th className="th-m">
											Branch of Engineering
										</th>
										<td className="td-m">
											{userDetails.branch}
										</td>
									</tr>
									<tr>
										<th className="th-m">Year of Study</th>
										<td className="td-m">
											{userDetails.year}
										</td>
									</tr>
									<tr>
										<th className="th-m">Section</th>
										<td className="td-m">
											{userDetails.section}
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<footer class="bg-light pb-5">
				<div class="container-up text-center">
					<p class="font-italic text-muted mb-0">
						&copy; &nbsp; grietstudentforum.com &nbsp; All rights
						reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default OtherUserProfile;
