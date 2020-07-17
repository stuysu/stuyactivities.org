import React from "react";
import "./App.css";

import ApolloProvider from "./comps/context/ApolloProvider";
import AppProvider from "./comps/context/AppProvider";
import ThemeProvider from "./comps/context/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import Content from "./comps/Content";

function App() {
	return (
		<ApolloProvider>
			<ThemeProvider>
				<BrowserRouter>
					<AppProvider>
						<Content />
					</AppProvider>
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	);
}



export default App;
