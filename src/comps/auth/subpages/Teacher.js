import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeacherVector from "../../../img/vectors/clip-teacher.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GoogleLoginButton from "../GoogleLoginButton";
// import MagicLogin from "../MagicLogin";
import AuthContext from "../AuthContext";
import FlexCenter from "../../ui/FlexCenter";

const useStyles = makeStyles(theme => ({
	textContainer: {
		width: "400px",
		maxWidth: "100%",
		padding: "1rem",
		textAlign: "left"
	},
	heading: {
		fontWeight: 600,
		color: `rgba(0, 0, 0, 0.8)`,
		margin: "1rem"
	},
	defaultVector: {
		maxWidth: "80%",
		width: "300px",
		maxHeight: "18vh",
		marginTop: theme.spacing(2)
	},
	backButtonContainer: {
		textAlign: "left"
	},
	code: {
		background: `rgba(0, 0, 0, 0.1)`,
		padding: 3,
		borderRadius: "5px",
		color: theme.palette.secondary.main,
		whiteSpace: "nowrap"
	}
}));

const Teacher = () => {
	const classes = useStyles();
	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<div className={classes.backButtonContainer}>
				<Button color={"primary"} variant={"outlined"} onClick={() => authContext.set({ page: "landing" })}>
					&lt;- I'm not a teacher
				</Button>
			</div>

			<img
				src={TeacherVector}
				alt={"A teacher holding a lightbulb in one hand with sparks coming out of the other"}
				className={classes.defaultVector}
			/>
			<Typography variant={"h4"} className={classes.heading}>
				Teacher Sign In
			</Typography>

			<FlexCenter>
				<div className={classes.textContainer}>
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
						<a className={classes.code} href={"mailto:app@stuyactivities.org"}>
							app@stuyactivities.org
						</a>{" "}
						with the subject line <span className={classes.code}>Login request</span>. The body of the email
						is not important.{" "}
					</Typography>
					<br />
					<Typography>
						Within a minute or so, you should receive a reply to your email with a link that will log you
						in. If you face any difficulties, please email us at help@stuyactivities.org.
					</Typography>
					<br />
				</div>
			</FlexCenter>
			{/*<MagicLogin />*/}

			<GoogleLoginButton />
		</div>
	);
};
export default Teacher;
