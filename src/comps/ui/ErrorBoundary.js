import Boundary from "@honeybadger-io/react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import honeybadger from "../../utils/honeybadger";
import { triggerReportDialog } from "../help/ReportDialog";
import errorImage from "./../../img/vectors/cherry-list-is-empty.svg";

const useStyles = makeStyles({
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
});

const ErrorScreen = ({ error }) => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<img src={errorImage} alt={"Error box"} className={classes.vector} />
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
				className={classes.textField}
				value={error.stack}
				variant={"outlined"}
				disabled
				multiline
				rows={error.stack.split("\n").length}
			/>
		</div>
	);
};

const ErrorBoundary = ({ children }) => {
	return (
		<Boundary honeybadger={honeybadger} ErrorComponent={ErrorScreen}>
			{children}
		</Boundary>
	);
};

export default ErrorBoundary;
