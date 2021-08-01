import { gql, useMutation } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import React from "react";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../constants";
import AuthContext from "./AuthContext";

const LOGIN_WITH_GOOGLE = gql`
	mutation loginWithGoogle($token: String!) {
		login(googleToken: $token)
	}
`;

const GoogleLoginButton = ({ className }) => {
	const [loginWithGoogle, { error, loading }] = useMutation(LOGIN_WITH_GOOGLE);

	const authContext = React.useContext(AuthContext);

	const attemptLogin = React.useCallback(
		async payload => {
			try {
				const { data } = await loginWithGoogle({ variables: { token: payload.tokenId } });
				window.localStorage.setItem("auth-jwt", data?.login);
				window.location.reload();
			} catch (er) {
				const possibleUnknownUserError = er?.graphQLErrors?.some(
					er => er?.extensions?.code === "POSSIBLE_UNKNOWN_USER"
				);

				if (possibleUnknownUserError) {
					authContext.set({
						page: "unrecognized",
						unrecognizedEmail: payload?.profileObj?.email
					});
				}
			}
		},
		[loginWithGoogle, authContext]
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
					{error?.graphQLErrors?.[0]?.message || error?.message || "Unknown error"}
				</Typography>
			)}
		</div>
	);
};

export default GoogleLoginButton;
