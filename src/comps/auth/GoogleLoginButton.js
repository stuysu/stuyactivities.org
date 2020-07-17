import React from "react";
import GoogleLogin from "react-google-login";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { GOOGLE_CLIENT_ID } from "../../constants";
import AppContext from "../context/AppContext";
import Typography from "@material-ui/core/Typography";

const LOGIN_WITH_GOOGLE = gql`
	mutation loginWithGoogle($token: String!) {
		login(with: { googleOAuthToken: $token }) {
			name
			email
			hasPassword
		}
	}
`;

const GoogleLoginButton = ({ className, setPage }) => {
	const [loginWithGoogle, { error, data, loading }] = useMutation(
		LOGIN_WITH_GOOGLE
	);
	const [token, setToken] = React.useState("");

	const possibleUnknownError = error?.graphQLErrors?.some(
		er => er?.extensions?.code === "POSSIBLE_UNKNOWN_USER"
	);

	const context = React.useContext(AppContext);

	const attemptLogin = React.useCallback(
		data => {
			setToken(data.idToken);

			loginWithGoogle({ variables: { token: data.tokenId } })
				.then(context.refetch)
				.catch(er => {
					console.log(JSON.parse(JSON.stringify(er)));
				});
		},
		[loginWithGoogle, context]
	);

	return (
		<div>
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Login with Google"
				onSuccess={attemptLogin}
				onFailure={console.log}
				disabled={loading}
				className={className}
			/>

			{error && (
				<Typography color={"error"} display={"block"}>
					{error?.graphQLErrors?.[0]?.message ||
						error?.message ||
						"Unknown error"}
				</Typography>
			)}
		</div>
	);
};

export default GoogleLoginButton;
