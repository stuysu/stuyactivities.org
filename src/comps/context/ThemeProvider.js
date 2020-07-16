import React from "react";

import { ThemeProvider as Provider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#EF5350",
			contrastText: "#fff"
		},
		secondary: {
			// light: "#ff7961",
			main: "#7287F9",
			// dark: "#ba000d",
			contrastText: "#fff"
		}
	}
});

const ThemeProvider = props => {
	return <Provider theme={theme}>{props.children}</Provider>;
};

export default ThemeProvider;
