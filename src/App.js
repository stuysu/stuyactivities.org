import React from "react";
import "./App.css";

import ApolloProvider from "./comps/context/ApolloProvider";
import UserProvider from "./comps/context/UserProvider";
import ThemeProvider from "./comps/context/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import Content from "./comps/Content";

import ErrorBoundary from "@honeybadger-io/react";
import honeybadger from "./utils/honeybadger";

function App() {
	return (
		<ApolloProvider>
			<ThemeProvider>
				<BrowserRouter>
					<UserProvider>
						<ErrorBoundary honeybadger={honeybadger}>
							<Content />
						</ErrorBoundary>
					</UserProvider>
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
