import React from "react";

import { createTheme, ThemeProvider as Provider, StyledEngineProvider, useMediaQuery } from "@mui/material";

// TODO: Manual toggle for dark mode

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
								background: "rgba(255, 255, 255, 0.08)",
								border: "rgba(255, 255, 255, 0.1)",
								borderDarker: "rgba(255, 255, 255, 0.24)",
								text: "rgba(255, 255, 255, 0.8)",
								textLighter: "rgba(255, 255, 255, 0.4)"
						  }
						: {
								background: "rgba(0, 0, 0, 0.08)",
								border: "rgba(0, 0, 0, 0.1)",
								borderDarker: "rgba(0, 0, 0, 0.24)",
								text: "rgba(0, 0, 0, 0.8)",
								textLighter: "rgba(0,0,0,0.4)"
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
						styleOverrides: {
							root: {
								backgroundImage: "unset",
								boxShadow: prefersDarkMode
									? "0px 2px 1px -1px rgba(255,255,255,0.2),0px 1px 1px 0px rgba(255,255,255,0.14),0px 1px 3px 0px rgba(255,255,255,0.12)"
									: {}
							}
						}
					},
					MuiTab: {
						styleOverrides: { root: { minWidth: "160px" } }
					}
				},
				// restores legacy breakpoint values
				breakpoints: {
					values: {
						xs: 0,
						sm: 600,
						md: 960,
						lg: 1280,
						xl: 1920
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
