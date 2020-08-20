import React from "react";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "@apollo/client";

import { ApolloProvider as Provider } from "@apollo/react-hooks";
import { GRAPHQL_URI } from "../../constants";

export const cache = new InMemoryCache();

export const client = new ApolloClient({
	uri: GRAPHQL_URI,
	credentials: "include",
	cache
});

const ApolloProvider = props => {
	return <Provider client={client}>{props.children}</Provider>;
};

export default ApolloProvider;
