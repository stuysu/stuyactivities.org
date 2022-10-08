import React from "react";
import FallingInSpace from "../../../img/vectors/clip-in-the-space.svg";
import Typography from "@mui/material/Typography";
import AuthContext from "../AuthContext";
import Box from "@mui/material/Box";

const classes = {
	heading: {
		fontWeight: 600,
		color: `transparency.text`,
		margin: "1rem"
	},
	defaultVector: {
		maxWidth: "80vw",
		width: "400px",
		marginTop: 2
	},
	retryLogin: {
		marginTop: "5%",
		textDecoration: "underline",
		cursor: "pointer"
	}
};

const Unrecognized = () => {
	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<Box component="img" src={FallingInSpace} alt={"Astronaut falling in space"} sx={classes.defaultVector} />
			<Typography variant={"h4"} sx={classes.heading}>
				Ouch!
			</Typography>

			<Typography variant={"subtitle1"}>
				Your email {authContext.unrecognizedEmail && <b>{authContext.unrecognizedEmail}</b>} seems like it could
				belong to a stuy student or teacher, but you're not in our database. If you're an incoming freshman,
				your account will be added soon. If you feel this is a mistake, please send us an email at it@stuysu.org
				with your name, osis and grade (if applicable) or what department you teach.
			</Typography>

			<Box component="p" sx={classes.retryLogin} onClick={() => authContext.set({ page: "landing" })}>
				I want to try signing in again.
			</Box>
		</div>
	);
};

export default Unrecognized;
