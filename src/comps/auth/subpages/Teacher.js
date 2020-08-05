import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeacherVector from "../../../img/vectors/clip-teacher.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GoogleLoginButton from "../GoogleLoginButton";
import MagicLogin from "../MagicLogin";
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
	}
}));

const Teacher = ({ setPage, setAuthToken }) => {
	const classes = useStyles();
	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<div className={classes.backButtonContainer}>
				<Button
					color={"primary"}
					variant={"outlined"}
					onClick={() => authContext.set({ page: "landing" })}
				>
					&lt;- I'm not a teacher
				</Button>
			</div>

			<img
				src={TeacherVector}
				alt={
					"A teacher holding a lightbulb in one hand with sparks coming out of the other"
				}
				className={classes.defaultVector}
			/>
			<Typography variant={"h4"} className={classes.heading}>
				Teacher Login
			</Typography>

			<FlexCenter>
				<div className={classes.textContainer}>
					<Typography variant={"subtitle1"}>
						If you've linked your StuyActivities account to a Google
						account in the past you can use that.
					</Typography>
					<br />
					<Typography variant={"subtitle1"}>
						Enter your @schools.nyc.gov email below and you'll
						receive a link that will automatically sign you in.
					</Typography>
					<br />
					<Typography>
						* Make sure to check your spam if you can't find the
						email
					</Typography>
				</div>
			</FlexCenter>
			<MagicLogin />

			<GoogleLoginButton />
		</div>
	);
};
export default Teacher;
