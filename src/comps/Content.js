import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./ui/Navigation";
import AuthDialog from "./auth/AuthDialog";
import OrgRouter from "./pages/OrgRouter";
import Catalog from "./pages/catalog/Catalog";
import Charter from "./pages/charter/Charter";

const Content = () => {
	return (
		<div>
			<Navigation />

			{/*Only have the login dialog present if the user is not signed in*/}

			<AuthDialog />
			<Switch>
				<Route path={"/"} component={Home} exact />
				<Route path={"/catalog"} component={Catalog} exact />
				<Route path={"/charter"} component={Charter} exact />
				<Route path={"/:orgUrl"} component={OrgRouter} />
			</Switch>
		</div>
	);
};

export default Content;
