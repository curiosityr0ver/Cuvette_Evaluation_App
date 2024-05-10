import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<UserProvider>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</UserProvider>
);
