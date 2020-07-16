import React from "react";
import "./App.css";

import ApolloProvider from "./comps/context/ApolloProvider";
import CurrentUser from "./comps/CurrentUser";
import AppProvider from "./comps/context/AppProvider";
import GoogleLoginButton from "./comps/GoogleLoginButton";
import ThemeProvider from "./comps/context/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./comps/PageRouter";
import AppBar from "./comps/ui/AppBar";

function App() {
	return (
		<ApolloProvider>
			<ThemeProvider>
				<BrowserRouter>
					<AppProvider>
						<AppBar />
						<GoogleLoginButton />
						<CurrentUser />
						<PageRouter />
					</AppProvider>
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
