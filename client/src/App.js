import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login and Signup/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Register } from "./pages/Login and Signup/Register";
import { Error } from "./pages/Error/Error";
import { useDispatch, useSelector } from "react-redux";
import Homepage from "./pages/Home Page/Homepage";
import UserProfile from "./pages/User Profile/UserProfile";
import Announcement from "./pages/Announcements/Announcements";
import Demo from "./pages/Demo";
import Questions from "./pages/Questions/Questions";
import Timetable from "./pages/Timetable/Timetable";
import { useEffect } from "react";
import OtherUserProfile from "./pages/User Profile/OtherUserProfile";
import IndividualQuestion from "./pages/Questions/IndividualQuestion";
import AnswerPage from "./pages/Answer/AnswerPage";

function App() {
	const dispatcher = useDispatch();

	const userLoggedIn = useSelector((state) => state.userLoggedIn);

	const navigate = useNavigate();

	const loginHandler = async (details) => {
		// console.log(details);
		const { useremail, password, role } = details;
		let det;
		if (role === "Faculty") {
			det = await axios.post("http://localhost:5000/faculty/login", {
				useremail,
				password,
			});
		} else {
			det = await axios.post("http://localhost:5000/users/login", {
				email: useremail,
				password: password,
			});
		}
		console.log(det.data);
		if (typeof det.data === "string") {
			alert(det.data);
			navigate("/login");
		} else {
			console.log(det.data);
			localStorage.setItem("id", `${role} ${det.data._id}`);
			dispatcher({ type: "login", value: det.data });
			// console.log(userDetails);
			navigate("/");
		}

		return true;
	};

	const registerHandler = async (details) => {
		console.log(details);
		const {
			username,
			useremail,
			password,
			gender,
			branch,
			year,
			section,
			role,
			position,
		} = details;
		let det;
		if (role === "Faculty") {
			det = await axios.post("http://localhost:5000/faculty/register", {
				username,
				useremail,
				password,
				gender,
				position,
			});
		} else {
			det = await axios.post("http://localhost:5000/users/register", {
				email: useremail,
				password: password,
				fullname: username,
				gender: gender,
				branch: branch,
				year: year,
				section: section,
			});
		}
		if (typeof det.data === "string") {
			alert(det.data);
			navigate("/login");
		} else {
			console.log(det);
			localStorage.setItem("id", `${role} ${det.data._id}`);
			dispatcher({ type: "login", value: det.data });
			navigate("/");
		}
		return true;
	};

	const logoutHandler = () => {
		dispatcher({ type: "logout" });
		localStorage.removeItem("id");
		navigate("/login");
	};

	useEffect(() => {
		const checkLocalStorageAndLogin = async () => {
			const id = localStorage.getItem("id");
			if (id !== undefined && id !== null) {
				// some id exisits
				// console.log("in");
				const words = id.split(" ");
				console.log(words);
				let det;
				if (words[0] === "Student") {
					det = await axios.get(
						`http://localhost:5000/users/${words[1]}`
					);
				} else {
					det = await axios.get(
						`http://localhost:5000/faculty/${words[1]}`
					);
				}
				dispatcher({ type: "login", value: det.data[0] });
			}
		};
		checkLocalStorageAndLogin();
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Homepage />} exact />
			<Route
				path="/login"
				element={
					!userLoggedIn ? (
						<Login onLogin={loginHandler} />
					) : (
						<Navigate to="/" />
					)
				}
				exact
			/>
			<Route
				path="/register"
				element={<Register onLogin={registerHandler} />}
				exact
			/>
			<Route
				path="/user-profile"
				element={<UserProfile onLogout={logoutHandler} />}
				exact
			/>
			<Route
				path="/user/:id"
				element={<OtherUserProfile onLogout={logoutHandler} />}
				exact
			/>

			<Route path="/questions" element={<Questions />} exact />

			<Route
				path="/question/:id"
				element={<IndividualQuestion />}
				exact
			/>
			<Route path="/answer/:id" element={<AnswerPage />} exact />
			<Route
				path="/college-website"
				component={() => {
					window.location.href = "https://www.griet.ac.in";
					return null;
				}}
			/>
			<Route path="/announcements" element={<Announcement />} />
			<Route path="/timetable" element={<Timetable />} />
			<Route path="/demo" element={<Demo />} />
			<Route path="*" element={<Error />} exact />
		</Routes>
	);
}

export default App;
