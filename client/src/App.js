import "./App.css";
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
import Demo  from "./pages/Demo";
import Questions from "./pages/Questions/Questions";
import Timetable from "./pages/Timetable/Timetable";

function App() {
	const dispatcher = useDispatch();

	const userLoggedIn = useSelector((state) => state.userLoggedIn);
	const userDetails = useSelector((state) => state.userDetails);

	// useEffect(() => {
	// 	console.log(userLoggedIn);
	// 	if (userLoggedIn === false) {
	// 		navigate("/login");
	// 	}
	// }, []);

	const navigate = useNavigate();

	const loginHandler = async (details) => {
		console.log(details);
		const { useremail, password } = details;
		const det = await axios.post("http://localhost:5000/users/login", {
			email: useremail,
			password: password,
		});
		if (typeof det.data === "string") {
			alert(det.data);
			navigate("/login");
		} else {
			// console.log(det.data);
			dispatcher({ type: "login", value: det.data });
			console.log(userDetails);
			navigate("/");
		}
		return true;
	};

	const registerHandler = async (details) => {
		console.log(details);
		const { username, useremail, password, gender, branch, year, section } =
			details;
		const det = await axios.post("http://localhost:5000/users/register", {
			email: useremail,
			password: password,
			fullname: username,
			gender: gender,
			branch: branch,
			year: year,
			section: section,
		});
		if (typeof det.data === "string") {
			alert(det.data);
			navigate("/login");
		} else {
			console.log(det.data);
			dispatcher({ type: "login", value: det.data });
			console.log(userDetails);
			navigate("/");
		}
		return true;
	};

	return (
		<Routes>
			<Route path="/" element={<Homepage />} exact />
			<Route
				path="/login"
				element={<Login onLogin={loginHandler} />}
				exact
			/>
			<Route
				path="/register"
				element={<Register onLogin={registerHandler} />}
				exact
			/>
			<Route
				path="/user-profile"
				element={
					userLoggedIn ? (
						<UserProfile />
					) : (
						<Navigate replace to={"/login"} />
					)
				}
				exact
			/>

			<Route
				path="/questions"
				element={
					userLoggedIn ? (
						<Questions />
					) : (
						<Navigate replace to={"/login"} />
					)
				}
				exact
			/>
			<Route
				path="/college-website"
				component={() => {
					window.location.href = "https://www.griet.ac.in";
					return null;
				}}
			/>
			<Route
				path="/announcements"
				element={
					userLoggedIn ? (
						<Announcement />
					) : (
						<Navigate replace to={"/login"} />
					)
				}
			/>
			<Route
				path="/timetable"
				element={
					userLoggedIn ? (
						<Timetable />
					) : (
						<Navigate replace to={"/login"} />
					)
				}
			/>
			<Route
				path="/demo"
				element={
					<Demo />
				}
			/>
			<Route path="*" element={<Error />} exact />
		</Routes>
	);
}

export default App;
