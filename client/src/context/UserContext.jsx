import { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
	// State to store user info
	const [auth, setAuth] = useState(null);

	const getAuth = () => {
		return auth;
	};

	// Value object to be provided by the context

	// Render the UserProvider with the provided value and children components
	return (
		<UserContext.Provider value={{ auth, getAuth, setAuth }}>
			{children}
		</UserContext.Provider>
	);
};
