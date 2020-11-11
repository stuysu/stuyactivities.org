import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import BackButton from "../comps/ui/BackButton";
import SignInRequired from "../comps/ui/SignInRequired";

const useStyles = makeStyles(theme => ({
	formContainer: {
		maxWidth: "1200px",
		margin: "auto",
		padding: "2rem"
	},
	form: {
		margin: "auto",
		display: "block",
		textAlign: "center"
	}
}));

export default function FeedbackForm() {
	const classes = useStyles();
	if (!this.context.signedIn) {
		return <SignInRequired />;
	}

	return (
		<div className={classes.formContainer}>
			<BackButton to={"/"} label={"Back To Home"} />
			<Typography variant={"h4"} color="primary" style={{ textAlign: "center" }}>
				Feedback Form
			</Typography>
			<div className={classes.form}>
				<br />
				<br />
				<iframe
					title="feedbackForm"
					src="https://docs.google.com/forms/d/e/1FAIpQLSd4abtXLw7GDW9H1etDOv6dVLSZKxO6EYgqvrk_tr7H1NoBew/viewform?embedded=true"
					width="640"
					height="3860"
					frameborder="0"
					marginheight="0"
					marginwidth="0"
				>
					Loading…
				</iframe>
			</div>
		</div>
	);
}
