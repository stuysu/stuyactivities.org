import React from "react";
import SignInVector from "../../../img/vectors/clip-sign-in.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	userTypeButton: {
		margin: theme.spacing(3),
		fontSize: "1rem"
	},
	heading: {
		fontWeight: 600,
		color: `rgba(0, 0, 0, 0.8)`,
		margin: "1rem"
	},
	defaultVector: {
		maxWidth: "80vw",
		width: "400px",
		marginTop: theme.spacing(2)
	},
	cancelLogin: {
		marginTop: "50px",
		textDecoration: "underline",
		cursor: "pointer"
	}
}));

const Landing = ({ setPage, handleClose }) => {
	const classes = useStyles();

	return (
		<div>
			<img
				src={SignInVector}
				alt={"Person walking through door"}
				className={classes.defaultVector}
			/>
			<Typography variant={"h4"} className={classes.heading}>
				Let's get you signed in
			</Typography>

			<Typography variant={"subtitle1"}>
				Are you signing in as a:
			</Typography>

			<Button
				variant={"contained"}
				className={classes.userTypeButton}
				color={"secondary"}
				onClick={() => setPage("student")}
			>
				Student
			</Button>
			<Button
				variant={"contained"}
				className={classes.userTypeButton}
				color={"secondary"}
				onClick={() => setPage("teacher")}
			>
				Teacher
			</Button>
			<p className={classes.cancelLogin} onClick={handleClose}>
				No thanks, I don't want to sign in.
			</p>
		</div>
	);
};

export default Landing;
