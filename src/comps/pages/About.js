import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlexCenter from "../ui/FlexCenter";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
	centerContainer: {
		textAlign: "center",
		margin: "2rem"
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
			<Grid container>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<div className={classes.centerContainer}>
						<Typography variant={"h4"}>About</Typography>
						<br />
						<Typography variant={"h6"}>
							This website is made by the Student Union’s IT and
							Club Pub Departments to allow all students to have
							resources that would help them run their
							organizations, clubs and publications. The website
							hosts a new and improved charter system, which will
							allow the SU to better understand the activity’s
							purpose and allow students to full understand the
							activity, so they can consider if they are
							interested. The charter questions also create a page
							for the activity, which can be found on the catalog.
							The catalog allows students to use different filters
							to help them narrow down the wide range of
							activities present at Stuyvesant to the ones they
							are genuinely interested in. We have also integrated
							a room reservation system, calendars (overall, club
							specific and personalized to members) and member
							notification system to help leaders to organize
							meetings and keep all their members informed.
						</Typography>
						<br/>
						<Typography variant={"h6"}>This site wouldn't be possible without the help of:</Typography>
						<Grid container>
							<Grid item xs={12} md={6}>
								<ul>
									<li></li>
								</ul>
							</Grid>
							<Grid item xs={12} md={6}></Grid>
						</Grid>
					</div>
				</Grid>
				<Grid item xs={1} />
			</Grid>
		</div>
	);
};

export default About;
