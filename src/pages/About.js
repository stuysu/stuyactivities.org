import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import Grid from "@material-ui/core/Grid";

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
	link: {
		textDecoration: "none",
		color: "blue"
	}
}));

const About = () => {
	const classes = useStyles();

	return (
		<div>
			<Helmet>
				<title>About | StuyActivities</title>

				<meta
					property="og:description"
					content={"About StuyActivities v2"}
				/>
			</Helmet>
			<div className={classes.layout}>
				<Typography variant={"h4"}>About</Typography>
				<br />
				<Typography paragraph>
					This website is made by the Student Union’s IT and Club Pub
					Departments to allow all students to have resources that
					would help them run their organizations, clubs and
					publications. The website hosts a new and improved charter
					system, which will allow the SU to better understand the
					activity’s purpose and allow students to full understand the
					activity, so they can consider if they are interested. The
					charter questions also create a page for the activity, which
					can be found on the catalog. The catalog allows students to
					use different filters to help them narrow down the wide
					range of activities present at Stuyvesant to the ones they
					are genuinely interested in. We have also integrated a room
					reservation system, calendars (overall, club specific and
					personalized to members) and member notification system to
					help leaders to organize meetings and keep all their members
					informed. This website is open source, so those interested
					in contributing may do so{" "}
					<a
						href="https://github.com/stuysu/stuyactivities.org"
						className={classes.link}
						target={"_blank"}
						rel={"noopener noreferrer"}
					>
						here (frontend)
					</a>{" "}
					and{" "}
					<a
						href="https://github.com/stuysu/api.stuyactivities.org"
						className={classes.link}
						target={"_blank"}
						rel={"noopener noreferrer"}
					>
						here (backend)
					</a>
					.
				</Typography>
				<Typography variant={"h6"}>
					This site wouldn't be possible without the help of:
				</Typography>
				<Grid item>
					<p>Julian Giordano, SU Vice President ‘19-’20</p>
				</Grid>
				<Grid item>
					<p>Abir Taheer, SU IT ‘19-’20</p>
				</Grid>
				<Grid item>
					<p>Victor Veytsman, SU IT ‘19-’20</p>
				</Grid>
				<Grid item>
					<p>Ethan Shan, SU IT ‘19-’20</p>
				</Grid>
				<Grid item>
					<p>Theo Kubovy-Weiss, SU Exec ‘19-’20</p>
				</Grid>
				<Grid item>
					<p>Neve Diaz-Carr, SU Exec ‘19-’20</p>
				</Grid>
				<Grid item>
					<p>Aaron Wang, SU Exec ‘19-’20</p>
				</Grid>
				<Grid item>
					<p>Shivali Korgaonkar, SU External ‘19-’20</p>
				</Grid>
			</div>
		</div>
	);
};

export default About;
