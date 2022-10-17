import React from "react";
import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import SearchBox from "../../comps/pages/catalog/filters/SearchBox";
import LazyLoadComponent from "parm-react-lazyload";

const classes = {
	root: {
		marginTop: "2rem"
	},
	logCard: [
		{
			margin: "4px",
			padding: "1rem"
		},
		// untested
		{
			"&:hover": {
				color: "primary.main"
			}
		}
	]
};

const QUERY = gql`
	query Organizations($keyword: String) {
		organizations(keyword: $keyword) {
			name
			strikes {
				reason
				createdAt
				weight
			}
			url
			updatedAt
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
				<Container>
					<Box p={3}>{children}</Box>
				</Container>
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
	const [keyword, setKeyword] = React.useState("");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const { error, data } = useQuery(QUERY, {
		variables: {
			keyword
		}
	});

	if (error) return <p>There was an error loading this page</p>;

	let orgArray = data?.organizations.slice().sort((a, b) => {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});

	let orgStrike = [];
	data?.organizations.forEach(org => {
		if (org.strikes.length !== 0) {
			org.strikes.forEach(strike => {
				orgStrike.push({
					name: org.name,
					url: org.url,
					strike: strike
				});
			});
		}
	});

	orgStrike.sort((a, b) => {
		return new Date(b.strike.createdAt) - new Date(a.strike.createdAt);
	});

	return (
		<Box sx={classes.root}>
			<Paper position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
				>
					<Tab label="Strikes" {...a11yProps(0)} />
					<Tab label="Organization Updates" {...a11yProps(1)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<div>
						<SearchBox setKeyword={setKeyword} keyword={keyword} />
						{orgStrike &&
							orgStrike.map(org => {
								const date = new Date(org.strike.createdAt);
								const options = {
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "numeric",
									minute: "numeric",
									hour12: true
								};
								return (
									<LazyLoadComponent>
										<Box sx={classes.logCard}>
											<Typography>{org.name}</Typography>
											<Typography>Reason: {org.strike.reason}</Typography>
											<Typography>{date.toLocaleString("en-US", options)}</Typography>
											<Typography>Weight: {org.strike.weight}</Typography>
										</Box>
										<Divider variant="middle" />
									</LazyLoadComponent>
								);
							})}
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<SearchBox setKeyword={setKeyword} keyword={keyword} />
					{orgArray &&
						orgArray.map(org => {
							const date = new Date(org.updatedAt);
							const options = {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
								hour12: true
							};
							return (
								<LazyLoadComponent>
									<Box sx={classes.logCard}>
										<Typography>{org.name}</Typography>
										<Typography>Last Update: {date.toLocaleString("en-US", options)}</Typography>
									</Box>
									<Divider variant="middle" />
								</LazyLoadComponent>
							);
						})}
				</TabPanel>
			</Paper>
		</Box>
	);
};

export default AdminLog;
