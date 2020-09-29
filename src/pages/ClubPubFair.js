import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import BackButton from "../comps/ui/BackButton";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`
	};
}

// function ClubCard() {
// 	Papa.parse("../../comps/pages/clubPubFair/Day 1.csv", {
// 		step: function (row) {
// 			return (
// 				<div>
// 					<ListItem style={{ padding: "1rem" }}>
// 						<div>
// 							<Typography style={{ paddingBottom: "3px" }}>{row[0]}</Typography>
// 							<Typography style={{ paddingBottom: "3px" }}>Meeting code: {row[4]}</Typography>
// 							<Typography style={{ paddingBottom: "3px" }}>Passcode: {row[5]}</Typography>
// 							<Link href={row[6]} style={{ paddingBottom: "3px" }} color={"secondary"}>
// 								Meeting Link: {row[6]}
// 							</Link>
// 						</div>
// 					</ListItem>
//
// 					<Divider />
// 				</div>
// 			);
// 		},
// 		complete: function (results) {
// 			console.log(results);
// 		}
// 	});
// 	return <div>Hello</div>;
// }

const useStyles = makeStyles(() => ({
	layout: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "80vh",
		padding: "2rem",
		flexDirection: "column",
		maxWidth: "1200px",
		margin: "auto",
		width: "100%"
	},

	title: {
		textAlign: "center",
		margin: "1rem"
	}
}));

const ClubPubFair = () => {
	const classes = useStyles();
	const [tab, setTab] = React.useState(0);

	const handleChange = (event, newTab) => {
		setTab(newTab);
	};

	return (
		<div>
			<Helmet>
				<title>Club Pub Fair | StuyActivities</title>
				<meta property="og:title" content="Club Pub Fair | StuyActivities" />
				<meta
					property="og:description"
					content={"A page designed to help students through the Club Pub Fair."}
				/>
			</Helmet>
			<div className={classes.layout}>
				<main style={{ width: "100%" }}>
					<BackButton to={"/"} label={"Back To Home"} />
					<Typography variant={"h4"} className={classes.title}>
						Virtual Clubs & Pubs Fair 2020
					</Typography>
					<br />
					<Typography paragraph>
						Welcome to the 2020 Virtual Clubs & Pubs Fair! The Student Union is excited to present this
						amazing opportunity for students of all grades to learn about the many activities Stuy has to
						offer.
					</Typography>
					<Typography paragraph>
						The Fair will be taking place virtually over the course of 7 days (from 4-6 pm afterschool from
						Tue., Sep. 29th through Wed., Oct. 7th) and will feature nearly 150 activities!
					</Typography>
					<Typography paragraph>
						A different category of ~20 activities with a similar theme (i.e. STEM, sports, arts, culture,
						academics, etc.) will participate in each day of the fair. Each day will be split into two
						parts: club presentations and club “breakout” rooms. In the Zoom Webinar, you will be able to
						hear featured club leaders present some information about their club. We encourage you to take
						note of the clubs that interest you because, after the webinar, you will have the chance to
						attend personal Zoom meetings hosted by each club you heard from today. The links to these club
						meetings are found below, and they are organized based on when each club presents. If you have
						any questions or concerns, please reach out to us at events@stuysu.org. Enjoy the fair!
					</Typography>
					<Typography paragraph>
						Webinar Link:{" "}
						<Link
							href={"https://us02web.zoom.us/webinar/register/WN_KbyoPHqIT8GlurIiKGALPQ"}
							target={"_blank"}
							rel={"noopener noreferrer"}
						>
							Webinar Link
						</Link>
					</Typography>
					<Typography paragraph>**NOTE: You must register with your stuy.edu email.</Typography>
					<Paper square>
						<Tabs
							value={tab}
							indicatorColor="primary"
							textColor="primary"
							onChange={handleChange}
							variant="scrollable"
							scrollButtons="auto"
						>
							<Tab label="Day 1 Tue., Sep. 29" {...a11yProps(0)} />
							<Tab label="Day 2 Wed., Sep. 30" {...a11yProps(1)} />
							<Tab label="Day 3 Thu., Oct. 1" {...a11yProps(2)} />
							<Tab label="Day 4 Fri., Oct. 2" {...a11yProps(3)} />
							<Tab label="Day 5 Mon., Oct. 5" {...a11yProps(4)} />
							<Tab label="Day 6 Tues, Oct. 6" {...a11yProps(5)} />
							<Tab label="Day 7 Wed., Oct. 7" {...a11yProps(6)} />
						</Tabs>
						<TabPanel value={tab} index={0}>
							Coming soon!
						</TabPanel>
						<TabPanel value={tab} index={1}>
							Coming soon!
						</TabPanel>
						<TabPanel value={tab} index={2}>
							Coming soon!
						</TabPanel>
						<TabPanel value={tab} index={3}>
							Coming soon!
						</TabPanel>
						<TabPanel value={tab} index={4}>
							Coming soon!
						</TabPanel>
						<TabPanel value={tab} index={5}>
							Coming soon!
						</TabPanel>
						<TabPanel value={tab} index={6}>
							Coming soon!
						</TabPanel>
					</Paper>
				</main>
			</div>
		</div>
	);
};

export default ClubPubFair;
