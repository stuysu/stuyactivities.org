import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import BackButton from "../comps/ui/BackButton";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, Divider, ListItem } from "@material-ui/core";
import Box from "@material-ui/core/Box";
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
	const dateOffset = Math.ceil((new Date() - new Date("2020-10-05T20:00:00")) / (1000 * 60 * 60 * 24));
	const [tab, setTab] = React.useState(4 + (dateOffset < 3 ? dateOffset : 3));
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
					<Typography>
						Meeting Link:{" "}
						<Link
							href={"https://us02web.zoom.us/webinar/register/WN_KbyoPHqIT8GlurIiKGALPQ"}
							style={{ paddingBottom: "3px" }}
							color={"primary"}
						>
							<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
								https://us02web.zoom.us/webinar/register/WN_KbyoPHqIT8GlurIiKGALPQ
							</Box>
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
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link
											href={"https://stuyactivities.org/stuy-supports-senior-citizens"}
											color={"secondary"}
										>
											Stuy Supports Senior Citizens (SSSC)
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 978 0750 3697
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: sssc</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/97807503697?pwd=cEIxb2g1VGw0VjZqYWYzOFI0YzlKQT099"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/97807503697?pwd=cEIxb2g1VGw0VjZqYWYzOFI0YzlKQT099
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuysmile"} color={"secondary"}>
											Stuy Smile
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 848 3225 0012
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuysmile</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84832250012?pwd=REZBNjdvaDJYYVFrS0NlZHd2cG9aQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84832250012?pwd=REZBNjdvaDJYYVFrS0NlZHd2cG9aQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/thirstproject"} color={"secondary"}>
											Stuyvesant Thirst Project
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 987 9523 5352
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: water</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/98795235352?pwd=V3dKV1BLZ0FuRHpyb05QYitvMmRhUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/98795235352?pwd=V3dKV1BLZ0FuRHpyb05QYitvMmRhUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/SSS"} color={"secondary"}>
											Stuyvesant Study Society
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 792 828 1303</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: sss</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/7928281303?pwd=R1ZhUS9hb3F6MXZaU2o0bzh2ZWFwUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/7928281303?pwd=R1ZhUS9hb3F6MXZaU2o0bzh2ZWFwUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuygallop"} color={"secondary"}>
											StuyGallop
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 978 0322 9873
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuygallop</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/97803229873?pwd=ZndyZUV5OG1Fdm5kTmF3c1NXYnE3QT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/97803229873?pwd=ZndyZUV5OG1Fdm5kTmF3c1NXYnE3QT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/SEC"} color={"secondary"}>
											Stuyvesant Environmental Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 850 1205 3604
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyenviro</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/85012053604?pwd=SG14SlJmbjcxdTNETU0xbEpIbUNqdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/85012053604?pwd=SG14SlJmbjcxdTNETU0xbEpIbUNqdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/whiskeybravo"} color={"secondary"}>
											Whiskey Bravo
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 936 5454 4547
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: WB!</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/93654544547?pwd=SnlqeEw3QUFsTDhQU3BielliZStGQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/93654544547?pwd=SnlqeEw3QUFsTDhQU3BielliZStGQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/redcross"} color={"secondary"}>
											Stuyvesant Red Cross
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 925 3692 4346
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyrc</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92536924346?pwd=UGdINkxoZmlFNkUzdytaTUZsTGJlUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92536924346?pwd=UGdINkxoZmlFNkUzdytaTUZsTGJlUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyusacf"} color={"secondary"}>
											Stuy USACF
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 999 1353 9210
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: usacf</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99913539210?pwd=MjhhaUlpVjFCK1lNelhueS9YOWtwdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99913539210?pwd=MjhhaUlpVjFCK1lNelhueS9YOWtwdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuykc"} color={"secondary"}>
											Stuyvesant Key Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 582 565 0682</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuykc</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/5825650682?pwd=U05QVlU2R1ovWFR5c0V2bHVLMHNRQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/5825650682?pwd=U05QVlU2R1ovWFR5c0V2bHVLMHNRQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/homelesscoalition"} color={"secondary"}>
											Stuy Homeless Coalition
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 986 2555 9039
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 7YFgxn</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/98625559039?pwd=WU9XZWxYZk0wR0lPKzlVR0xrUi9Jdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/98625559039?pwd=WU9XZWxYZk0wR0lPKzlVR0xrUi9Jdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/sscc"} color={"secondary"}>
											Stuyvesant Save the Children (SSCC)
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 868 7883 0634
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: sscc</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/86878830634?pwd=MU9KcjNQLzBmanBLcXh1RUh6Y0cwdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/86878830634?pwd=MU9KcjNQLzBmanBLcXh1RUh6Y0cwdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuygivology"} color={"secondary"}>
											StuyGivology
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 981 1829 7106
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuygiv</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/98118297106?pwd=NlhQSnljWXF6R1FFWTlibEYzUUxwUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/98118297106?pwd=NlhQSnljWXF6R1FFWTlibEYzUUxwUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/animalrightsclub"} color={"secondary"}>
											Students for Animal Rights Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 959 2082 4650
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: animals</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/95920824650?pwd=and0MjlGN2xGM3J4SmNtZFpOOTRKQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/95920824650?pwd=and0MjlGN2xGM3J4SmNtZFpOOTRKQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/4H"} color={"secondary"}>
											4-H
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 728 799 6511</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 287419</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												" https://us02web.zoom.us/j/7287996511?pwd=QkZ6WTk4b3h3N3FrVFB6UlpCUEVrQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												{" "}
												https://us02web.zoom.us/j/7287996511?pwd=QkZ6WTk4b3h3N3FrVFB6UlpCUEVrQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyunhcr"} color={"secondary"}>
											StuyUNHCR
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 822 1508 5650
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 6cKJct</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/82215085650?pwd=RlpVZXdyVGdHVWhsdldKb2pKWlZSUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/82215085650?pwd=RlpVZXdyVGdHVWhsdldKb2pKWlZSUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyfixit"} color={"secondary"}>
											stuyFixit
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 869 7349 3202
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyfixit</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/86973493202?pwd=cEhPcmdJNGo0MUdITkpnZE42S2h2dz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/86973493202?pwd=cEhPcmdJNGo0MUdITkpnZE42S2h2dz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/sadd"} color={"secondary"}>
											Students Against Destructive Decisions (SADD)
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 647 640 8745</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 1PCucQ</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/6476408745?pwd=TVE4dDR6eGF6UzFmaFA3SGNvbmtWdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/6476408745?pwd=TVE4dDR6eGF6UzFmaFA3SGNvbmtWdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/envirothon"} color={"secondary"}>
											Stuyvesant Envirothon Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 933 5987 0080
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: envirothon</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/93359870080?pwd=NXNnWDFKNU45eUdIeFZOMjRsWGs5dz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/93359870080?pwd=NXNnWDFKNU45eUdIeFZOMjRsWGs5dz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link
											href={"https://stuyactivities.org/stuywellnesscouncil"}
											color={"secondary"}
										>
											Stuyvesant Wellness Council
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 964 9232 8773
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: wellness</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96492328773?pwd=eWpnNHpNckdkNnRKYzJUQStldzNtdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96492328773?pwd=eWpnNHpNckdkNnRKYzJUQStldzNtdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyforbiden"} color={"secondary"}>
											Stuyvesant Students for Biden
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 884 0342 1216
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: s4biden</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/88403421216?pwd=dXJWS01OT3BVTnlodE82VnNOUlZqZz09  "
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/88403421216?pwd=dXJWS01OT3BVTnlodE82VnNOUlZqZz09{" "}
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyremotebuddies"} color={"secondary"}>
											Remote Buddies
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 919 4229 3694
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 2MiqTx</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={" https://zoom.us/j/91942293694?pwd=R1NiNGpiOWRXMGZkSjZyaUwzTHhtUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												{" "}
												https://zoom.us/j/91942293694?pwd=R1NiNGpiOWRXMGZkSjZyaUwzTHhtUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
						</TabPanel>
						<TabPanel value={tab} index={5}>
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyspec"} color={"secondary"}>
											Stuyvesant Spectator
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 977 2880 8375
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: StuySpec</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/97728808375?pwd=YkJ5RTBUd1B0SmVSTFFsODZUUG0wUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/97728808375?pwd=YkJ5RTBUd1B0SmVSTFFsODZUUG0wUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/gamedevs"} color={"secondary"}>
											Stuyvesant Game Devs
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 884 7151 2495
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: gamedev</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/88471512495?pwd=UHRQZGdKYlNYQzdWTUlod1h0cExaUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/88471512495?pwd=UHRQZGdKYlNYQzdWTUlod1h0cExaUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/BGC"} color={"secondary"}>
											Board Games Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 891 1820 8366
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: BGC</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/89118208366?pwd=U2xqYVEvcC9lS0Z0VVFWMFdPYUR4dz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/89118208366?pwd=U2xqYVEvcC9lS0Z0VVFWMFdPYUR4dz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/spokenword"} color={"secondary"}>
											Stuyvesant Spoken Word Team
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 792 2651 0640
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: SpokenWord</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us04web.zoom.us/j/79226510640?pwd=SnRQazFLb1dMcWdWZVFXMU05VE5kZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us04web.zoom.us/j/79226510640?pwd=SnRQazFLb1dMcWdWZVFXMU05VE5kZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuynovelly"} color={"secondary"}>
											Stuy Novelly
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 991 3044 5596
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: novelly</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99130445596?pwd=ajdFeGhqT2cvVmZQWVBtVzZwS2ZMQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99130445596?pwd=ajdFeGhqT2cvVmZQWVBtVzZwS2ZMQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/TheEthicsForum"} color={"secondary"}>
											The Ethics Forum
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 943 4248 7245
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 2NzEy0</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/94342487245?pwd=TGRRL2pjbFYxKzUyQVczMGhEbEpwdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/94342487245?pwd=TGRRL2pjbFYxKzUyQVczMGhEbEpwdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuybookclub"} color={"secondary"}>
											Stuyvesant Book Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 876 3702 8098
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: bookclub</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87637028098?pwd=OXRIZ3RtbHUzZVVFYmd5MmxHeWw3UT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87637028098?pwd=OXRIZ3RtbHUzZVVFYmd5MmxHeWw3UT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuymun"} color={"secondary"}>
											Stuyvesant Model United Nations
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 950 1763 1651
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 7XPwDx</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/95017631651?pwd=Z1ovcE9wUk5sdjdvSWRrN1p4TGRvZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/95017631651?pwd=Z1ovcE9wUk5sdjdvSWRrN1p4TGRvZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/speechanddebate"} color={"secondary"}>
											Speech and Debate
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 634 085 4935</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: snd</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/6340854935?pwd=S3QxaExsbTcwRmZnVHFlUXRreXYvdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/6340854935?pwd=S3QxaExsbTcwRmZnVHFlUXRreXYvdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/photography"} color={"secondary"}>
											Digital Photography Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 816 7161 1375
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 5WA6g8</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/81671611375?pwd=WjdTOXVxem4vL3RFbkF1TnJOODRidz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/81671611375?pwd=WjdTOXVxem4vL3RFbkF1TnJOODRidz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/rubikscubeclub"} color={"secondary"}>
											Stuyvesant Rubik's Cube Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 952 8326 1728
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: cubingftw</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/95283261728?pwd=TGREbUhZTjU5Zm1zWmZEV1ZzRkFRUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/95283261728?pwd=TGREbUhZTjU5Zm1zWmZEV1ZzRkFRUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuydnd"} color={"secondary"}>
											StuyD&D
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 867 6389 0350
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuydnd</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/86763890350?pwd=MzB1UzlKRDRHV3hoMkphQ3JENW9lQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/86763890350?pwd=MzB1UzlKRDRHV3hoMkphQ3JENW9lQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/tcgclub"} color={"secondary"}>
											Stuyvesant Trading Card Games Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 925 5938 9735
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: StuyTCG</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92559389735?pwd=bndnVGQydmZDTEt6SzF0NGVoOUlJUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92559389735?pwd=bndnVGQydmZDTEt6SzF0NGVoOUlJUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/plantclub"} color={"secondary"}>
											Plant Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 838 3067 0841
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: plantclub</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83830670841?pwd=OCtIbGM3L1V1VStwTWhjNU1rbzlDZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83830670841?pwd=OCtIbGM3L1V1VStwTWhjNU1rbzlDZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/CIC"} color={"secondary"}>
											Computer Interaction Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 998 4655 8549
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuycic</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99846558549?pwd=SzNwRmg5WnQ4ZGY4Wkgrajl3RFBtQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99846558549?pwd=SzNwRmg5WnQ4ZGY4Wkgrajl3RFBtQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuypenpals"} color={"secondary"}>
											Stuy Pen Pals
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 879 5501 2661
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: penpals</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87955012661?pwd=cFV2SEFscnB4QmtqTWJBYW56eHluQT09 "
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87955012661?pwd=cFV2SEFscnB4QmtqTWJBYW56eHluQT09{" "}
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuycomics"} color={"secondary"}>
											Stuy Comics
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 886 0404 8366
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: comix127</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/88604048366?pwd=Q09JZVYrYXY4MG9EUjhaSmJHV09qUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/88604048366?pwd=Q09JZVYrYXY4MG9EUjhaSmJHV09qUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/StuyGunpla"} color={"secondary"}>
											Stuy Gunpla Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 944 8881 3593
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: SGC11214</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/94488813593?pwd=SE04WXlwMEEyUVZkK1J6MlJRWHlOUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/94488813593?pwd=SE04WXlwMEEyUVZkK1J6MlJRWHlOUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link
											href={"https://stuyactivities.org/stuyanimalassociation"}
											color={"secondary"}
										>
											Stuyvesant Animal Association
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 943 8149 0218
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 4cX7ZE</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/94381490218?pwd=STRVOHNmVE5WVVdHMUd2RzJBaWRvUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/94381490218?pwd=STRVOHNmVE5WVVdHMUd2RzJBaWRvUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyvesantgirlup"} color={"secondary"}>
											Stuyvesant Girl Up
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 972 0280 5233
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: girlup</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/97202805233?pwd=ckF4YXBCdFFCS3MrSTk0SklKamZlUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/97202805233?pwd=ckF4YXBCdFFCS3MrSTk0SklKamZlUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuytvclub"} color={"secondary"}>
											Stuyvesant Television Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 929 4232 1378
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: tvshow</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92942321378?pwd=NE9LbDNQYXd0WVc2T3NRaUtHUHE0UT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92942321378?pwd=NE9LbDNQYXd0WVc2T3NRaUtHUHE0UT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stua"} color={"secondary"}>
											Stuyvesant Transit & Urbanism Association
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 929 0296 3949
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 8JF36w</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92902963949?pwd=QUpKOVRhS2ptQ0pueEJXNVpYVVIxQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92902963949?pwd=QUpKOVRhS2ptQ0pueEJXNVpYVVIxQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link
											href={"https://stuyactivities.org/womenagainstpatriarchy"}
											color={"secondary"}
										>
											Women Against Patriarchy
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 968 5349 7777
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: womenap</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96853497777?pwd=QnJIYU4xRnBJVjRrSGtiQWIxcHVMUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96853497777?pwd=QnJIYU4xRnBJVjRrSGtiQWIxcHVMUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
						</TabPanel>
						<TabPanel value={tab} index={6}>
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/artclub"} color={"secondary"}>
											Art Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 823 9092 1959
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: artclub</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/82390921959?pwd=R0JxQUR2bmxLbUZjYWZUT3oxSjdTUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/82390921959?pwd=R0JxQUR2bmxLbUZjYWZUT3oxSjdTUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link
											href={"https://stuyactivities.org/scrapbookingandcollaging"}
											color={"secondary"}
										>
											Stuy Scrapbooking and Collaging
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 885 4683 3496
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: c0114g3</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/88546833496?pwd=a0lpYyt1Z2tBcWVaRElvL1lNR3pxQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/88546833496?pwd=a0lpYyt1Z2tBcWVaRElvL1lNR3pxQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link
											href={"https://stuyactivities.org/StuyvesantClayCharmsClub"}
											color={"secondary"}
										>
											Stuyvesant Clay Charms Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 215 456 3573</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: charms</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/2154563573?pwd=NEZkYitJYUplZjdjQkRXZklaTjArZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/2154563573?pwd=NEZkYitJYUplZjdjQkRXZklaTjArZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuypapercrafts"} color={"secondary"}>
											Stuyvesant Papercrafts
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 875 5183 7156
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: crafty</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87551837156?pwd=WXNxcE42QVh0LzU4Y0tCWHBZdVhvZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87551837156?pwd=WXNxcE42QVh0LzU4Y0tCWHBZdVhvZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuysketch"} color={"secondary"}>
											Stuy Sketch
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 975 3432 3756
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: StuySketch</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/97534323756?pwd=RS9ielo3YWw5cVhuMUhzSDcwYnJDZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/97534323756?pwd=RS9ielo3YWw5cVhuMUhzSDcwYnJDZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/cartoonclub"} color={"secondary"}>
											Cartoon Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 965 8650 1247
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: q2bV4K</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96586501247?pwd=VG02KzFhSnR4TS96T1VVRXU1RnNwQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96586501247?pwd=VG02KzFhSnR4TS96T1VVRXU1RnNwQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/caliperlitmag"} color={"secondary"}>
											Caliper Literary Magazine
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 970 5856 5540
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: Caliper</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/97058565540?pwd=cTNXU3grYjF2dmtNSkFOMkxjaSt4Zz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/97058565540?pwd=cTNXU3grYjF2dmtNSkFOMkxjaSt4Zz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link
											href={"https://stuyactivities.org/stuyvesantindicator"}
											color={"secondary"}
										>
											The Stuyvesant Indicator
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 847 7787 6228
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: yearbook21</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84777876228?pwd=eWR1Tk4waGhyTmRTZE1QREZJb290dz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84777876228?pwd=eWR1Tk4waGhyTmRTZE1QREZJb290dz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyviridian"} color={"secondary"}>
											StuyViridian
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 871 5113 8407
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: art642</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87151138407?pwd=SmtlMi8vQU55WUpRazJQS3NoTUpqUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87151138407?pwd=SmtlMi8vQU55WUpRazJQS3NoTUpqUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/artasia"} color={"secondary"}>
											Artasia
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 255 167 6916</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 453802</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us04web.zoom.us/j/2551676916?pwd=endLZVJBS3VOVDNISGVoQ1VnbFB6Zz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us04web.zoom.us/j/2551676916?pwd=endLZVJBS3VOVDNISGVoQ1VnbFB6Zz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/renaissancewomen"} color={"secondary"}>
											Renaissance Women
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 873 1989 0252
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: ladylovart</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87319890252?pwd=aHd6YTh6VStQZmwra1hIeGU4cVB4QT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87319890252?pwd=aHd6YTh6VStQZmwra1hIeGU4cVB4QT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuywebtoons"} color={"secondary"}>
											Stuy Webtoons
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 994 3333 7102
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: webtoons</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99433337102?pwd=bU5GVmg0cGJYeE45Zm5vZUZwR2JpZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99433337102?pwd=bU5GVmg0cGJYeE45Zm5vZUZwR2JpZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuydesign"} color={"secondary"}>
											StuyDesign
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 876 8714 8738{" "}
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 3pPCvU</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87687148738?pwd=RTRjQmNoSlFUcTV2cGdlMVgydHp3UT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87687148738?pwd=RTRjQmNoSlFUcTV2cGdlMVgydHp3UT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/antares"} color={"secondary"}>
											Antares
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 869 1828 9158
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: ANTARES</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/86918289158?pwd=U1V5N0p4bFZObXhUMTBoRG1HR3Nidz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/86918289158?pwd=U1V5N0p4bFZObXhUMTBoRG1HR3Nidz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link
											href={"https://stuyactivities.org/projectkaleidoscope"}
											color={"secondary"}
										>
											Project Kaleidoscope
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 816 9720 8784
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: :))</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/81697208784?pwd=ajZsZytSQ3NWcUwwaTZXNUhZVEtndz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/81697208784?pwd=ajZsZytSQ3NWcUwwaTZXNUhZVEtndz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/discussher"} color={"secondary"}>
											DiscussHer
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 986 1751 7227
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: DiscussHer</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/98617517227?pwd=NHVRZXpuWTlvOGNMN2R6QjRwTTlCZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/98617517227?pwd=NHVRZXpuWTlvOGNMN2R6QjRwTTlCZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/HumansOfStuy"} color={"secondary"}>
											Humans of Stuy
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 929 4984 3230
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: hos</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92949843230?pwd=ZXRUcWxuTHBPZ0JMVkRlVW4vbVMzZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92949843230?pwd=ZXRUcWxuTHBPZ0JMVkRlVW4vbVMzZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/TheMoonlight"} color={"secondary"}>
											The Moonlight
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 404 076 2873</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: moonlight</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/4040762873?pwd=dUpKcHFSR2tZdGl1VTUwUG9uVERRdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/4040762873?pwd=dUpKcHFSR2tZdGl1VTUwUG9uVERRdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
						</TabPanel>
					</Paper>
				</main>
			</div>
		</div>
	);
};

export default ClubPubFair;
