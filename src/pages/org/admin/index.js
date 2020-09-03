import React from "react";

import Members from "./Members";
import Requests from "./MemberRequests";
import { generatePath, Redirect, Route, Switch } from "react-router-dom";
import RouteTabs from "../../../comps/ui/RouteTabs";
import UserContext from "../../../comps/context/UserContext";
import SignInRequired from "../../../comps/ui/SignInRequired";
import CharterEdits from "./CharterEdits";

export default function OrgAdminRouter({ match }) {
	const actualMatch = generatePath(match.path, match.params);
	const user = React.useContext(UserContext);

	if (!user.signedIn) {
		return <SignInRequired />;
	}

	const tabs = [
		{
			path: actualMatch + "/members",
			label: "Members"
		},
		{
			path: actualMatch + "/requests",
			label: "Member Requests"
		},
		{
			path: actualMatch + "/charter-edits",
			label: "Charter Edits"
		}
	];

	return (
		<div>
			<RouteTabs tabs={tabs} />

			<Switch>
				<Route path={match.path + "/members"} component={Members} />
				<Route path={match.path + "/requests"} component={Requests} />
				<Route
					path={match.path + "/charter-edits"}
					component={CharterEdits}
				/>
				<Route path={match.path}>
					<Redirect to={actualMatch + "/members"} />
				</Route>
			</Switch>
		</div>
	);
}
