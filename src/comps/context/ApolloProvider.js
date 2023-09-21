import React from "react";
import { ApolloClient, ApolloLink, InMemoryCache, ApolloProvider as Provider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { GRAPHQL_URI } from "../../constants";

import { onError } from "@apollo/client/link/error";
import honeybadger from "../../utils/honeybadger";

export const cache = new InMemoryCache();

const authJWT = window.localStorage.getItem("auth-jwt");
const uploadLink = createUploadLink({
	uri: GRAPHQL_URI,
	credentials: "include",
	headers: {
		authorization: authJWT ? "Bearer " + authJWT : ""
	}
});

const unknownError =
	"There was an unknown error on the server. Rest assured it has been reported. Feel free to contact us at it@stuysu.org to provide more information.";

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(err => {
			if (err.message.includes(unknownError)) {
				return;
			}
			honeybadger.notify(err);
		});
	if (networkError) {
		honeybadger.notify(networkError);
	}
});

const link = ApolloLink.from([errorLink, uploadLink]);

export const client = new ApolloClient({
	link,
	cache
});

const ApolloProvider = props => {
	return <Provider client={client}>{props.children}</Provider>;
};

export default ApolloProvider;
