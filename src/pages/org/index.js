import React from "react";
import { generatePath, Route, Switch } from "react-router-dom";

import { client } from "../../comps/context/ApolloProvider";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Loading from "../../comps/ui/Loading";
import Charter from "./charter";
import Overview from "./overview";
import Meetings from "./meetings";
import Groups from "./groups";
import { Helmet } from "react-helmet";

import Grid from "@mui/material/Grid";

import OrgNavPanel from "../../comps/pages/organization/OrgNavPanel";
import BackButton from "../../comps/ui/BackButton";
import Members from "./members";
import Error404 from "../error404";
import OrgAdminRouter from "./admin";
import UserContext from "../../comps/context/UserContext";

import styles from "./../../Globals.module.css";

const classes = {
	backButton: {
		marginBottom: 5
	}
};

export const OrgContext = React.createContext({});

const QUERY = gql`
	query Organization($url: String!, $signedIn: Boolean!) {
		organizationByUrl(url: $url) {
			id
			active
			name
			url
			tags {
				id
			}
			charter {
				mission
				meetingSchedule
				picture {
					url
					icon: url(width: 200, height: 200, crop: thumb, gravity: center)
					thumbnail(width: 80, height: 80)
					tinyThumbnail: thumbnail(width: 40, height: 40)
				}
				socials
			}
			updates {
				id
				title
				content
				createdAt
				questions {
					id
					submittingUser {
						name
						picture
					}
					private
					question
					answer
				}
			}
			leaders: memberships(onlyLeaders: true) {
				id
				user {
					id
					name
					email @include(if: $signedIn)
					picture
				}
				role
			}
			upcomingMeetings {
				id
				title
				description
				start
				privacy
				rooms {
					name
					id
					floor
				}
				group {
					id
					name
				}
				end
			}
			meetings {
				id
				title
				description
				start
				rooms {
					id
					name
					floor
				}
				privacy
				end
			}
			groups {
				id
				name
			}
			recurringMeetings {
				id
				title
				description
				start
				end
				privacy
				frequency
				dayOfWeek
			}
			membership {
				id
				role
				adminPrivileges
				createdAt
			}
			memberships {
				user {
					id
				}
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
			joinInstructions {
				instructions
				buttonEnabled
			}
		}
	}
`;

const OrgRouter = ({ match, history }) => {
	const user = React.useContext(UserContext);

	const url = match.params.orgUrl;

	const { data, loading, refetch } = useQuery(QUERY, {
		variables: { url, signedIn: user.signedIn },
		client
	});

	React.useEffect(() => {
		// If capitalization or something is wrong in the url, fix it
		if (data) {
			const actualOrgUrl = data?.organizationByUrl?.url;

			if (actualOrgUrl && match.params.orgUrl !== actualOrgUrl) {
				const params = { ...match.params, orgUrl: actualOrgUrl };

				const realPath = window.location.pathname.replace(match.url, generatePath(match.path, params));
				history.push(realPath);
			}
		}
	}, [data, history, match.params, match.path, match.url]);

	if (!data && loading) {
		return <Loading fullscreen />;
	}

	if (!data?.organizationByUrl) {
		return <Error404 />;
	}

	return (
		<OrgContext.Provider value={{ ...data.organizationByUrl, refetch }}>
			<div>
				<Helmet>
					<title>{data?.organizationByUrl?.name} | StuyActivities</title>
					<meta property="og:title" content={`${data?.organizationByUrl?.name} | StuyActivities`} />
					<meta
						property="og:description"
						content={
							data?.organizationByUrl?.charter?.mission ||
							`${data?.organizationByUrl?.name} - An activity at Stuyvesant High School`
						}
					/>
					<meta property="og:image" content={data?.organizationByUrl?.charter?.picture?.url} />
				</Helmet>

				<div className={styles.contentContainer}>
					<BackButton sx={classes.backButton} label={"Back to Catalog"} to={"/catalog"} />

					<Grid container spacing={1}>
						<Grid item xs={12} sm={12} xl={2} md={3} lg={2}>
							<OrgNavPanel match={match} organization={data.organizationByUrl} />
						</Grid>

						<Grid item lg={10} md={9} xl={10} sm={12} xs={12}>
							<div>
								<Switch color="secondary">
									<Route exact path={match.path}>
										<Overview />
									</Route>
									<Route path={match.path + "/charter"}>
										<Charter />
									</Route>
									<Route path={match.path + "/members"}>
										<Members />
									</Route>
									<Route path={match.path + "/groups"}>
										<Groups />
									</Route>
									<Route
										path={match.path + "/admin"}
										children={({ match }) => <OrgAdminRouter match={match} />}
									/>
									<Route path={match.path + "/meetings"}>
										<Meetings />
									</Route>
								</Switch>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</OrgContext.Provider>
	);
};

export default OrgRouter;
