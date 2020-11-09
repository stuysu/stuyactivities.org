import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Navigation from "../comps/ui/nav/Navigation";
import AuthDialog from "../comps/auth/AuthDialog";
import { PUBLIC_URL } from "../constants";
import { Helmet } from "react-helmet";

// Pages
import Home from "./Home";
import OrgRouter from "./org";
import Catalog from "./catalog";
import TokenLogin from "./token";
import AdminRouter from "./admin";
import Rules from "./rules";
import About from "./about";
import ClubPubFair from "./clubpubfair";
import Charter from "./charter";

import ReactGA from "react-ga";
import Explore from "./explore";
import ReportDialog from "../comps/help/ReportDialog";

ReactGA.initialize("UA-119929576-2");

const Pages = () => {
	const location = useLocation();

	React.useEffect(() => {
		ReactGA.pageview(location.pathname + location.search);
	}, [location]);

	return (
		<div>
			<Helmet>
				<meta property="og:url" content={PUBLIC_URL + location.pathname} />
				<meta property="og:site_name" content={"StuyActivities"} />
				<meta property="og:type" content={"website"} />
				<meta
					property="og:description"
					content={"An app to help students navigate the clubs and organizations at Stuyvesant High School."}
				/>
				<meta property="og:image" content={PUBLIC_URL + "/img/logo192.png"} />
				<meta property={"og:title"} content={"StuyActivities"} />
				<title>StuyActivities</title>
			</Helmet>

			<Navigation />
			<AuthDialog />
			<ReportDialog />
			<Switch>
				<Route path={"/"} component={Home} exact />
				<Route path={"/catalog"} component={Catalog} exact />
				<Route path={"/charter"} component={Charter} exact />
				<Route path={"/token/:token"} component={TokenLogin} exact />
				<Route path={"/admin"} component={AdminRouter} />
				<Route path={"/rules"} component={Rules} />
				<Route path={"/about"} component={About} />
				<Route path={"/explore"} component={Explore} />
				<Route path={"/clubpubfair"} component={ClubPubFair} />

				<Route path={"/organizations/:orgUrl"}>
					<Redirect to={window.location.pathname.replace("/organizations/", "/")} />
				</Route>
				<Route path={"/:orgUrl"} component={OrgRouter} />
			</Switch>
		</div>
	);
};

export default Pages;
