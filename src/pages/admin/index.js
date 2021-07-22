import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { generatePath, Redirect, Route, Switch } from "react-router-dom";
import RouteTabs from "../../comps/ui/RouteTabs";
import Approvals from "./approvals";
import UserContext from "../../comps/context/UserContext";
import SignInRequired from "../../comps/ui/SignInRequired";
import Strikes from "./Strikes";
import OrgApprovals from "./approvals/OrgApprovals";
import AdminLog from "./AdminLog";
import { AssignmentTurnedIn, EmailOutlined, Assignment, SmsFailed, LiveHelp } from "@material-ui/icons";
import EmailClubLeaders from "./email";

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
			path: actualPath + "/approvals",
			icon: <AssignmentTurnedIn />
		},
		{
			label: "Help Requests",
			role: "helpRequests",
			path: actualPath + "/help",
			icon: <LiveHelp />
		},
		{
			label: "Strikes",
			role: "helpRequests",
			path: actualPath + "/strikes",
			icon: <SmsFailed />
		},
		{
			label: "Admin Log",
			role: "charters",
			path: actualPath + "/log",
			icon: <Assignment />
		},
		{
			label: "Email Club Leaders",
			role: "charters",
			path: actualPath + "/email",
			icon: <EmailOutlined />
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
				<Route path={match.path + "/approvals"} component={Approvals} exact />
				<Route path={match.path + "/approvals/:url"} component={OrgApprovals} />
				<Route path={match.path + "/help"} component={Approvals} />
				<Route path={match.path + "/strikes"} component={Strikes} />
				<Route path={match.path + "/log"} component={AdminLog} />
				<Route path={match.path + "/email"} component={EmailClubLeaders} />
				<Route path={match.path}>
					<Redirect to={tabs[0].path} />
				</Route>
			</Switch>
		</div>
	);
}
