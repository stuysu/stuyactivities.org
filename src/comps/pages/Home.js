import React from "react";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import userEvent from "@testing-library/user-event";
import UserContext from "../context/UserContext";
import {triggerLoginDialog} from "../auth/AuthDialog";

const useStyles  = makeStyles( () => ({
	centerContainer: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		position: "absolute"
	},
	link: {
		textDecoration: "none",
		color: "blue"
	},
	button: {
		marginTop: "1rem",
		marginRight: "1rem"
	}
}));

const Home = () => {
	const classes = useStyles();
	const user = React.useContext(UserContext);

	return (
		<div>
			<Helmet>
				<title>Home | StuyActivities</title>
			</Helmet>
			{user.signedIn ? (
				<Typography variant={"h1"}>Welcome Back!</Typography>
			) : (
				<div className={classes.centerContainer}>
					<Typography variant={"h4"}>Welcome to StuyActivities v2!</Typography>
					<br/>
					<Typography>This site was created to assist students and faculty with the process of browsing, joining, creating and managing clubs & publications ("Activities") at Stuyvesant High School. All activities must submit a new charter each year to continue operating. In order to start a new Activity or manage an Activity that you are a leader of, please login. If you want to learn more, you can visit our <a href="/about" className={classes.link}>about</a> and <a href="/rules" className={classes.link}>rules</a> pages.</Typography>
					<Button variant="outlined" color="primary" className={classes.button} onClick={triggerLoginDialog}>Login</Button>
					<Button variant="outlined" color="primary" className={classes.button} href="/catalog">Browse Activities</Button>
				</div>
			)}

		</div>
	);
};

export default Home;
