import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import BackButton from "../comps/ui/BackButton";

const useStyles = makeStyles(() => ({
	layout: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "80vh",
		padding: "2rem",
		flexDirection: "column",
		maxWidth: "1200px",
		margin: "auto"
	},

	title: {
		textAlign: "center",
		margin: "1rem"
	}
}));

const About = () => {
	const classes = useStyles();

	return (
		<div>
			<Helmet>
				<title>About | StuyActivities</title>
				<meta property="og:title" content="About | StuyActivities" />
				<meta
					property="og:description"
					content={
						"An app designed by the Stuyvesant Student Union to help students navigate the extracurricular organizations at Stuyvesant High School."
					}
				/>
			</Helmet>
			<div className={classes.layout}>
				<main>
					<BackButton to={"/"} label={"Back To Home"} />
					<Typography variant={"h4"} className={classes.title}>
						About
					</Typography>
					<br />
					<Typography paragraph>
						This website is made by the Student Union’s IT and Club Pub Departments to allow all students to
						have resources that would help them run their organizations, clubs and publications.
					</Typography>
					<Typography paragraph>
						The website hosts a new and improved charter system, which will allow the SU to better
						understand the activity’s purpose and allow students to full understand the activity, so they
						can consider if they are interested. The charter questions also create a page for the activity,
						which can be found on the catalog. The catalog allows students to use different filters to help
						them narrow down the wide range of activities present at Stuyvesant to the ones they are
						genuinely interested in.{" "}
					</Typography>
					<Typography paragraph>
						We also have a room reservation system, Google Calendar integration, member notification system
						to help leaders to organize meetings and keep all their members informed, a system for clubs to
						send updates to their members, a system to send out updates about policies to all club leaders,
						and an archive of all clubs created since 2020.
					</Typography>
					<Typography paragraph>
						The front-end is a{" "}
						<Link href={"https://reactjs.org"} target={"_blank"} underline="hover">
							React App
						</Link>{" "}
						bootstrapped with <code>create-react-app</code> and we use{" "}
						<Link target={"_blank"} underline="hover">
							Material UI
						</Link>{" "}
						for styling and theming. The backend is a NodeJS express server that serves an{" "}
						<Link href={"https://www.apollographql.com/"} target={"_blank"} underline="hover">
							Apollo GraphQL
						</Link>{" "}
						API. We'd also like to give a huge shout-out to{" "}
						<Link href={"https://icons8.com"} target={"_blank"} underline="hover">
							Icons8
						</Link>{" "}
						&#128150; for giving us access to their awesome vectors libraries for our work on
						StuyActivities.
					</Typography>
					<Typography paragraph>
						This website is open source and we welcome everyone to look through the code and submit issues /
						pull requests.
					</Typography>
					<Typography paragraph>
						Front-End:{" "}
						<Link href="https://github.com/stuysu/stuyactivities.org" target={"_blank"} underline="hover">
							https://github.com/stuysu/stuyactivities.org
						</Link>
						<br />
						Backend:{" "}
						<Link
							href="https://github.com/stuysu/api.stuyactivities.org"
							target={"_blank"}
							underline="hover"
						>
							https://github.com/stuysu/api.stuyactivities.org
						</Link>
					</Typography>
					<Typography variant={"h6"} style={{ textAlign: "center" }}>
						This site wouldn't be possible without the immense dedication from:
					</Typography>

					<Grid container style={{ textAlign: "center" }}>
						<Grid item xs={12} sm={6} md={6}>
							<h2>The StuyActivities 2.0 Team:</h2>
							<p>Julian Giordano, SU President ’20-’21</p>
							<p>Shivali Korgaonkar, SU Vice President ’20-’21</p>
							<p>Abir Taheer, SU IT ’20-’21</p>
							<p>Victor Veytsman, SU IT ’20-’21</p>
							<p>Ethan Shan, SU IT ’20-’21</p>
							<p>Theo Kubovy-Weiss, SU Exec ’20-’21</p>
							<p>Neve Diaz-Carr, SU Exec ’20-’21</p>
							<p>Aaron Wang, SU Exec ’20-’21</p>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<h2>The Original StuyActivities Team:</h2>
							<p>William Wang, SU President ’18-’19</p>
							<p>Vishwaa Sofat, SU Vice President ’18-’19</p>
							<p>Gilvir Gill, SU IT ’17-’18; Stuyvesant ’18</p>
							<p>Ivan Galakhov, SU IT ’18-’19</p>
							<p>Alwin Peng, SU IT ’18-’19</p>
							<p>Jesse Hall, SU IT ’18-’19</p>
							<p>Abir Taheer, SU IT ’18’19</p>
							<p>Elizabeth Avakov, SU Clubs & Pubs ’18-’19</p>
							<p>Gordon Ebanks, SU Clubs & Pubs ’18-’19</p>
							<p>Joshua Weiner, SU SLT ’18-’19</p>
						</Grid>
					</Grid>
				</main>
			</div>
		</div>
	);
};

export default About;
