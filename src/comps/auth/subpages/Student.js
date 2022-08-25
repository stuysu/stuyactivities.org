import React from "react";
import StudentVector from "../../../img/vectors/clip-student-thinking-about-mathematics.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleLoginButton from "../GoogleLoginButton";
import AuthContext from "../AuthContext";
import Box from "@mui/material/Box";

const classes = {
	heading: {
		fontWeight: 600,
		color: 'transparency.text',
		margin: "1rem"
	},
	defaultVector: {
		maxWidth: "80vw",
		width: "300px",
		maxHeight: "25vh",
		marginTop: 2
	},
	backButtonContainer: {
		textAlign: "left"
	}
};

const Student = () => {
	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<Box sx={classes.backButtonContainer}>
				<Button color={"primary"} variant={"outlined"} onClick={() => authContext.set({ page: "landing" })}>
					&lt;- I'm not a student
				</Button>
			</Box>

			<Box component="img" src={StudentVector} alt={"Person walking through door"} sx={classes.defaultVector} />
			<Typography variant={"h4"} sx={classes.heading}>
				Student Sign In
			</Typography>

			<Typography variant={"subtitle1"}>Sign in with your @stuy.edu gmail account.</Typography>

			<GoogleLoginButton />
		</div>
	);
};
export default Student;
