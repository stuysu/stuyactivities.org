import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import StudentVector from "../../../img/vectors/clip-student-thinking-about-mathematics.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleLoginButton from "../GoogleLoginButton";
import AuthContext from "../AuthContext";

const useStyles = makeStyles(theme => ({
	heading: {
		fontWeight: 600,
		color: 'transparency.text',
		margin: "1rem"
	},
	defaultVector: {
		maxWidth: "80vw",
		width: "300px",
		maxHeight: "25vh",
		marginTop: theme.spacing(2)
	},
	backButtonContainer: {
		textAlign: "left"
	},
	googleButton: {
		scale: 1.1,
		margin: theme.spacing(3)
	}
}));

const Student = () => {
	const classes = useStyles();

	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<div className={classes.backButtonContainer}>
				<Button color={"primary"} variant={"outlined"} onClick={() => authContext.set({ page: "landing" })}>
					&lt;- I'm not a student
				</Button>
			</div>

			<img src={StudentVector} alt={"Person walking through door"} className={classes.defaultVector} />
			<Typography variant={"h4"} className={classes.heading}>
				Student Sign In
			</Typography>

			<Typography variant={"subtitle1"}>Sign in with your @stuy.edu gmail account.</Typography>

			<GoogleLoginButton className={classes.googleButton} />
		</div>
	);
};
export default Student;
