import React from "react";
import { generatePath, Route, Switch } from "react-router-dom";

import { client } from "../../context/ApolloProvider";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import Loading from "../../ui/Loading";
import CharterTab from "./CharterTab";
import Overview from "./Overview";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import OrgNavPanel from "./OrgNavPanel";
import BackButton from "../../ui/BackButton";

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

const QUERY = gql`
	query Organization($url: String!) {
		organization(url: $url) {
			name
			url
			charter {
				picture
			}
		}
	}
`;

const OrgRouter = ({ match, history }) => {
	const classes = useStyles();
	const url = match.params.orgUrl;

	const { data, loading } = useQuery(QUERY, {
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

	if (!data.organization) {
		return <p>We couldn't find that url :(</p>;
	}

	return (
		<div>
			<Helmet>
				<title>{data?.organization?.name} | StuyActivities </title>
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
						</Switch>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default OrgRouter;