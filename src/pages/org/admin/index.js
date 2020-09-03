import React from "react";

import Members from "../../../comps/pages/organization/AdminPanelTabs/Members";
import Requests from "../../../comps/pages/organization/AdminPanelTabs/Requests";
import { generatePath, Redirect, Route, Switch } from "react-router-dom";
import RouteTabs from "../../../comps/ui/RouteTabs";
import UserContext from "../../../comps/context/UserContext";
import SignInRequired from "../../../comps/ui/SignInRequired";

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
		}
	];

	return (
		<div>
			<RouteTabs tabs={tabs} />

			<Switch>
				<Route path={match.path + "/members"} component={Members} />
				<Route path={match.path + "/requests"} component={Requests} />
				<Route path={match.path}>
					<Redirect to={actualMatch + "/members"} />
				</Route>
			</Switch>
		</div>
	);
}
