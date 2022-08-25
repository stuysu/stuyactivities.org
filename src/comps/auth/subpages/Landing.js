import React from "react";
import SignInVector from "../../../img/vectors/clip-internet-security.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthContext from "../AuthContext";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const classes = {
	userTypeButton: {
		marginRight: 3,
		marginLeft: 3,
		marginTop: 2,
		marginBottom: 2,
		fontSize: "1rem"
	},
	heading: {
		fontWeight: 600,
		color: 'transparency.text',
		margin: "1rem"
	},
	defaultVector: {
		maxWidth: "80vw",
		width: "400px",
		marginTop: 2
	},
	cancelLogin: {
		marginTop: "5%",
		textDecoration: "underline",
		cursor: "pointer"
	}
};

const Landing = () => {
	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<Box
				component="img"
				sx={classes.defaultVector}
				src={SignInVector}
				alt={"Two people unlocking a computer with a key"}
			/>
			<Typography variant={"h4"} sx={classes.heading}>
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
				sx={classes.userTypeButton}
				color={"secondary"}
				onClick={() => authContext.set({ page: "student" })}
			>
				Student
			</Button>
			<Button
				variant={"contained"}
				sx={classes.userTypeButton}
				color={"secondary"}
				onClick={() => authContext.set({ page: "teacher" })}
			>
				Teacher
			</Button>
			<Box sx={classes.cancelLogin} onClick={authContext.handleClose}>
				<p>No thanks, I don't want to sign in.</p>
			</Box>
		</div>
	);
};

export default Landing;
