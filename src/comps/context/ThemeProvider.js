import React from "react";

import { createTheme, ThemeProvider as Provider, StyledEngineProvider } from "@mui/material";

const theme = createTheme({
		palette: {
			primary: {
				main: "#e66767",
				contrastText: "#fff"
			},
			secondary: {
				// light: "#ff7961",
				main: "#546de5",
				// dark: "#ba000d",
				contrastText: "#fff"
			}
		},
		typography: {
			fontFamily: `'Roboto Condensed', sans-serif`,
			htmlFontSize: 16,
			h1: {
				fontSize: "3rem",
				fontWeight: 700,
				margin: "0.5rem 0"
			},
			h2: {
				fontSize: "2.6rem",
				fontWeight: 700,
				margin: "0.5rem 0"
			},
			h3: {
				fontSize: "2.2rem",
				fontWeight: 500,
				margin: "0.5rem 0"
			},
			h4: {
				fontSize: "1.8rem",
				fontWeight: 500,
				margin: "0.5rem 0"
			},
			h5: {
				fontSize: "1.4rem",
				fontWeight: 400,
				margin: "0.5rem 0"
			},
			h6: {
				fontSize: "1rem",
				fontWeight: 400,
				margin: "0.5rem 0"
			}
		}
	}
);

const ThemeProvider = props => {
	return (
		<StyledEngineProvider injectFirst>
			<Provider theme={theme}>{props.children}</Provider>
		</StyledEngineProvider>
	);
};

export default ThemeProvider;
