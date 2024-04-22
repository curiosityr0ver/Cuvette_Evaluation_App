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
		setLoading(false);
		if (data.token) {
			localStorage.setItem("token", data.token);
			setAuth(data.token);
		}
	};

	return (
		<div className={styles.auth}>
			<h3>Enter PIN</h3>
			{!auth ? (
				<button onClick={handleLogin}>Login</button>
			) : (
				<button onClick={handleLogout}>Logout</button>
			)}
			{loading && <p>Loading...</p>}

			{!auth && (
				<input
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					type="password"
				/>
			)}
			<br />

			{auth && <Link to={`/student/new`}>Add New Student</Link>}
		</div>
	);
}

export default NavBar;
