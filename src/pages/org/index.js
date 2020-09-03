import React from "react";
import { generatePath, Route, Switch } from "react-router-dom";

import { client } from "../../comps/context/ApolloProvider";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import Loading from "../../comps/ui/Loading";
import CharterTab from "../../comps/pages/organization/CharterTab";
import Overview from "../../comps/pages/organization/Overview";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import OrgNavPanel from "../../comps/pages/organization/OrgNavPanel";
import BackButton from "../../comps/ui/BackButton";
import MembersTab from "../../comps/pages/organization/MembersTab";
import Error404 from "../Error404";

import OrgAdminRouter from "./admin";
import Join from "../../comps/pages/organization/Join";
import UserContext from "../../comps/context/UserContext";

const useStyles = makeStyles(theme => ({
	contentContainer: {
		padding: "2.5vw",
		paddingTop: "2.5vh",
		width: "100%"
	},
	backButton: {
		marginBottom: theme.spacing(5)
	}
}));

export const OrgContext = React.createContext({});

const getQuery = signedIn => {
	return gql`
		query Organization($url: String!) {
			organization(url: $url) {
				id
				active
				name
				url
				charter {
					mission
					meetingSchedule
					picture
				}
				leaders: memberships(onlyLeaders: true) {
					id
					user {
						id
						name
						${signedIn ? "email" : ""}
						picture
					}
					role
				}
				upcomingMeetings {
					id
					title
					description
					start
					end
				}
				membership {
					id
					role
					adminPrivileges
				}
				membershipRequest {
					id
					role
					userMessage
					adminApproval
					adminMessage
					userApproval
					createdAt
				}
			}
		}
	`;
};

const OrgRouter = ({ match, history }) => {
	const user = React.useContext(UserContext);

	const classes = useStyles();
	const url = match.params.orgUrl;

	const { data, loading, refetch } = useQuery(getQuery(user.signedIn), {
		variables: { url },
		client
	});

	React.useEffect(() => {
		// If capitalization or something is wrong in the url, fix it
		if (data) {
			const actualOrgUrl = data?.organization?.url;

			if (actualOrgUrl && match.params.orgUrl !== actualOrgUrl) {
				const params = { ...match.params, orgUrl: actualOrgUrl };

				const realPath = window.location.pathname.replace(
					match.url,
					generatePath(match.path, params)
				);
				history.push(realPath);
			}
		}
	}, [data, history, match.params, match.path, match.url]);

	if (!data && loading) {
		return <Loading fullscreen />;
	}

	if (!data?.organization) {
		return <Error404 />;
	}

	return (
		<OrgContext.Provider value={{ ...data.organization, refetch }}>
			<div>
				<Helmet>
					<title>{data?.organization?.name} | StuyActivities</title>
					<meta
						property="og:description"
						content={
							data?.organization?.charter?.mission ||
							`${data?.organization?.name} - An activity at Stuyvesant High School`
						}
					/>
					<meta
						property="og:image"
						content={data?.organization?.charter?.picture}
					/>
				</Helmet>

				<div className={classes.contentContainer}>
					<BackButton
						className={classes.backButton}
						label={"Back to Catalog"}
						to={"/catalog"}
					/>

					<Grid container spacing={1}>
						<Grid item xs={12} sm={12} xl={2} md={3} lg={2}>
							<OrgNavPanel
								match={match}
								organization={data.organization}
							/>
						</Grid>

						<Grid item lg={10} md={9} xl={10} sm={12}>
							<Switch>
								<Route
									path={match.path}
									component={Overview}
									exact
								/>
								<Route
									path={match.path + "/charter"}
									component={CharterTab}
								/>
								<Route
									path={match.path + "/members"}
									component={MembersTab}
								/>
								<Route
									path={match.path + "/admin"}
									component={OrgAdminRouter}
								/>
								<Route
									path={match.path + "/join"}
									component={Join}
								/>
							</Switch>
						</Grid>
					</Grid>
				</div>
			</div>
		</OrgContext.Provider>
	);
};

export default OrgRouter;
