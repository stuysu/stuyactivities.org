import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeacherVector from "../../../img/vectors/clip-teacher.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GoogleLoginButton from "../GoogleLoginButton";
import FlexCenter from "../../ui/FlexCenter";
import CredentialsLogin from "../CredentialsLogin";

const useStyles = makeStyles(theme => ({
	credentialsButton: {
		// margin: theme.spacing(2)
	},
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
	contentContainer: {
		width: "700px",
		maxWidth: "90vw"
	},
	backButtonContainer: {
		textAlign: "left"
	}
}));

const Teacher = ({ setPage, setAuthToken }) => {
	const classes = useStyles();
	const [credentials, setCredentials] = React.useState(false);

	return (
		<FlexCenter>
			<div className={classes.contentContainer}>
				<div className={classes.backButtonContainer}>
					<Button
						color={"primary"}
						variant={"outlined"}
						onClick={() => setPage("landing")}
					>
						&lt;- I'm not a teacher
					</Button>
				</div>

				<img
					src={TeacherVector}
					alt={"Person walking through door"}
					className={classes.defaultVector}
				/>
				<Typography variant={"h4"} className={classes.heading}>
					Teacher Login
				</Typography>

				<Typography variant={"subtitle1"}>
					If this is your first time logging in, you might need to
					reset your password.
				</Typography>
				<Typography variant={"subtitle1"}>
					Click "I forgot my password" to do so.
				</Typography>

				<Typography variant={"subtitle1"}>
					Your email address is the one ending in @schools.nyc.gov
				</Typography>

				<Typography>
					If you've linked a Google account to your StuyActivities
					account in the past, you may use it to sign in as well.
				</Typography>

				<CredentialsLogin type={"teachers"} setPage={setPage} />

				<GoogleLoginButton
					className={classes.googleButton}
					setAuthToken={setAuthToken}
					setPage={setPage}
				/>
			</div>
		</FlexCenter>
	);
};
export default Teacher;
