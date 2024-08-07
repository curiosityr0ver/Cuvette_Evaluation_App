import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button, Input } from "@chakra-ui/react";
import { login } from "../api/students";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function NavBar() {
	const [pin, setPin] = useState();
	const [loading, setLoading] = useState(false);
	const [currentUser, setcurrentUser] = useState("Guest");
	const { auth, setAuth } = useContext(UserContext);
	const navigate = useNavigate();
	const userStyle = {
		color:
			currentUser == "Guest"
				? "black"
				: currentUser == "Ishu Mehta"
				? "#A0153E"
				: "#4793AF",
		backgroundColor:
			currentUser == "Guest"
				? "lightgray"
				: currentUser == "Ishu Mehta"
				? "#F2D7D5"
				: "#D5E8D4",
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setAuth(null);
		setcurrentUser("Guest");
	};

	const handleLogin = async () => {
		const tempPin = pin || JSON.parse(localStorage.getItem("pin"));
		if (!tempPin) return;
		setLoading(true);
		const { data } = await login(tempPin);
		setLoading(false);
		if (data.token) {
			setAuth(data.token);
			setcurrentUser(data.author);
			localStorage.setItem("pin", JSON.stringify(tempPin));
		} else {
			console.log("Invalid PIN");
			alert("Invalid PIN");
		}
	};
	useEffect(() => {
		handleLogin();
	}, []);

	return (
		<div className={styles.auth}>
			<div className={styles.user} style={userStyle}>
				{currentUser.toLocaleUpperCase()}
			</div>
			<div>
				{!auth && (
					<Input
						value={pin}
						onChange={(e) => setPin(e.target.value)}
						placeholder="Enter PIN"
						type="password"
					/>
				)}
				{auth && (
					<Button onClick={() => navigate("/student/new")}>
						New Interview
					</Button>
				)}
				{loading ? (
					<Button>Loading</Button>
				) : !auth ? (
					<Button onClick={handleLogin}>Login</Button>
				) : (
					<Button onClick={handleLogout}>Logout</Button>
				)}
			</div>
		</div>
	);
}

export default NavBar;
