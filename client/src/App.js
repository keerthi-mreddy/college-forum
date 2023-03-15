import "./App.css";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/Welcome Page/WelcomePage";
import { Login } from "./pages/Login and Signup/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Register } from "./pages/Login and Signup/Register";
import { Error } from "./pages/Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
	const dispatcher = useDispatch();

	const userLoggedIn = useSelector((state) => state.userLoggedIn);
	const userDetails = useSelector((state) => state.userDetails);

	useEffect(() => {
		console.log(userLoggedIn);
		if (userLoggedIn === false) {
			navigate("/login");
		}
	}, []);

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
			<Route path="/" element={<WelcomePage />} exact />
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
			<Route path="*" element={<Error />} exact />
		</Routes>
	);
}

export default App;
