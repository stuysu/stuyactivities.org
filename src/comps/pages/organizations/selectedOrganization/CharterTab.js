import React from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import {
	Grid,
	Typography,
	Tabs,
	Tab,
	Box
} from "@material-ui/core";
import {
	Info,
	Description,
	Person
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../../context/ApolloProvider";

//styles
const useStyles = makeStyles({
	root: {
		textAlign: 'center'
	},
	name: {
		marginTop: '1em'
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
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
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

export default function CharterTab(charter) {
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
		<Grid container spacing={2}>
			<Grid item xs={1} />
			<Grid item xs={10} className={classes.root}>
				<Typography variant={"h3"} className={classes.name}>{data.organization.name}</Typography>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					indicatorColor="primary"
					textColor="primary"
					aria-label="icon tabs example"
				>
					<Tab icon={<Info />} aria-label="phone" {...a11yProps(0)} />
					<Tab icon={<Description />} aria-label="favorite" {...a11yProps(1)} />
					<Tab icon={<Person />} aria-label="person" {...a11yProps(2)} />
				</Tabs>
				<TabPanel value={value} index={0}>

				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
			</Grid>
			<Grid item xs={1} />
		</Grid>
	);
}
