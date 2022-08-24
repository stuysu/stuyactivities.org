import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import BackButton from "../comps/ui/BackButton";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Link } from "@mui/material/";
import PropTypes from "prop-types";
import UserContext from "../comps/context/UserContext";
import SignInRequired from "../comps/ui/SignInRequired";

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
	const user = React.useContext(UserContext);

	const handleChange = (event, newTab) => {
		setTab(newTab);
	};

	if (!user.signedIn) {
		return <SignInRequired />;
	}

	return (
		<div>
			<Helmet>
				<title>Club Pub Fair | StuyActivities</title>
				<meta property="og:title" content="Club Pub Fair 2020 | StuyActivities" />
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
						The Fair took place virtually over the course of 7 days (from 4-6 pm afterschool from Tue., Sep.
						29th through Wed., Oct. 7th) and featured nearly 150 activities! (Participating activities are
						listed{" "}
						<Link
							href="https://docs.google.com/document/d/1xFF6hU_BI_4yJ1o7_S508TqDFxtxD1DSyxumPvsyk9k/edit?usp=sharing"
							color={"secondary"}
							underline="hover"
						>
							here
						</Link>
						).
					</Typography>
					<Typography paragraph>
						A different category of ~20 activities with a similar theme (i.e. STEM, sports, arts, culture,
						academics, etc.) participated in each day of the fair. You can use the tabs below to navigate
						between the days and watch the video recordings of the 1-2 minute presentations given by each
						club's leader(s). To learn more about a club, search it up in the Catalog. If you have any
						questions or concerns, please reach out to us at events@stuysu.org. Enjoy the fair!
					</Typography>
					<Paper square>
						<Tabs
							value={tab}
							indicatorColor="primary"
							textColor="primary"
							onChange={handleChange}
							variant="scrollable"
							scrollButtons="auto"
						>
							<Tab label="Day 1: 09/29" {...a11yProps(0)} />
							<Tab label="Day 2: 09/30" {...a11yProps(1)} />
							<Tab label="Day 3: 10/01" {...a11yProps(2)} />
							<Tab label="Day 4: 10/02" {...a11yProps(3)} />
							<Tab label="Day 5: 10/05" {...a11yProps(4)} />
							<Tab label="Day 6: 10/06" {...a11yProps(5)} />
							<Tab label="Day 7: 10/07" {...a11yProps(6)} />
						</Tabs>
						<TabPanel value={tab} index={0}>
							<iframe
								title={"Day 1"}
								style={{ width: "100%", height: "40vh" }}
								src="https://www.youtube.com/embed/jUzq1VHeVLE"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</TabPanel>
						<TabPanel value={tab} index={1}>
							<iframe
								title={"Day 2"}
								style={{ width: "100%", height: "40vh" }}
								src="https://www.youtube.com/embed/FMDR5Ga1Q40"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</TabPanel>
						<TabPanel value={tab} index={2}>
							<iframe
								title={"Day 3"}
								style={{ width: "100%", height: "40vh" }}
								src="https://www.youtube.com/embed/XSzax-rLHAU"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</TabPanel>
						<TabPanel value={tab} index={3}>
							<iframe
								title={"Day 4"}
								style={{ width: "100%", height: "40vh" }}
								src="https://www.youtube.com/embed/WoKEVH7Ozyw"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</TabPanel>
						<TabPanel value={tab} index={4}>
							<iframe
								title={"Day 5"}
								style={{ width: "100%", height: "40vh" }}
								src="https://www.youtube.com/embed/1VkfT5H2JDE"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</TabPanel>
						<TabPanel value={tab} index={5}>
							<iframe
								title={"Day 6"}
								style={{ width: "100%", height: "40vh" }}
								src="https://www.youtube.com/embed/DgRzN-9vDro"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</TabPanel>
						<TabPanel value={tab} index={6}>
							<iframe
								title={"Day 7"}
								style={{ width: "100%", height: "40vh" }}
								src="https://www.youtube.com/embed/_QWF0FWo798"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</TabPanel>
					</Paper>
				</main>
			</div>
		</div>
	);
};

export default ClubPubFair;
