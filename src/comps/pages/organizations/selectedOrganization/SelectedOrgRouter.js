import React from "react";
import { Switch, Route } from "react-router-dom";
import CharterTab from "./CharterTab";
import MembersTab from "./MembersTab";

const SelectedOrgRouter = ({ match }) => {
	return (
		<div>
			<Switch>
				<Route path={match.path} component={CharterTab} exact />
				<Route
					path={match.path + "/members"}
					component={MembersTab}
					exact
				/>
			</Switch>
		</div>
	);
};

export default SelectedOrgRouter;
