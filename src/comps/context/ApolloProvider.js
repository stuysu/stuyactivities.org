import { ApolloClient, ApolloLink, ApolloProvider as Provider, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { GRAPHQL_URI } from "../../constants";
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) graphQLErrors.forEach(err => honeybadger.notify(err));
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
