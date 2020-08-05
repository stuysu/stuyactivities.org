import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StudentVector from "../../../img/vectors/clip-student-thinking-about-mathematics.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GoogleLoginButton from "../GoogleLoginButton";
import AuthContext from "../AuthContext";

const useStyles = makeStyles(theme => ({
	heading: {
		fontWeight: 600,
		color: `rgba(0, 0, 0, 0.8)`,
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
				<Button
					color={"primary"}
					variant={"outlined"}
					onClick={() => authContext.set({ page: "landing" })}
				>
					&lt;- I'm not a student
				</Button>
			</div>

			<img
				src={StudentVector}
				alt={"Person walking through door"}
				className={classes.defaultVector}
			/>
			<Typography variant={"h4"} className={classes.heading}>
				Student Login
			</Typography>

			<Typography variant={"subtitle1"}>
				Sign in with your @stuy.edu gmail account.
			</Typography>

			<GoogleLoginButton className={classes.googleButton} />
		</div>
	);
};
export default Student;
