import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./NavBar.module.css";
import { Button, Input } from "@chakra-ui/react";

const SERVER_URL =
	import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";

function NavBar({ auth, setAuth }) {
	const [pin, setPin] = useState();
	const [loading, setLoading] = useState(false);
	const [currentUser, setcurrentUser] = useState("Guest");

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
		setLoading(true);
		const { data } = await axios.post(`${SERVER_URL}/user/login`, {
			pin,
		});
		console.log(data);
		setLoading(false);
		if (data.token) {
			localStorage.setItem("token", data.token);
			setAuth(data.token);
			setcurrentUser(data.author);
		} else {
			alert("Invalid PIN");
		}
	};

	return (
		<div className={styles.auth}>
			<div className={styles.user} style={userStyle}>
				{currentUser.toLocaleUpperCase()}
			</div>
			{loading ? (
				<Button>Loading</Button>
			) : !auth ? (
				<Button onClick={handleLogin}>Login</Button>
			) : (
				<Button onClick={handleLogout}>Logout</Button>
			)}

			{!auth && (
				<Input
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					placeholder="Enter PIN"
					type="password"
				/>
			)}
			<br />

			{auth && <Link to={`/student/new`}>Add New Student</Link>}
		</div>
	);
}

export default NavBar;
