import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider as Provider } from "@apollo/react-hooks";
import { GRAPHQL_URI } from "../../constants";

export const cache = new InMemoryCache();

const link = createUploadLink({ uri: GRAPHQL_URI, credentials: "include" });

export const client = new ApolloClient({
	link,
	cache
});

const ApolloProvider = props => {
	return <Provider client={client}>{props.children}</Provider>;
};

export default ApolloProvider;
