import React from "react";
import { generatePath, Route, Switch } from "react-router-dom";
// import Catalog from "./organization/Catalog";
// import Charter from "./organization/Charter";
// import SelectedOrgRouter from "./organization/selectedOrganization/SelectedOrgRouter";
import { client } from "../context/ApolloProvider";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import Loading from "../ui/Loading";
import CharterTab from "./organization/CharterTab";
import Overview from "./organization/Overview";

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

	console.log(data);

	if (!data && loading) {
		return <Loading fullscreen />;
	}

	return (
		<div>
			{data.organization.name}
			<Switch>
				<Route path={match.path} component={Overview} />
				<Route path={match.path + "/charter"} component={CharterTab} />
			</Switch>
		</div>
	);
};

export default OrgRouter;
