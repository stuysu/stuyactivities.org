import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./ui/nav/Navigation";
import AuthDialog from "./auth/AuthDialog";
import OrgRouter from "./pages/organization/OrgRouter";
import Catalog from "./pages/catalog/Catalog";
import Charter from "./pages/charter/Charter";
import TokenLogin from "./pages/TokenLogin";
import Approvals from "./pages/admin/Approvals";
import SpecificApproval from "./pages/admin/SpecificApproval";
import { Helmet } from "react-helmet";
import { PUBLIC_URL } from "../constants";

const Content = () => {
	const location = useLocation();

	return (
		<div>
			<Helmet>
				<meta
					property="og:url"
					content={PUBLIC_URL + location.pathname}
				/>
				<meta property="og:site_name" content={"StuyActivities"} />
				<meta property="og:type" content={"website"} />
				<meta
					property="og:description"
					content={
						"An app to help students navigate the clubs and organizations at Stuyvesant High School."
					}
				/>
				<meta
					property="og:image"
					content={PUBLIC_URL + "/img/logo512.png"}
				/>
				<title>StuyActivities</title>
			</Helmet>

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
