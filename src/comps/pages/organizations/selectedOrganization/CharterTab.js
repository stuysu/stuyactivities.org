import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
	Grid,
	Typography,
	Tabs,
	Tab,
	Box,
	IconButton
} from "@material-ui/core";
import { Info, Description, Person, ArrowBack } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../../context/ApolloProvider";

//styles
const useStyles = makeStyles({
	root: {
		width: "100%"
	},
	body: {
		textAlign: "center"
	},
	name: {
		marginTop: "1em"
	},
	tabBox: {
		marginTop: "1.6em"
	},
	charterInfoElement: {
		paddingBottom: "2em",
		paddingTop: "0.5em",
		textAlign: "left"
	},
	backButton: {
		top: "2%",
		left: "50%",
		marginTop: "1em"
	}
});

//tab panels
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
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
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`
	};
}

const QUERY = gql`
	query Organization($url: String) {
		organization(url: $url) {
			name
			active
			charter {
				picture
				mission
				purpose
				benefit
				meetingFrequency
				commitmentLevel
			}
			# You might also want to use the tags
			tags {
				name
			}
		}
	}
`;

const CharterTab = () => {
	const url = useParams().url;
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const { data, loading, error } = useQuery(QUERY, {
		variables: { url },
		client
	});

	if (loading) {
		return <p>Loading</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<Grid container spacing={2} className={classes.root}>
			<Grid item xs={1}>
				<IconButton
					className={classes.backButton}
					href={"/organizations"}
				>
					<ArrowBack />
				</IconButton>
			</Grid>
			<Grid item xs={10} className={classes.body}>
				<Typography variant={"h3"} className={classes.name}>
					{data.organization.name}
				</Typography>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					indicatorColor="primary"
					textColor="primary"
					aria-label="icon tabs example"
				>
					<Tab icon={<Info />} aria-label="phone" {...a11yProps(0)} />
					<Tab
						icon={<Description />}
						aria-label="favorite"
						{...a11yProps(1)}
					/>
					<Tab
						icon={<Person />}
						aria-label="person"
						{...a11yProps(2)}
					/>
				</Tabs>
				<TabPanel value={value} index={0}>
					<div className={classes.tabBox}>
						<div className={classes.charterInfoElement}>
							{data.organization.charter.mission}
						</div>
						<b>What is the purpose of this activity?</b>
						<div className={classes.charterInfoElement}>
							{data.organization.charter.purpose}
						</div>
						<b>How does this activity benefit Stuyvesant?</b>
						<div className={classes.charterInfoElement}>
							{data.organization.charter.benefit}
						</div>
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<div className={classes.tabBox}>Club Postings</div>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<div className={classes.tabBox}>Club Members</div>
				</TabPanel>
			</Grid>
			<Grid item xs={1} />
		</Grid>
	);
};

export default CharterTab;
