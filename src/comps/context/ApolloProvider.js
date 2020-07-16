import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider as Provider } from "@apollo/react-hooks";

export const client = new ApolloClient({
	uri: "https://staging.stuyactivities.org/graphql",
	credentials: "include",
});

const ApolloProvider = props => {
	return <Provider client={client}>{props.children}</Provider>;
};

export default ApolloProvider;
