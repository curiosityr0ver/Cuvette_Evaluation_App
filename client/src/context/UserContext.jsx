import { createContext, useState, useEffect } from "react";

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
	// State to store user info
	const [auth, setAuth] = useState(null);

	// Fetch user info from local storage on component mount
	useEffect(() => {
		const storedAuth = localStorage.getItem("auth");
		if (storedAuth) {
			setAuth(JSON.parse(storedAuth));
		}
	}, []);

	useEffect(() => {
		if (auth) localStorage.setItem("auth", JSON.stringify(auth));
	}, [auth]);

	const getAuth = () => {
		const storedAuth = localStorage.getItem("auth");
		if (storedAuth) {
			setAuth(JSON.parse(storedAuth));
			return JSON.parse(storedAuth);
		}
	};

	// Value object to be provided by the context

	// Render the UserProvider with the provided value and children components
	return (
		<UserContext.Provider value={{ auth, getAuth, setAuth }}>
			{children}
		</UserContext.Provider>
	);
};
