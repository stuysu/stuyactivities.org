import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Redirect, generatePath, Switch, Route } from "react-router-dom";
import RouteTabs from "../../comps/ui/RouteTabs";
import Approvals from "./approvals";
import UserContext from "../../comps/context/UserContext";
import SignInRequired from "../../comps/ui/SignInRequired";

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(3)
	}
}));

export default function AdminRouter({ match }) {
	const classes = useStyles();
	const actualPath = generatePath(match.path, match.params);
	const user = React.useContext(UserContext);

	if (!user.signedIn) {
		return <SignInRequired />;
	}

	const adminRoles = user?.adminRoles || [];

	// Only show the user tabs they have permission to view
	const tabs = [
		{
			label: "Charter Approvals",
			role: "charters",
			path: actualPath + "/approvals"
		},
		{
			label: "Help Requests",
			role: "helpRequests",
			path: actualPath + "/help"
		}
	].filter(tab => adminRoles.some(row => tab.role === row.role));

	if (!tabs.length) {
		return <p>You don't have access to this page</p>;
	}

	return (
		<div className={classes.root}>
			<Typography variant={"h3"}>Admin Panel</Typography>
			<RouteTabs tabs={tabs} />

			<Switch>
				<Route path={match.path + "/approvals"} component={Approvals} />
				<Route path={match.path + "/help"} component={Approvals} />
				<Route path={match.path}>
					<Redirect to={tabs[0].path} />
				</Route>
			</Switch>
		</div>
	);
}
