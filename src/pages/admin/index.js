import React from "react";
import { Typography } from "@mui/material";
import { generatePath, Redirect, Route, Switch } from "react-router-dom";
import RouteTabs from "../../comps/ui/RouteTabs";
import Boograms from "./boograms";
import Approvals from "./approvals";
import UserContext from "../../comps/context/UserContext";
import SignInRequired from "../../comps/ui/SignInRequired";
import Strikes from "./Strikes";
import OrgApprovals from "./approvals/OrgApprovals";
import AdminLog from "./AdminLog";
import {
	AssignmentTurnedIn,
	EmailOutlined,
	Assignment,
	SmsFailed,
	AttachMoney,
	FeaturedPlayList
} from "@mui/icons-material";
import EmailClubLeaders from "./email";
import ManagePromotedClubs from "./promotedclub";
import Box from "@mui/material/Box";

const classes = {
	root: {
		margin: 3
	}
};

export default function AdminRouter({ match }) {
	const actualPath = generatePath(match.path, match.params);
	const user = React.useContext(UserContext);

	if (!user.signedIn) {
		return <SignInRequired />;
	}

	const adminRoles = user?.adminRoles || [];

	// Only show the user tabs they have permission to view
	const tabs = [
		{
			label: "Boograms",
			role: "boograms2022",
			path: actualPath + "/boograms",
			icon: <AttachMoney />
		},
		{
			label: "Charter Approvals",
			role: "charters",
			path: actualPath + "/approvals",
			icon: <AssignmentTurnedIn />
		},
		{
			label: "Strikes",
			role: "strikes",
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
		},
		{
			label: "Manage Featured Clubs",
			role: "promotedClubs",
			path: actualPath + "/promotedclubs",
			icon: <FeaturedPlayList />
		}
	].filter(tab => adminRoles.some(row => tab.role === row.role));

	if (!tabs.length) {
		return <p>You don't have access to this page</p>;
	}

	return (
		<Box sx={classes.root}>
			<Typography variant={"h3"}>Admin Panel</Typography>
			<RouteTabs tabs={tabs} />

			<Switch color="secondary">
				<Route path={match.path + "/boograms"} component={Boograms} exact />
				<Route path={match.path + "/approvals"} component={Approvals} exact />
				<Route path={match.path + "/approvals/:url"} component={OrgApprovals} />
				<Route path={match.path + "/strikes"} component={Strikes} />
				<Route path={match.path + "/log"} component={AdminLog} />
				<Route path={match.path + "/email"} component={EmailClubLeaders} />
				<Route path={match.path + "/promotedclubs"} component={ManagePromotedClubs} />
				<Route path={match.path}>
					<Redirect to={tabs[0].path} />
				</Route>
			</Switch>
		</Box>
	);
}
