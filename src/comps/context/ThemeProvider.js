import React from "react";

import { ThemeProvider as Provider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#546de5",
			contrastText: "#fff"
		},
		secondary: {
			// light: "#ff7961",
			main: "#e66767",
			// dark: "#ba000d",
			contrastText: "#fff"
		}
	},
	typography: {
		fontFamily: `'Roboto Condensed', sans-serif`
	}
});

const ThemeProvider = props => {
	return <Provider theme={theme}>{props.children}</Provider>;
};

export default ThemeProvider;
