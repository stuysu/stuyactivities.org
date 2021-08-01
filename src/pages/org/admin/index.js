import { Typography } from "@material-ui/core";
import { Group, GroupAdd, GroupWork, ListAlt, LocalActivity, PostAdd, SmsFailed } from "@material-ui/icons";
import React from "react";
import { generatePath, Redirect, Route, Switch } from "react-router-dom";
import UserContext from "../../../comps/context/UserContext";
import RouteTabs from "../../../comps/ui/RouteTabs";
import SignInRequired from "../../../comps/ui/SignInRequired";
import { OrgContext } from "../index";
import CharterEdits from "./charter-edits";
import ClubFair from "./club-fair";
import Meetings from "./meetings";
import Requests from "./member-requests";
import Members from "./members";
import Strikes from "./Strikes";
import Updates from "./updates";

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
			path: actualMatch + "/club-fair",
			label: "Club Fair",
			icon: <LocalActivity />
		},
		{
			path: actualMatch + "/posts",
			label: "Posts",
			icon: <PostAdd />
		},
		{
			path: actualMatch + "/strikes",
			label: "Strikes",
			icon: <SmsFailed />
		}
	];

	return (
		<div>
			{org?.membership?.adminPrivileges ? (
				<div>
					<RouteTabs tabs={tabs} />
					<Switch>
						<Route path={match.path + "/members"} component={Members} />
						<Route path={match.path + "/member-requests"} component={Requests} />
						<Route path={match.path + "/charter-edits"} component={CharterEdits} />
						<Route path={match.path + "/meetings"} component={Meetings} />
						<Route path={match.path + "/club-fair"} component={ClubFair} />
						<Route path={match.path + "/posts"} component={Updates} />
						<Route path={match.path + "/strikes"} component={Strikes} />
						<Route path={match.path}>
							<Redirect to={actualMatch + "/members"} />
						</Route>
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
