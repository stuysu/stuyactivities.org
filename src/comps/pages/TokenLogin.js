import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

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
		variables: { token }
	});

	React.useEffect(() => {
		login();
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
		return <p>{error?.message || "There was an unexpected error"}</p>;
	}

	return <p>Hold on while we sign you in...</p>;
};

export default TokenLogin;
