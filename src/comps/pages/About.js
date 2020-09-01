import React from "react";
import { makeStyles } from "@material-ui/core/styles";
<<<<<<< HEAD
=======
import FlexCenter from "../ui/FlexCenter";
>>>>>>> cd5a04f204b9e444fc5f47b049d6796fcbf84e14
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
<<<<<<< HEAD
	centerContainer: {
		textAlign: "center",
		margin: "2rem"
	},
	ul: {
		listStyleType: "none",
		textAlign: "center",
		padding: "0"
	},
	li: {
		fontSize: "1.2rem",
		textAlign: "center"
=======
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
>>>>>>> cd5a04f204b9e444fc5f47b049d6796fcbf84e14
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
<<<<<<< HEAD
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
								<ul className={classes.ul}>
									<li className={classes.li}>Julian Giordano, SU Vice President ‘19-’20</li>
									<li className={classes.li}>Abir Taheer, SU IT ‘19-’20</li>
									<li className={classes.li}>Victor Veytsman, SU IT ‘19-’20</li>
									<li className={classes.li}>Ethan Shan, SU IT ‘19-’20</li>
									<li className={classes.li}>Theo Kubovy-Weiss, SU Exec ‘19-’20</li>
									<li className={classes.li}>Neve Diaz-Carr, SU Exec ‘19-’20</li>
									<li className={classes.li}>Aaron Wang, SU Exec ‘19-’20</li>
									<li className={classes.li}>Shivali Korgaonkar, SU External ‘19-’20</li>
								</ul>
							</Grid>
							<Grid item xs={12} md={6}>
								<ul className={classes.ul}>
									<li className={classes.li}>William Wang, SU President ’18-’19</li>
									<li className={classes.li}>Vishwaa Sofat, SU Vice President ’18-’19</li>
									<li className={classes.li}>Gilvir Gill, SU IT ’17-’18; Stuyvesant ’18</li>
									<li className={classes.li}>Ivan Galakhov, SU IT ’18-’19</li>
									<li className={classes.li}>Alwin Peng, SU IT ’18-’19</li>
									<li className={classes.li}>Jesse Hall, SU IT ’18-’19</li>
									<li className={classes.li}>Abir Taheer, SU IT ’18’19</li>
									<li className={classes.li}>Elizabeth Avakov, SU Clubs & Pubs ’18-’19</li>
									<li className={classes.li}>Gordon Ebanks, SU Clubs & Pubs ’18-’19</li>
									<li className={classes.li}>Joshua Weiner, SU SLT '18-'19</li>
								</ul>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Grid item xs={1} />
			</Grid>
=======
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
					informed.
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
>>>>>>> cd5a04f204b9e444fc5f47b049d6796fcbf84e14
		</div>
	);
};

export default About;
