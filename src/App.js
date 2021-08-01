import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ApolloProvider from "./comps/context/ApolloProvider";
import ThemeProvider from "./comps/context/ThemeProvider";
import UserProvider from "./comps/context/UserProvider";
import Pages from "./pages";

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
