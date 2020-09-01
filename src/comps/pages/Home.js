import React from "react";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UserContext from "../context/UserContext";
import { triggerLoginDialog } from "../auth/AuthDialog";
<<<<<<< HEAD
import clip from "./../../img/vectors/clip-dancer.svg"
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
	centerContainer: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		position: "absolute"
	},
	centerContainerSignedIn: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		position: "absolute",
		textAlign: "center"
	},
	link: {
		textDecoration: "none",
		color: "blue"
=======
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
>>>>>>> f11c31e7d59b8d4a13f3a04d7c855e3969bc97cc
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
<<<<<<< HEAD
			<Grid container>
				<Grid item xs={12} md={4}>
					<div className={classes.centerContainer}>
						<img src={clip} alt="home page vector"/>
					</div>
				</Grid>
				<Grid item xs={12} md={8}>
					{user.signedIn ? (
						<div className={classes.centerContainer}>
							<Typography variant={"h3"}>
=======
			<div className={classes.layout}>
				<main>
					{user.signedIn ? (
						<div>
							<Typography variant={"h1"}>
>>>>>>> f11c31e7d59b8d4a13f3a04d7c855e3969bc97cc
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
<<<<<<< HEAD
						<div className={classes.centerContainer}>
=======
						<div>
>>>>>>> f11c31e7d59b8d4a13f3a04d7c855e3969bc97cc
							<Typography variant={"h4"}>
								Welcome to StuyActivities v2!
							</Typography>
							<br />
							<Typography>
<<<<<<< HEAD
								This site was created to assist students and faculty
								with the process of browsing, joining, creating and
								managing clubs & publications ("Activities") at
								Stuyvesant High School. All activities must submit a new
								charter each year to continue operating. In order to
								start a new Activity or manage an Activity that you are
								a leader of, please login. If you want to learn more,
								you can visit our{" "}
								<a href="/about" className={classes.link}>
									about
								</a>{" "}
								and{" "}
								<a href="/rules" className={classes.link}>
									rules
								</a>{" "}
=======
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
>>>>>>> f11c31e7d59b8d4a13f3a04d7c855e3969bc97cc
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
<<<<<<< HEAD
				</Grid>
			</Grid>
=======
				</main>
			</div>
>>>>>>> f11c31e7d59b8d4a13f3a04d7c855e3969bc97cc
		</div>
	);
};

export default Home;
