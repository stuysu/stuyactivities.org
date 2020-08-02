import React from "react";
import { Route, Switch } from "react-router-dom";
import Catalog from "./organizations/Catalog";
import Charter from "./organizations/Charter";
import SelectedOrgRouter from "./organizations/selectedOrganization/SelectedOrgRouter";

const OrgsRouter = ({ match }) => {
	return (
		<div>
			<Switch>
				<Route path={match.path} component={Catalog} exact />
				<Route
					path={match.path + "/create"}
					component={Charter}
					exact
				/>

				<Route
					path={match.path + "/:url"}
					component={SelectedOrgRouter}
				/>
			</Switch>
		</div>
	);
};

export default OrgsRouter;
