import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./NavBar.module.css";

const SERVER_URL =
	import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";

function NavBar({ auth, setAuth }) {
	const [pin, setPin] = useState();
	const [loading, setLoading] = useState(false);
	const handleLogout = () => {
		localStorage.removeItem("token");
		setAuth(null);
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
		} else {
			alert("Invalid PIN");
		}
	};

	return (
		<div className={styles.auth}>
			{loading ? (
				<button>Loading</button>
			) : !auth ? (
				<button onClick={handleLogin}>Login</button>
			) : (
				<button onClick={handleLogout}>Logout</button>
			)}

			{!auth && (
				<input
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
