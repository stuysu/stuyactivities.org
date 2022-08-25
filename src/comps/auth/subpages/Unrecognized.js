import React from "react";
import FallingInSpace from "../../../img/vectors/clip-in-the-space.svg";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import AuthContext from "../AuthContext";

const useStyles = makeStyles(theme => ({
	heading: {
		fontWeight: 600,
		color: `transparency.text`,
		margin: "1rem"
	},
	defaultVector: {
		maxWidth: "80vw",
		width: "400px",
		marginTop: theme.spacing(2)
	},
	retryLogin: {
		marginTop: "5%",
		textDecoration: "underline",
		cursor: "pointer"
	}
}));

const Unrecognized = () => {
	const classes = useStyles();

	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<img src={FallingInSpace} alt={"Astronaut falling in space"} className={classes.defaultVector} />
			<Typography variant={"h4"} className={classes.heading}>
				Ouch!
			</Typography>

			<Typography variant={"subtitle1"}>
				Your email {authContext.unrecognizedEmail && <b>{authContext.unrecognizedEmail}</b>} seems like it could
				belong to a stuy student or teacher, but you're not in our database. If you're an incoming freshman,
				your account will be added soon. If you feel this is a mistake, please send us an email at it@stuysu.org
				with your name, osis and grade (if applicable) or what department you teach.
			</Typography>

			<p className={classes.retryLogin} onClick={() => authContext.set({ page: "landing" })}>
				I want to try signing in again.
			</p>
		</div>
	);
};

export default Unrecognized;
