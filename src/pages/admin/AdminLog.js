import React from "react";
import { gql, useQuery } from "@apollo/client";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const QUERY = gql`
	query {
		organizations {
			strikes {
				reason
			}
		}
	}
`;

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

const AdminLog = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const {
		error,
		data
		// refetch
	} = useQuery(QUERY);

	if (error) return <p>There was an error loading this page</p>;

	return (
		<div>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
				>
					<Tab label="Strikes" {...a11yProps(0)} />
					<Tab label="Item Two" {...a11yProps(1)} />
					<Tab label="Item Three" {...a11yProps(2)} />
					<Tab label="Item Four" {...a11yProps(3)} />
					<Tab label="Item Five" {...a11yProps(4)} />
					<Tab label="Item Six" {...a11yProps(5)} />
					<Tab label="Item Seven" {...a11yProps(6)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				{data?.organizations?.strikes?.map(strike => (
					<Typography>{strike.reason}</Typography>
				))}
			</TabPanel>
			<TabPanel value={value} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel>
			<TabPanel value={value} index={3}>
				Item Four
			</TabPanel>
			<TabPanel value={value} index={4}>
				Item Five
			</TabPanel>
			<TabPanel value={value} index={5}>
				Item Six
			</TabPanel>
			<TabPanel value={value} index={6}>
				Item Seven
			</TabPanel>
		</div>
	);
};

export default AdminLog;
