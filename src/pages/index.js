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
	const location = useLocation(); // TODO

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
					<Switch color="secondary">
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/catalog">
							<Catalog />
						</Route>
						<Route exact path="/charter">
							<Charter />
						</Route>
						<Route path="/feedback">
							<FeedbackForm />
						</Route>
						<Route path="/my-meetings">
							<MyMeetings />
						</Route>
						<Route exact path="/token/:token">
							<TokenLogin />
						</Route>
						<Route path="/admin">
							<AdminRouter />
						</Route>
						<Route path="/rules">
							<Rules />
						</Route>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/explore">
							<Explore />
						</Route>
						<Route path="/clubpubfair2020">
							<ClubPubFair2020 />
						</Route>
						<Route path="/meetings">
							<Meetings />
						</Route>
						<Route path="/settings">
							<Settings />
						</Route>
						<Route
							path="/organizations/:orgUrl"
							render={() => <Redirect to={window.location.pathname.replace("/organizations/", "/")} />}
						/>
						<Route path={"/:orgUrl"}>
							<OrgRouter />
						</Route>
					</Switch>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Pages;
