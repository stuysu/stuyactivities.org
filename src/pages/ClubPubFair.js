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
	const [tab, setTab] = React.useState(1);
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
					<div style={{ width: "100%", whiteSpace: "noWrap" }}>
						<Typography paragraph>
							Webinar Link:{" "}
							<Link
								href={"https://us02web.zoom.us/webinar/register/WN_KbyoPHqIT8GlurIiKGALPQ"}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
									https://us02web.zoom.us/webinar/register/WN_KbyoPHqIT8GlurIiKGALPQ
								</Box>
							</Link>
						</Typography>
					</div>
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
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/YSI"} color={"secondary"}>
											Youth Science Initiative
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 818 9666 5746
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: YSI</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/81896665746?pwd=YmZ2SllTb0hjWnU0cjcvVzNYU05Zdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/81896665746?pwd=YmZ2SllTb0hjWnU0cjcvVzNYU05Zdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stemgoesred"} color={"secondary"}>
											Stuy STEM Goes Red
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 869 6916 8553
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 0pYdmn</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/86969168553?pwd=VzhoMXk2bkhnVXUzdUVDRE5Hc0UyZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/86969168553?pwd=VzhoMXk2bkhnVXUzdUVDRE5Hc0UyZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyneuro"} color={"secondary"}>
											StuyNeuro
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 841 0101 2829
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyneuro</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84101012829?pwd=Z3gyU2dZTWFPcVJvMFBoZzYraVRhUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84101012829?pwd=Z3gyU2dZTWFPcVJvMFBoZzYraVRhUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/StuyMath"} color={"secondary"}>
											StuyMath
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 969 2493 8194
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuymath</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96924938194?pwd=TXNKbUhTa0hNRUcvTkxXdHliMVFEUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96924938194?pwd=TXNKbUhTa0hNRUcvTkxXdHliMVFEUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyfp"} color={"secondary"}>
											Stuyvesant Future Physicians
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 880 2985 7238
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 0g3Xrr</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/88029857238?pwd=WXRzU2FCV1A1cS9ZWlZLT2ZPN2hVQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/88029857238?pwd=WXRzU2FCV1A1cS9ZWlZLT2ZPN2hVQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyml"} color={"secondary"}>
											Machine Learning Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 944 4559 6858
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyml</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/94445596858?pwd=TFpZRkNSUlJNamRpTTFsWkwzazZhdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/94445596858?pwd=TFpZRkNSUlJNamRpTTFsWkwzazZhdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/CS-Club"} color={"secondary"}>
											Intro to Programming and CS Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 838 0063 4006
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 3zYadf</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83800634006?pwd=NlhFcFE3OGJsUklMU1RxNTJZYVMzdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83800634006?pwd=NlhFcFE3OGJsUklMU1RxNTJZYVMzdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyccc"} color={"secondary"}>
											Stuyvesant Competitive Computing Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 843 8802 9285
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyccc</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84388029285?pwd=VExyWUdUUU93UjVsSjJaeER5RTNlUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84388029285?pwd=VExyWUdUUU93UjVsSjJaeER5RTNlUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuywip"} color={"secondary"}>
											Stuyvesant Women in Physics and Engineering
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 822 1126 4031
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: physics</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/82211264031?pwd=ejFDY1dXaE1ZR2hSemJ6OGtoT3FoZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/82211264031?pwd=ejFDY1dXaE1ZR2hSemJ6OGtoT3FoZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuybo"} color={"secondary"}>
											Stuyvesant Biology Olympiad (StuyBO)
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 954 5707 0563
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuybo</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/95457070563?pwd=WlFWMlpBR3RWd3F3bC9PMDNDQjhpdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/95457070563?pwd=WlFWMlpBR3RWd3F3bC9PMDNDQjhpdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/gwc"} color={"secondary"}>
											Stuyvesant Girls Who Code
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 726 5716 0524
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: gwc@stuy</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us04web.zoom.us/j/72657160524?pwd=NlBqUkVRcEwxTXZqWjZyNnVMV21jdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us04web.zoom.us/j/72657160524?pwd=NlBqUkVRcEwxTXZqWjZyNnVMV21jdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/acschemclub"} color={"secondary"}>
											ACS Chem Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 925 7718 5564
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: acschem</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92577185564?pwd=a2RiMjhrYUJmazRmR2FyS3VPWENvQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92577185564?pwd=a2RiMjhrYUJmazRmR2FyS3VPWENvQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/svu"} color={"secondary"}>
											Stuyvesant Voice the Unheard (SVU)
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 834 4253 1396
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: qF0D1k</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83442531396?pwd=SkRjNmV3Z2lPUExSNnNaZFhLZlEzdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83442531396?pwd=SkRjNmV3Z2lPUExSNnNaZFhLZlEzdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyhacks"} color={"secondary"}>
											StuyHacks
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 426 694 4547</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyhacks</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://us02web.zoom.us/j/4266944547?pwd=My9oTW9zQ3JJMTYxcnhVVW1"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/4266944547?pwd=My9oTW9zQ3JJMTYxcnhVVW1
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyentomology"} color={"secondary"}>
											Stuy Entomology
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 937 3965 9638
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 2h9D2S</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/93739659638?pwd=SXgveWs1UUZkR2dod3pEV0p2MTh2QT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/93739659638?pwd=SXgveWs1UUZkR2dod3pEV0p2MTh2QT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyrocketry"} color={"secondary"}>
											Stuy Rocketry Team
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 833 0147 0559
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: rocketry</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83301470559?pwd=Rm41bmMxTmVzY0JSeS9kQU1MTHlzUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83301470559?pwd=Rm41bmMxTmVzY0JSeS9kQU1MTHlzUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuysky"} color={"secondary"}>
											StuySky
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 860 5200 7658
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuysky</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/86052007658?pwd=elNqT3hiS1VnZDdRL0tlVm43NVJtUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/86052007658?pwd=elNqT3hiS1VnZDdRL0tlVm43NVJtUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/scsc"} color={"secondary"}>
											Stuy CyberSecurity Community
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 994 2623 9025
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: hacks</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99426239025?pwd=MDRUSmJVWWVGZ3hSWUlSY1FPcFpMQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99426239025?pwd=MDRUSmJVWWVGZ3hSWUlSY1FPcFpMQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuypremed"} color={"secondary"}>
											Stuyvesant Pre-med
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 837 3137 3924
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuypremed</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83731373924?pwd=L2FjcCtFRS94OU9UMFp6OE95ZjVHdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83731373924?pwd=L2FjcCtFRS94OU9UMFp6OE95ZjVHdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
						</TabPanel>
						<TabPanel value={tab} index={1}>
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/coalitionz"} color={"secondary"}>
											Coalition Z
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 995 9950 7927
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: coalitionz</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99599507927?pwd=VVNxdC9YV0JwWC9QRVMvd3JGL3gxUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99599507927?pwd=VVNxdC9YV0JwWC9QRVMvd3JGL3gxUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/StuyVoices"} color={"secondary"}>
											Stuy Voices
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 874 0384 1394
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyvoices</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87403841394?pwd=TVNBSlEwNno3NzliN0pmb0RQM0Y4dz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87403841394?pwd=TVNBSlEwNno3NzliN0pmb0RQM0Y4dz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuywibc"} color={"secondary"}>
											Stuy WIBC
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 813 3790 5719
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuywibc20</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/81337905719?pwd=QTA1SjVZbFo5cXVROGcrTXV0ZE5zQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/81337905719?pwd=QTA1SjVZbFo5cXVROGcrTXV0ZE5zQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/patriotsclub"} color={"secondary"}>
											Stuyvesant Patriots Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 929 2439 7988
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 2020usa</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92924397988?pwd=NjRrTHVEdjh4N0huRDZkbm0yVUtnQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92924397988?pwd=NjRrTHVEdjh4N0huRDZkbm0yVUtnQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyfem"} color={"secondary"}>
											Stuyvesant Feminist Society
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 944 7605 4190
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyfem</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/94476054190?pwd=NkxRNnprdDBzQy83Vm0rcWhOakQ4dz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/94476054190?pwd=NkxRNnprdDBzQy83Vm0rcWhOakQ4dz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/sda"} color={"secondary"}>
											Students Demand Action Stuyvesant
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 921 1235 2012
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: SDA</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92112352012?pwd=K3RacEVKbno0ZENXdDhDTEtYUUVYZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92112352012?pwd=K3RacEVKbno0ZENXdDhDTEtYUUVYZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/syd"} color={"secondary"}>
											Stuyvesant Young Democrats
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 740 9900 7144
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: StuyDems</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us04web.zoom.us/j/74099007144?pwd=UlcrcmJYTzI1bGtSdWJ2NDBHaWorZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us04web.zoom.us/j/74099007144?pwd=UlcrcmJYTzI1bGtSdWJ2NDBHaWorZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyaclu"} color={"secondary"}>
											ACLU at Stuy
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 980 8502 8989
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: aclu</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/98085028989?pwd=eEZyQ24zditvWmRkbnp3NGRFZkpYUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/98085028989?pwd=eEZyQ24zditvWmRkbnp3NGRFZkpYUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/activeminds"} color={"secondary"}>
											Active Minds
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 963 8272 1441
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: activemind</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96382721441?pwd=dlI3KzlCVjdua2llR2JNcjNwRVhzUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96382721441?pwd=dlI3KzlCVjdua2llR2JNcjNwRVhzUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/latinandmyths"} color={"secondary"}>
											Latin and Mythology Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 875 1317 3109
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: LatinClub</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link href={""} style={{ paddingBottom: "3px" }} color={"secondary"}>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden"></Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyspanish"} color={"secondary"}>
											Stuyvesant Spanish Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 845 9111 4900
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: spanish</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84591114900?pwd=TGQvQVlONmwxQUs2SVpTQktkK0d0Zz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84591114900?pwd=TGQvQVlONmwxQUs2SVpTQktkK0d0Zz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/russianclub"} color={"secondary"}>
											Russian Culture Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 843 6450 6618
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: russia</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84364506618?pwd=bVBnSEdXc1EyK3dXZldFZ1JNRDU0QT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84364506618?pwd=bVBnSEdXc1EyK3dXZldFZ1JNRDU0QT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/sjmc"} color={"secondary"}>
											Stuyvesant Japanese Media Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 935 8246 7480
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyjmc</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/93582467480?pwd=bHVsZ1czTnlPMXFSd0VwVEk3Q1RUZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/93582467480?pwd=bHVsZ1czTnlPMXFSd0VwVEk3Q1RUZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuymsa"} color={"secondary"}>
											Stuyvesant Muslim Students Association
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 983 7756 4230
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuymsa</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/98377564230?pwd=ekZYTzkwU1o0WW84N1M2b1EzL25tQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/98377564230?pwd=ekZYTzkwU1o0WW84N1M2b1EzL25tQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyseekers"} color={"secondary"}>
											Stuyvesant Seekers Christian Fellowship
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 897 3366 7581
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: SeekJesus</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/89733667581?pwd=eHI0TFU4cTBELytWV1hSR3Jhd2NKZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/89733667581?pwd=eHI0TFU4cTBELytWV1hSR3Jhd2NKZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/Spectrum"} color={"secondary"}>
											Stuyvesant Spectrum
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 963 8676 8756
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: rainbow</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96386768756?pwd=UHVWTm1acmNGS3VOTGJObDkvSWxzdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96386768756?pwd=UHVWTm1acmNGS3VOTGJObDkvSWxzdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuycpc"} color={"secondary"}>
											Stuyvesant Cultural Preservation Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 273 627 7951</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuycpc</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/2736277951?pwd=NnF4MnpUdms3RUxKSUJvTjA4bUUwQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/2736277951?pwd=NnF4MnpUdms3RUxKSUJvTjA4bUUwQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/jsu"} color={"secondary"}>
											Stuyvesant Jewish Student Union
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 847 2849 9210
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyjsu</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84728499210?pwd=ZmEvRWpNa2pWWm4zZEw4Z0tCQ1BYQT0"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84728499210?pwd=ZmEvRWpNa2pWWm4zZEw4Z0tCQ1BYQT0
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyeats"} color={"secondary"}>
											StuyEats
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 825 6140 5813
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyeats</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/82561405813?pwd=Q3VtbzJQSVduUnhzNnd5akN1MjFjZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/82561405813?pwd=Q3VtbzJQSVduUnhzNnd5akN1MjFjZz09
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
											href={"https://stuyactivities.org/BSL, stuyactivities.org/ASPIRA"}
											color={"secondary"}
										>
											Stuyvesant Black Students League & ASPIRA*
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 833 4195 1616
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: aspirabsl</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83341951616?pwd=a1RSeXNKVUhNa3FlVGxpdzNLdnRwdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83341951616?pwd=a1RSeXNKVUhNa3FlVGxpdzNLdnRwdz09
											</Box>
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Note: Stuyvesant Black Students League (stuyactivities.org/BSL) and ASPIRA
										(stuyactivities.org/ASPIRA) are hosting a joint information meeting
									</Typography>
								</div>
							</ListItem>
							<Divider />
						</TabPanel>
						<TabPanel value={tab} index={2}>
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyroadrunners"} color={"secondary"}>
											Stuyvesant Road Runners
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 991 8169 8159
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyrr</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99181698159?pwd=ZlpxM2xQbHFVWmJhTjJQMjNKL2JJZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99181698159?pwd=ZlpxM2xQbHFVWmJhTjJQMjNKL2JJZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/cyclingteam"} color={"secondary"}>
											Stuyvesant Cycling Team
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 928 3713 4662
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: cycling</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/92837134662?pwd=aTVyaXo4U0p6KzN1cHJrMFlocGw3Zz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/92837134662?pwd=aTVyaXo4U0p6KzN1cHJrMFlocGw3Zz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuysail"} color={"secondary"}>
											Stuyvesant Sailing
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 879 1112 6045
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: sailing</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87911126045?pwd=ekoyS0MxTUpCaERWTDR6Z0lSVlBqUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87911126045?pwd=ekoyS0MxTUpCaERWTDR6Z0lSVlBqUT09
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
											href={"https://stuyactivities.org/StuyUltimateFrisbee"}
											color={"secondary"}
										>
											Stuyvesant Sticky Fingers (Boy's Stuyvesant Ultimate Frisbee)
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 814 3671 8189
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: ultimate</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/81436718189?pwd=NERIalp2V2R0NzBYKytGdFlwVHRMdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/81436718189?pwd=NERIalp2V2R0NzBYKytGdFlwVHRMdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuysc"} color={"secondary"}>
											Stuyvesant Soccer Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 832 9482 5556
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: Soccer</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83294825556?pwd=Y3ZaR0tjZjRHU1Q4RnNMeEY4c0VWZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83294825556?pwd=Y3ZaR0tjZjRHU1Q4RnNMeEY4c0VWZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/ssfgirls"} color={"secondary"}>
											Stuyvesant Sticky Fingers (Girls)
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 968 3052 4262
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: frisbee</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96830524262?pwd=OGhteWJERlFRY1RORXp6K2g4NXdZQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96830524262?pwd=OGhteWJERlFRY1RORXp6K2g4NXdZQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuywis"} color={"secondary"}>
											StuyWis
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 859 361 8903</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuywislol</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/8593618903?pwd=WlR0bHpQbCtkdFhHeXIwR0lmUEpoQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/8593618903?pwd=WlR0bHpQbCtkdFhHeXIwR0lmUEpoQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuypong"} color={"secondary"}>
											Stuy Pong
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 968 7378 7310
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: malong</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96873787310?pwd=dE9GVys2cXQ1cHBGOGhxVnFabnhsZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96873787310?pwd=dE9GVys2cXQ1cHBGOGhxVnFabnhsZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stc"} color={"secondary"}>
											Stuyvesant Theater Community
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 864 3646 8644
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 8CS3tS</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/86436468644?pwd=VFNIS3g3RTg5WU1ldVVZK25yUFZ5UT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/86436468644?pwd=VFNIS3g3RTg5WU1ldVVZK25yUFZ5UT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuynaach"} color={"secondary"}>
											Stuy Naach
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 947 2566 7330
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: Stuynaach</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/94725667330?pwd=OEJBbjJmM2xLWlEwZUlha0FOUkpiUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/94725667330?pwd=OEJBbjJmM2xLWlEwZUlha0FOUkpiUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyacappella"} color={"secondary"}>
											Stuyvesant A Cappella
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 830 2688 9302
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: ne2U38</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83026889302?pwd=cDFkWi9ZNTNsYS9aSmxyczN6Y1BEUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83026889302?pwd=cDFkWi9ZNTNsYS9aSmxyczN6Y1BEUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/SMA"} color={"secondary"}>
											Stuyvesant Music Association
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 961 2871 2505
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: </Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96128712505?pwd=Y0ZOS3k1U0VmbVVzd2lYNUpMMmMyZz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96128712505?pwd=Y0ZOS3k1U0VmbVVzd2lYNUpMMmMyZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuy-kpop"} color={"secondary"}>
											Stuy K-Pop
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 983 1837 0237
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: ilovekpop</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/98318370237?pwd=cjRkbWkxRnpneng3UFJ0L2lFN25uUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/98318370237?pwd=cjRkbWkxRnpneng3UFJ0L2lFN25uUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuystrums"} color={"secondary"}>
											Stuy Strums
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 831 5806 8388
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: gu1tar</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83158068388?pwd=cTBNcXRHYnZoQVVnajlyaUcyQ29OZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83158068388?pwd=cTBNcXRHYnZoQVVnajlyaUcyQ29OZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/smpc"} color={"secondary"}>
											Stuyvesant Music Production Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 820 5879 1431
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: smpc!</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/82058791431?pwd=WHg5Q0NsN0FhaDRkMm55SGlpdGtVQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/82058791431?pwd=WHg5Q0NsN0FhaDRkMm55SGlpdGtVQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/guzheng"} color={"secondary"}>
											Gu Zheng Club (Traditional Chinese Instrument)
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 870 7727 8513
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: guzheng</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87077278513?pwd=bndvcHo4a2E5aUkvOWEzOXpPREZZUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87077278513?pwd=bndvcHo4a2E5aUkvOWEzOXpPREZZUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/sportdiscussion"} color={"secondary"}>
											Sports Discussion Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 872 2477 0496
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 5EEyJK</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87224770496?pwd=OEowT2ZmYXZvQnA0bzJnbHVEUUthZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87224770496?pwd=OEowT2ZmYXZvQnA0bzJnbHVEUUthZz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/Taekwondo"} color={"secondary"}>
											Stuyvesant Taekwondo Association
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 997 9782 5519
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: taekwondo</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99797825519?pwd=Z0hKeGJVRGN5TU9DS1NlMmp5OHhHQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99797825519?pwd=Z0hKeGJVRGN5TU9DS1NlMmp5OHhHQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuystep"} color={"secondary"}>
											Stuy Step
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 818 0554 0889
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuystep</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/81805540889?pwd=bU9JZHBRQzVFVC8zSU9sNzNoZkV0Zz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/81805540889?pwd=bU9JZHBRQzVFVC8zSU9sNzNoZkV0Zz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/StuyFlow"} color={"secondary"}>
											StuyFlow
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 786 087 6863</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyflow</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/7860876863?pwd=UXVXZnVMNHF3L0lyKzFuR3ZEbU04Zz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/7860876863?pwd=UXVXZnVMNHF3L0lyKzFuR3ZEbU04Zz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/motorsports"} color={"secondary"}>
											Stuyvesant Motorsports Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 825 1158 4314
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: cars</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/82511584314?pwd=MWlpNktLTkwyMEppRVpRODNtWHdMUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/82511584314?pwd=MWlpNktLTkwyMEppRVpRODNtWHdMUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyswing"} color={"secondary"}>
											StuySwing
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 869 3120 9935
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuyswing</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/86931209935?pwd=M3ZNUlNHSVVtbC85TkRVaFlSa3F6UT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/86931209935?pwd=M3ZNUlNHSVVtbC85TkRVaFlSa3F6UT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
						</TabPanel>
						<TabPanel value={tab} index={3}>
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuylaw"} color={"secondary"}>
											StuyLaw
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 899 4110 7013
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: StuyLaw</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/89941107013?pwd=ejErNWlzMW5CT3p3ZExuVE4rR0owQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/89941107013?pwd=ejErNWlzMW5CT3p3ZExuVE4rR0owQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/GYLTxStuy"} color={"secondary"}>
											GYLTxStuy
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 933 3972 8280
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: GYLTxStuy</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/93339728280?pwd=bStUUERSRFV2UzU5OTFKZGJwZE5DUT09 "}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/93339728280?pwd=bStUUERSRFV2UzU5OTFKZGJwZE5DUT09{" "}
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
											href={"https://stuyactivities.org/alumnimentoringprogram"}
											color={"secondary"}
										>
											Stuyvesant Alumni Mentoring Program
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 851 4892 5672
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: mentoring</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/85148925672?pwd=UXJyaGppclVYTWdWcDBwbXhEVmlPdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/85148925672?pwd=UXJyaGppclVYTWdWcDBwbXhEVmlPdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/pstuychology"} color={"secondary"}>
											Pstuychology
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 845 7144 0948
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: brain!</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84571440948?pwd=UktCTXRpT2E3MS9mNU1iekU3ejNOUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84571440948?pwd=UktCTXRpT2E3MS9mNU1iekU3ejNOUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/Smcmc"} color={"secondary"}>
											Stock Market Competition and Mentoring Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 982 1065 4018
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: smcmc</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/98210654018?pwd=b09IK0ZsVG5DTlZwTTlKUElnSXNJUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/98210654018?pwd=b09IK0ZsVG5DTlZwTTlKUElnSXNJUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/money"} color={"secondary"}>
											StuyLaunch
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 966 7573 2881
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: stuylaunch</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96675732881?pwd=SUFJYUVHL1VTakhYQjd0Y2V3bnQ4QT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96675732881?pwd=SUFJYUVHL1VTakhYQjd0Y2V3bnQ4QT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/StuyvesantDECA"} color={"secondary"}>
											Stuyvesant DECA
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 778 9288 0996
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: JoinDECA!</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us04web.zoom.us/j/77892880996?pwd=NGxSQ0hjb29hcGJlSFFEWEI3aGNRUT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us04web.zoom.us/j/77892880996?pwd=NGxSQ0hjb29hcGJlSFFEWEI3aGNRUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/finance"} color={"secondary"}>
											Stuyvesant Financial Literacy Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 894 3510 0887
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: finance</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/89435100887?pwd=ekYweC9yK1ZIVis5bDJnNm11b0lyZz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/89435100887?pwd=ekYweC9yK1ZIVis5bDJnNm11b0lyZz09
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
											href={"https://stuyactivities.org/teensforpublichealth"}
											color={"secondary"}
										>
											Teens for Public Health
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 832 3455 7253
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: health</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83234557253?pwd=aFBia0h6K2IzZmc1L29ydVBNampDdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83234557253?pwd=aFBia0h6K2IzZmc1L29ydVBNampDdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/realpolitalk"} color={"secondary"}>
											Realpolitalk
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 997 1902 2776
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: politics</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99719022776?pwd=elJrVGVFYUJkR3JzT1RTeEZiTlg0UT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99719022776?pwd=elJrVGVFYUJkR3JzT1RTeEZiTlg0UT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/invest"} color={"secondary"}>
											Investment Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 836 8039 6852
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: invest</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/83680396852?pwd=UlFjSGlhemp0YSs2Nk1WZ3MxWUtoQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/83680396852?pwd=UlFjSGlhemp0YSs2Nk1WZ3MxWUtoQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/redefystuy"} color={"secondary"}>
											Redefy Stuyvesant
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 873 2374 6487
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: Redefy2020</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/87323746487?pwd=WFRhMjNHNHJlN3VSY2FXaGNaNGRVdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/87323746487?pwd=WFRhMjNHNHJlN3VSY2FXaGNaNGRVdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/archclub"} color={"secondary"}>
											Architecture Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 998 8365 7499
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: arch</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99883657499?pwd=SjhJM1d4Tjhjb1lvdTlqR3JFTUNFQT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99883657499?pwd=SjhJM1d4Tjhjb1lvdTlqR3JFTUNFQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/GRC"} color={"secondary"}>
											Global Research and Consulting
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Meeting code: 728 799 6511</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 287419</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/7287996511?pwd=QkZ6WTk4b3h3N3FrVFB6UlpCUEVrQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
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
										<Link href={"https://stuyactivities.org/stuyproteomics"} color={"secondary"}>
											Stuy Proteomics
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 964 1874 5097
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: protein</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/96418745097?pwd=VjVvai8zTTFvMGxsa0FGK1k3ZkVPUT09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/96418745097?pwd=VjVvai8zTTFvMGxsa0FGK1k3ZkVPUT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/stuyresearchclub"} color={"secondary"}>
											Stuyvesant Research Club
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 815 4903 2239
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: research</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/81549032239?pwd=UTJpc3N4VEFqamdIT09pVnp6VTFEQT09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/81549032239?pwd=UTJpc3N4VEFqamdIT09pVnp6VTFEQT09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/mathgoalsforgirls"} color={"secondary"}>
											Math Goals for Girls
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 820 5977 2940
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: mgfg</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/82059772940?pwd=WHoxdEVnRXNuYnpiWFgxS2xIblpIdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/82059772940?pwd=WHoxdEVnRXNuYnpiWFgxS2xIblpIdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
							<ListItem style={{ padding: "1rem" }}>
								<div style={{ width: "100%", whiteSpace: "nowrap" }}>
									<Typography style={{ paddingBottom: "3px" }}>
										<Link href={"https://stuyactivities.org/metals"} color={"secondary"}>
											Stuyvesant Metallurgical Society
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 990 6820 9555
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: 2zz3Gq</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={"https://zoom.us/j/99068209555?pwd=SlVIeWxFcHNjaUhJWHdHSzBWVDJvdz09"}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://zoom.us/j/99068209555?pwd=SlVIeWxFcHNjaUhJWHdHSzBWVDJvdz09
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
											href={"https://stuyactivities.org/stuyvesantasiancoalition"}
											color={"secondary"}
										>
											Stuyvesant Asian Coalition
										</Link>
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>
										Meeting code: 843 6037 3329
									</Typography>
									<Typography style={{ paddingBottom: "3px" }}>Passcode: sac</Typography>
									<Typography>
										Meeting Link:{" "}
										<Link
											href={
												"https://us02web.zoom.us/j/84360373329?pwd=cTh6YnZSaHFTZHBDZmhha0ZYVGhjdz09"
											}
											style={{ paddingBottom: "3px" }}
											color={"secondary"}
										>
											<Box component={"div"} textOverflow={"ellipsis"} overflow="hidden">
												https://us02web.zoom.us/j/84360373329?pwd=cTh6YnZSaHFTZHBDZmhha0ZYVGhjdz09
											</Box>
										</Link>
									</Typography>
								</div>
							</ListItem>
							<Divider />
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
