import React from "react";
import SignInVector from "../../../img/vectors/clip-internet-security.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import AuthContext from "../AuthContext";
import Link from "@mui/material/Link";

const useStyles = makeStyles(theme => ({
	userTypeButton: {
		marginRight: theme.spacing(3),
		marginLeft: theme.spacing(3),
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
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
		marginTop: "5%",
		textDecoration: "underline",
		cursor: "pointer"
	}
}));

const Landing = () => {
	const classes = useStyles();

	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<img
				src={SignInVector}
				alt={"Two people unlocking a computer with a key"}
				className={classes.defaultVector}
			/>
			<Typography variant={"h4"} className={classes.heading}>
				Let's get you signed in
			</Typography>
			<Typography variant={"subtitle1"}>
				Your session will expire 30 days after the last time you access StuyActivities.
				<br /> You can end your session anytime by logging out.
				<br /> If you are having any trouble logging in, please email{" "}
				<Link href="mailto:help@stuyactivities.org" color={"secondary"} underline="hover">
					help@stuyactivities.org
				</Link>
				.
			</Typography>
			<br />
			<Typography variant={"subtitle1"}>Are you signing in as a:</Typography>

			<Button
				variant={"contained"}
				className={classes.userTypeButton}
				color={"secondary"}
				onClick={() => authContext.set({ page: "student" })}
			>
				Student
			</Button>
			<Button
				variant={"contained"}
				className={classes.userTypeButton}
				color={"secondary"}
				onClick={() => authContext.set({ page: "teacher" })}
			>
				Teacher
			</Button>
			<p className={classes.cancelLogin} onClick={authContext.handleClose}>
				No thanks, I don't want to sign in.
			</p>
		</div>
	);
};

export default Landing;
