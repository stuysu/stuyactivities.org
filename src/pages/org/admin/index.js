import React from "react";

import Members from "./Members";
import Requests from "./MemberRequests";
import { generatePath, Redirect, Route, Switch } from "react-router-dom";
import RouteTabs from "../../../comps/ui/RouteTabs";
import UserContext from "../../../comps/context/UserContext";
import SignInRequired from "../../../comps/ui/SignInRequired";
import CharterEdits from "./CharterEdits";
import Meetings from "./Meetings";
import { Group, GroupAdd, GroupWork, ListAlt, LocalActivity } from "@material-ui/icons";
import ClubFair from "./club-fair";

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
			path: actualMatch + "/requests",
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
			path: actualMatch + "/club-fair",
			label: "Club Fair",
			icon: <LocalActivity />
		}
	];

	return (
		<div>
			<RouteTabs tabs={tabs} />

			<Switch>
				<Route path={match.path + "/members"} component={Members} />
				<Route path={match.path + "/requests"} component={Requests} />
				<Route path={match.path + "/charter-edits"} component={CharterEdits} />
				<Route path={match.path + "/meetings"} component={Meetings} />
				<Route path={match.path + "/club-fair"} component={ClubFair} />
				<Route path={match.path}>
					<Redirect to={actualMatch + "/members"} />
				</Route>
			</Switch>
		</div>
	);
}
