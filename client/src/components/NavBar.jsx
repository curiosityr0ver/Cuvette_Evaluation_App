import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button, Input } from "@chakra-ui/react";
import { login } from "../../api/students";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function NavBar() {
	const [pin, setPin] = useState();
	const [loading, setLoading] = useState(false);
	const [currentUser, setcurrentUser] = useState("Guest");
	const { auth, setAuth } = useContext(UserContext);

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
		const { data } = await login(pin);
		setLoading(false);
		if (data.token) {
			setAuth(data.token);
			console.log(data.token);
			localStorage.setItem("author", data.author);
			setcurrentUser(data.author);
		} else {
			alert("Invalid PIN");
		}
	};
	useEffect(() => {
		const author = localStorage.getItem("author");
		if (author) {
			setcurrentUser(author);
		}
	}, []);

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
