import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StudentVector from "../../../img/vectors/clip-student-thinking-about-mathematics.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GoogleLoginButton from "../GoogleLoginButton";
import Center from "../../Center";

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
		maxHeight: "30vh",
		marginTop: theme.spacing(2)
	},
	contentContainer: {
		width: "700px",
		maxWidth: "90vw"
	},
	backButtonContainer: {
		textAlign: "left"
	},
	googleButton: {
		scale: 1.1,
		margin: theme.spacing(3)
	}
}));

const Student = ({ setPage }) => {
	const classes = useStyles();
	const [credentials, setCredentials] = React.useState(false);

	return (
		<Center>
			<div className={classes.contentContainer}>
				<div className={classes.backButtonContainer}>
					<Button
						color={"primary"}
						variant={"outlined"}
						onClick={() => setPage("landing")}
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
					It's recommended that you sign in with Google, but you may
					also sign in with a username and password if you wish.
				</Typography>

				<GoogleLoginButton className={classes.googleButton} />
				<br />
				<Button
					// variant={"outlined"}
					className={classes.credentialsButton}
					onClick={() => setCredentials(true)}
					color={"secondary"}
					variant={"outlined"}
				>
					Login With Credentials
				</Button>
				<br />
			</div>
		</Center>
	);
};
export default Student;
