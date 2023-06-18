import React from "react";

import Members from "./members";
import Requests from "./member-requests";
import { generatePath, Redirect, Route, Switch } from "react-router-dom";
import RouteTabs from "../../../comps/ui/RouteTabs";
import UserContext from "../../../comps/context/UserContext";
import SignInRequired from "../../../comps/ui/SignInRequired";
import CharterEdits from "./charter-edits";
import { Person, PersonAdd, Group, GroupWork, ListAlt, SmsFailed, PostAdd } from "@mui/icons-material";
import Meetings from "./meetings";
import Groups from "./groups";
import Strikes from "./Strikes";
import Updates from "./updates";
import { OrgContext } from "../index";
import { Typography } from "@mui/material";

export default function OrgAdminRouter({ match }) {
	const actualMatch = generatePath(match.path, match.params);
	const user = React.useContext(UserContext);
	const org = React.useContext(OrgContext);

	if (!user.signedIn) {
		return <SignInRequired />;
	}

	const tabs = [
		{
			path: actualMatch + "/members",
			label: "Members",
			icon: <Person />
		},
		{
			path: actualMatch + "/member-requests",
			label: "Member Requests",
			icon: <PersonAdd />
		},
		{
			path: actualMatch + "/meetings",
			label: "Meetings",
			icon: <GroupWork />
		},
		{
			path: actualMatch + "/posts",
			label: "Posts",
			icon: <PostAdd />
		},
		{
			path: actualMatch + "/groups",
			label: "Groups",
			icon: <Group />
		},
		{
			path: actualMatch + "/strikes",
			label: "Strikes",
			icon: <SmsFailed />
		},
		{
			path: actualMatch + "/charter-edits",
			label: "Charter",
			icon: <ListAlt />
		}
	];

	return (
		<div>
			{org?.membership?.adminPrivileges ? (
				<div>
					<RouteTabs tabs={tabs} />
					<Switch color="secondary">
						<Route path={match.path + "/members"} children={({ match }) => <Members match={match} />} />
						<Route path={match.path + "/member-requests"}>
							<Requests />
						</Route>
						<Route path={match.path + "/meetings"} children={({ match }) => <Meetings match={match} />} />
						<Route path={match.path + "/posts"}>
							<Updates />
						</Route>
						<Route path={match.path + "/groups"} children={({ match }) => <Groups match={match} />} />
						<Route path={match.path + "/strikes"} children={({ match }) => <Strikes match={match} />} />
						<Route path={match.path + "/charter-edits"}>
							<CharterEdits />
						</Route>
						<Route path={match.path} render={() => <Redirect to={actualMatch + "/members"} />} />
					</Switch>
				</div>
			) : (
				<Typography
					variant={"h2"}
					align={"center"}
					style={{ maxWidth: "40em", margin: "auto", display: "block" }}
				>
					You are not an admin of this club, so you may not access the admin panel!
				</Typography>
			)}
		</div>
	);
}
