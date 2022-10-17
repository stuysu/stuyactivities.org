import React from "react";
import honeybadger from "../../utils/honeybadger";
import errorImage from "./../../img/vectors/cherry-list-is-empty.svg";
import { Typography } from "@mui/material";
import { HoneybadgerErrorBoundary } from "@honeybadger-io/react";
import Button from "@mui/material/Button";
import { triggerReportDialog } from "../help/ReportDialog";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const classes = {
	container: {
		textAlign: "center",
		paddingTop: "10vh"
	},
	vector: {
		width: 200,
		maxWidth: "80%"
	},
	textField: {
		width: 800,
		maxWidth: "90%",
		marginBottom: 50
	}
};

const ErrorScreen = ({ error }) => {
	return (
		<Box sx={classes.container}>
			<Box component="img" src={errorImage} alt={"Error box"} sx={classes.vector} />
			<Typography variant={"h3"} align={"center"} color={"primary"}>
				Sorry about that, there was an unexpected error
			</Typography>
			<br />
			<Button color={"secondary"} variant={"contained"} onClick={() => triggerReportDialog()}>
				Tell us more
			</Button>
			<p>
				Error: <span style={{ color: "red" }}>{error.message}</span>
			</p>
			<p>Stack Trace:</p>
			<TextField
				sx={classes.textField}
				value={error.stack}
				variant={"outlined"}
				disabled
				multiline
				rows={error.stack.split("\n").length}
			/>
		</Box>
	);
};

const ErrorBoundary = ({ children }) => {
	return (
		<HoneybadgerErrorBoundary honeybadger={honeybadger} ErrorComponent={ErrorScreen}>
			{children}
		</HoneybadgerErrorBoundary>
	);
};

export default ErrorBoundary;
