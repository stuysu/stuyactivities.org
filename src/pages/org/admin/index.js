import React from "react";

import Members from "./members";
import Requests from "./member-requests";
import { generatePath, Redirect, Route, Switch } from "react-router-dom";
import RouteTabs from "../../../comps/ui/RouteTabs";
import UserContext from "../../../comps/context/UserContext";
import SignInRequired from "../../../comps/ui/SignInRequired";
import CharterEdits from "./charter-edits";
import Meetings from "./meetings";
import { Group, GroupAdd, GroupWork, ListAlt, PostAdd } from "@material-ui/icons";
import ClubFair from "./club-fair";
import Updates from "./updates";

export default function OrgAdminRouter({ match }) {
	const actualMatch = generatePath(match.path, match.params);
	const user = React.useContext(UserContext);

	if (!user.signedIn) {
		return <SignInRequired />;
	}

	const tabs = [
		{
			path: actualMatch + "/members",
			label: "Members",
			icon: <Group />
		},
		{
			path: actualMatch + "/member-requests",
			label: "Member Requests",
			icon: <GroupAdd />
		},
		{
			path: actualMatch + "/charter-edits",
			label: "Charter",
			icon: <ListAlt />
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
		}
	];

	return (
		<div>
			<RouteTabs tabs={tabs} />

			<Switch>
				<Route path={match.path + "/members"} component={Members} />
				<Route path={match.path + "/member-requests"} component={Requests} />
				<Route path={match.path + "/charter-edits"} component={CharterEdits} />
				<Route path={match.path + "/meetings"} component={Meetings} />
				<Route path={match.path + "/club-fair"} component={ClubFair} />
				<Route path={match.path + "/posts"} component={Updates} />
				<Route path={match.path}>
					<Redirect to={actualMatch + "/members"} />
				</Route>
			</Switch>
		</div>
	);
}
