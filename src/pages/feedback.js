import React from "react";
import { Typography } from "@mui/material";
import BackButton from "../comps/ui/BackButton";
import Box from "@mui/material/Box";

const classes = {
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
};

export default function FeedbackForm() {
	return (
		<Box sx={classes.formContainer}>
			<BackButton to={"/"} label={"Back To Home"} />
			<Typography variant={"h4"} color="primary" style={{ textAlign: "center" }}>
				Feedback Form
			</Typography>
			<Box sx={classes.form}>
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
			</Box>
		</Box>
	);
}
