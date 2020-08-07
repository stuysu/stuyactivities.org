import React from "react";
import FlexCenter from "../../ui/FlexCenter";
import { Avatar, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import { generatePath, useParams, useRouteMatch } from "react-router-dom";
import UnstyledLink from "../../ui/UnstyledLink";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Dashboard, Description, Person } from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	avatar: {
		height: "200px",
		width: "200px",
		marginBottom: "1rem"
	},
	orgName: {
		textAlign: "center"
	},
	stickyContainer: {
		position: "sticky",
		top: "40px"
	}
}));

const TabItem = ({ to, label, icon, exact = true }) => {
	const params = useParams();
	const renderedUrl = generatePath(to, params);
	const routeMatchesUrl = useRouteMatch(to);

	const isSelected = exact
		? routeMatchesUrl?.isExact
		: Boolean(routeMatchesUrl);

	return (
		<UnstyledLink to={renderedUrl}>
			<ListItem button selected={isSelected}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={label} />
			</ListItem>
		</UnstyledLink>
	);
};

const OrgNavPanel = ({ match, organization }) => {
	const classes = useStyles();

	return (
		<div className={classes.stickyContainer}>
			<FlexCenter>
				<Avatar
					className={classes.avatar}
					src={organization?.charter?.picture}
				/>
			</FlexCenter>
			<Typography className={classes.orgName} variant={"h5"}>
				{organization?.name}
			</Typography>

			<hr />
			<List component="nav" aria-label="main mailbox folders">
				<TabItem
					label={"Overview"}
					to={match.path}
					icon={<Dashboard />}
				/>
				<TabItem
					label={"Charter"}
					to={match.path + "/charter"}
					icon={<Description />}
				/>
				<TabItem
					label={"Members"}
					to={match.path + "/members"}
					icon={<Person />}
				/>
			</List>
		</div>
	);
};

export default OrgNavPanel;
