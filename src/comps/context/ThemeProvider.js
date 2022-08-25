import React from "react";

import { createTheme, ThemeProvider as Provider, StyledEngineProvider, useMediaQuery } from "@mui/material";

// TODO: Known bugs/issues
/*
 *   - No manual toggle for dark mode
 *   - Shadows don't invert, look into https://mui.com/system/shadows/
 *   - Needs confirmation:
 *      does the BackButton `sx` prop hack actually work
 *      does the `theme.palette.background.default` referenced in charter pages work
 *      check on MeetingCard.js
 *   Why is BasicInfoForm so confusing:
 *      where and what does the `classes.bottomMargin` in BasicInfoForm come from?!!
 *      we need to add the `sx` prop capabilities to the BasicInfoForm's components
 *   What is Masonry and why does it have its own classes (as seen in src/pages/explore.js)
 *
 *   various TODO comments have been strewn throughout the code i touched
 */

const ThemeProvider = props => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
					primary: {
						main: "#e66767",
						contrastText: "#fff"
					},
					secondary: {
						main: "#546de5",
						contrastText: "#fff"
					},
					button: {
						main: prefersDarkMode ? "rgba(255, 255, 255, 0.87)" : "rgba(0, 0, 0, 0.87)"
					},
					transparency: prefersDarkMode
						? {
								border: "rgba(255, 255, 255, 0.1)",
								borderDarker: "rgba(255, 255, 255, 0.24)",
								text: "rgba(255, 255, 255, 0.8)"
						  }
						: {
								border: "rgba(0, 0, 0, 0.1)",
								borderDarker: "rgba(0, 0, 0, 0.24)",
								text: "rgba(0, 0, 0, 0.8)"
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
				},
				components: {
					MuiPaper: {
						styleOverrides: { root: { backgroundImage: "unset" } }
					}
				}
			}),
		[prefersDarkMode]
	);
	return (
		<StyledEngineProvider injectFirst>
			<Provider theme={theme}>{props.children}</Provider>
		</StyledEngineProvider>
	);
};

export default ThemeProvider;
