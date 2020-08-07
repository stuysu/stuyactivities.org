import React from "react";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "@apollo/client";

import { ApolloProvider as Provider } from "@apollo/react-hooks";

export const client = new ApolloClient({
	uri: "https://staging.stuyactivities.org/graphql",
	credentials: "include",
	cache: new InMemoryCache()
});

const ApolloProvider = props => {
	return <Provider client={client}>{props.children}</Provider>;
};

export default ApolloProvider;
