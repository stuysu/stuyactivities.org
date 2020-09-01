import React from "react";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UserContext from "../context/UserContext";
import { triggerLoginDialog } from "../auth/AuthDialog";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	layout: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "80vh",
		paddingRight: "2rem",
		paddingLeft: "2rem",
		flexDirection: "column",
		maxWidth: "1200px",
		margin: "auto"
	},

	link: {
		textDecoration: "none",
		color: theme.palette.secondary.main
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
			<div className={classes.layout}>
				<main>
					{user.signedIn ? (
						<div>
							<Typography variant={"h1"}>
								Welcome back, {user.firstName}!
							</Typography>
							<Button
								variant="outlined"
								color="primary"
								className={classes.button}
								href="/catalog"
							>
								Browse Activities
							</Button>
						</div>
					) : (
						<div>
							<Typography variant={"h4"}>
								Welcome to StuyActivities v2!
							</Typography>
							<br />
							<Typography>
								This site was created to assist students and
								faculty with the process of browsing, joining,
								creating and managing clubs & publications
								("Activities") at Stuyvesant High School. All
								activities must submit a new charter each year
								to continue operating. In order to start a new
								Activity or manage an Activity that you are a
								leader of, please login. If you want to learn
								more, you can visit our{" "}
								<Link to={"/about"} className={classes.link}>
									about
								</Link>{" "}
								and{" "}
								<Link to="/rules" className={classes.link}>
									rules
								</Link>{" "}
								pages.
							</Typography>
							<Button
								variant="outlined"
								color="primary"
								className={classes.button}
								onClick={triggerLoginDialog}
							>
								Login
							</Button>
							<Button
								variant="outlined"
								color="primary"
								className={classes.button}
								href="/catalog"
							>
								Browse Activities
							</Button>
						</div>
					)}
				</main>
			</div>
		</div>
	);
};

export default Home;
