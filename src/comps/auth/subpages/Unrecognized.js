import React from "react";
import FallingInSpace from "../../../img/vectors/clip-in-the-space.svg";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import AuthContext from "../AuthContext";

const useStyles = makeStyles(theme => ({
	heading: {
		fontWeight: 600,
		color: `rgba(0, 0, 0, 0.8)`,
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
			<img src={FallingInSpace} alt={"Astronaut falling in space"} className={classes.defaultVector}/>
			<Typography variant={"h4"} className={classes.heading}>
				Ouch!
			</Typography>

			<Typography variant={"subtitle1"}>
				Your email {authContext.unrecognizedEmail && <b>{authContext.unrecognizedEmail}</b>} seems like it could
				belong to a stuy student or teacher, but you're not in the database. If you feel this is a mistake,
				please send us an email at it@stuysu.org with your name, osis and grade (if applicable) or what
				department you teach.
			</Typography>

			<p className={classes.retryLogin} onClick={() => authContext.set({page: "landing"})}>
				I want to try signing in again.
			</p>
		</div>
	);
};

export default Unrecognized;
