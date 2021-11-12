import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Navigation from "../comps/ui/nav/Navigation";
import AuthDialog from "../comps/auth/AuthDialog";
import { PUBLIC_URL } from "../constants";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import ReportDialog from "../comps/help/ReportDialog";
import ErrorBoundary from "../comps/ui/ErrorBoundary";
import Loading from "../comps/ui/Loading";

// Pages
import Home from "./Home";
import MeetingPreviewDialog from "../comps/meetings/MeetingPreviewDialog";
import Meetings from "./meetings";
const OrgRouter = lazy(() => import("./org"));
const Catalog = lazy(() => import("./catalog"));
const TokenLogin = lazy(() => import("./token"));
const AdminRouter = lazy(() => import("./admin"));
const Rules = lazy(() => import("./rules"));
const About = lazy(() => import("./about"));
const ClubPubFair2020 = lazy(() => import("./clubpubfair2020"));
const Charter = lazy(() => import("./charter"));
const FeedbackForm = lazy(() => import("./feedback"));
const Explore = lazy(() => import("./explore"));
const Settings = lazy(() => import("./settings"));
const MyMeetings = lazy(() => import("./mymeetings"));

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
			<MeetingPreviewDialog />
			<ReportDialog />
			<ErrorBoundary>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Route path={"/"} component={Home} exact />
						<Route path={"/catalog"} component={Catalog} exact />
						<Route path={"/charter"} component={Charter} exact />
						<Route path={"/feedback"} component={FeedbackForm} />
                        <Route path={"/my-meetings"} component={MyMeetings} />
						<Route path={"/token/:token"} component={TokenLogin} exact />
						<Route path={"/admin"} component={AdminRouter} />
						<Route path={"/rules"} component={Rules} />
						<Route path={"/about"} component={About} />
						<Route path={"/explore"} component={Explore} />
						<Route path={"/clubpubfair2020"} component={ClubPubFair2020} />
						<Route path={"/meetings"} component={Meetings} />
						<Route path={"/settings"} component={Settings} />
						<Route path={"/organizations/:orgUrl"}>
							<Redirect to={window.location.pathname.replace("/organizations/", "/")} />
						</Route>
						<Route path={"/:orgUrl"} component={OrgRouter} />
					</Switch>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Pages;
