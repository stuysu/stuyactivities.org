import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./ui/nav/Navigation";
import AuthDialog from "./auth/AuthDialog";
import OrgRouter from "./pages/organization/OrgRouter";
import Catalog from "./pages/catalog/Catalog";
import Charter from "./pages/charter/Charter";
import TokenLogin from "./pages/TokenLogin";
import Approvals from "./pages/admin/Approvals";
import SpecificApproval from "./pages/admin/SpecificApproval";

const Content = () => {
	return (
		<div>
			<Navigation />
			<AuthDialog />

			<Switch>
				<Route path={"/"} component={Home} exact />
				<Route path={"/catalog"} component={Catalog} exact />
				<Route path={"/charter"} component={Charter} exact />
				<Route path={"/token/:token"} component={TokenLogin} exact />
				<Route
					path={"/admin/approvals/:url"}
					component={SpecificApproval}
				/>
				<Route path={"/admin/approvals"} component={Approvals} />
				{/* temp change to test, sorry abir :( */}
				<Route path={"/:orgUrl"} component={OrgRouter} />
			</Switch>
		</div>
	);
};

export default Content;
