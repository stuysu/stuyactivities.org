import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./ui/nav/Navigation";
import AuthDialog from "./auth/AuthDialog";
import OrgRouter from "./pages/organization/OrgRouter";
import Catalog from "./pages/catalog/Catalog";
import Charter from "./pages/charter/Charter";
import TokenLogin from "./pages/TokenLogin";
import AdminMain from "./pages/admin/AdminMain";
import SpecificApproval from "./pages/admin/SpecificApproval";
import Rules from "./pages/Rules";
import { Helmet } from "react-helmet";
import { PUBLIC_URL } from "../constants";
import About from "./pages/About";
import ReactGA from "react-ga";
import suLogo from "./../img/su-logo512.png";

ReactGA.initialize("UA-119929576-2");

const Content = () => {
	const location = useLocation();

	React.useEffect(() => {
		ReactGA.pageview(location.pathname + location.search);
	}, [location]);

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
				<meta property="og:image" content={suLogo} />
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
				<Route path={"/admin"} component={AdminMain} />
				<Route path={"/rules"} component={Rules} />
				<Route path={"/about"} component={About} />

				<Route path={"/organizations/:orgUrl"}>
					<Redirect
						to={window.location.pathname.replace(
							"/organizations/",
							"/"
						)}
					/>
				</Route>
				<Route path={"/:orgUrl"} component={OrgRouter} />
			</Switch>
		</div>
	);
};

export default Content;
