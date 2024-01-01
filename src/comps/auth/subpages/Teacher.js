import React from "react";
import TeacherVector from "../../../img/vectors/clip-teacher.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleLoginButton from "../GoogleLoginButton";
import AuthContext from "../AuthContext";
import FlexCenter from "../../ui/FlexCenter";
import Box from "@mui/material/Box";
import EmailLink from "../../ui/EmailLink";

const classes = {
	textContainer: {
		width: "400px",
		maxWidth: "100%",
		padding: "1rem",
		textAlign: "left"
	},
	heading: {
		fontWeight: 600,
		color: "transparency.text",
		margin: "1rem"
	},
	defaultVector: {
		maxWidth: "80%",
		width: "300px",
		maxHeight: "18vh",
		marginTop: 2
	},
	backButtonContainer: {
		textAlign: "left"
	},
	code: {
		backgroundColor: "transparency.border",
		padding: "3px",
		borderRadius: "5px",
		color: "secondary.main",
		whiteSpace: "nowrap"
	}
};

const Teacher = () => {
	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<Box sx={classes.backButtonContainer}>
				<Button color={"primary"} variant={"outlined"} onClick={() => authContext.set({ page: "landing" })}>
					&lt;- I'm not a teacher
				</Button>
			</Box>

			<Box
				component="img"
				src={TeacherVector}
				alt={"A teacher holding a lightbulb in one hand with sparks coming out of the other"}
				sx={classes.defaultVector}
			/>
			<Typography variant={"h4"} sx={classes.heading}>
				Teacher Sign In
			</Typography>

			<FlexCenter>
				<Box sx={classes.textContainer}>
					<Typography variant={"subtitle1"}>
						Most StuyActivities accounts are linked to stuy.edu emails, and you may use the "Sign in with
						Google" option below.
					</Typography>
					<br />
					<Typography variant={"subtitle1"}>
						Some legacy accounts are linked to a personal or DOE email address. If you believe this is the
						case, try using the same "Sign in with Google" button below. If that fails, try the DOE email
						troubleshooting steps below. Otherwise, please get in touch with us at{" "}
						<EmailLink email="IT@stuysu.org" />.
					</Typography>
					<br />
					<Typography variant={"subtitle1"}>
						DOE email inboxes automatically block any emails from an unrecognized email address like ours,
						so unless you send us an email first. Only then will our confirmation link go through.
					</Typography>
					<br />
					<Typography>
						Send an email from your "@schools.nyc.gov" email to{" "}
						<Box
							component="a"
							sx={classes.code}
							href={"mailto:app@stuyactivities.org?subject=Login%20request"}
						>
							app@stuyactivities.org
						</Box>{" "}
						with the subject line{" "}
						<Box component="span" sx={classes.code}>
							Login request
						</Box>
						. The body of the email is not important.{" "}
					</Typography>
					<br />
					<Typography>
						Within a minute or so, you should receive a reply to your email with a link that will log you
						in. If you face any difficulties, please email us at <EmailLink email="IT@stuysu.org" />.
					</Typography>
					<br />
				</Box>
			</FlexCenter>

			<GoogleLoginButton />
		</div>
	);
};
export default Teacher;
