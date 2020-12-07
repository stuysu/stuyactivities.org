import React from "react";
import "./App.css";

import ApolloProvider from "./comps/context/ApolloProvider";
import UserProvider from "./comps/context/UserProvider";
import ThemeProvider from "./comps/context/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages";

import { SnackbarProvider } from "notistack";

function App() {
	return (
		<ApolloProvider>
			<ThemeProvider>
				<SnackbarProvider maxSnack={3}>
					<BrowserRouter>
						<UserProvider>
							<Pages />
						</UserProvider>
					</BrowserRouter>
				</SnackbarProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
