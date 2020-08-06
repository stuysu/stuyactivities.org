import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { client } from "../context/ApolloProvider";

const MUTATION = gql`
	mutation Login($token: String!) {
		login(loginToken: $token) {
			name
			email
			oAuths {
				platform
				platformEmail
			}
		}
	}
`;

const TokenLogin = () => {
	const { token } = useParams();

	const [login, { error, data }] = useMutation(MUTATION, {
		variables: { token },
		client
	});

	React.useEffect(() => {
		// We don't have to do anything with it
		// The .finally() is just so that react doesn't throw back the uncaught promise if there is an error
		login().catch(e => {});
	}, [login]);

	if (data) {
		const googleAccountIsLinked = data?.login?.oAuths?.map(
			auth => auth.platform === "google"
		);

		return (
			<p>
				You are now signed in as {data?.login?.name}.{" "}
				{googleAccountIsLinked
					? "All set"
					: "You need to link your google account"}
			</p>
		);
	}

	if (error) {
		return (
			<p>
				{error?.graphQLErrors?.[0]?.message ||
					error?.message ||
					"Unknown error"}
			</p>
		);
	}

	return <p>Hold on while we sign you in...</p>;
};

export default TokenLogin;
