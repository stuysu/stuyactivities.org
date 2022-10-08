import React from "react";
import TeacherVector from "../../../img/vectors/clip-teacher.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleLoginButton from "../GoogleLoginButton";
import AuthContext from "../AuthContext";
import FlexCenter from "../../ui/FlexCenter";
import Box from "@mui/material/Box";

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
						If you think your StuyActivities account is linked to your stuy.edu email or you have linked it
						to your own Google account you may use the sign in with Google option below. If that fails it's
						likely that your StuyActivities account is linked to your DOE email.
					</Typography>
					<br />
					<Typography variant={"subtitle1"}>
						For some reason the DOE email addresses completely block any emails we try to send out and so we
						need you to send us an email first in order for it to go through.
					</Typography>
					<br />
					<Typography>
						Send an email from your "@schools.nyc.gov" email to{" "}
						<Box component="a" sx={classes.code} href={"mailto:app@stuyactivities.org"}>
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
						in. If you face any difficulties, please email us at help@stuyactivities.org.
					</Typography>
					<br />
				</Box>
			</FlexCenter>

			<GoogleLoginButton />
		</div>
	);
};
export default Teacher;
