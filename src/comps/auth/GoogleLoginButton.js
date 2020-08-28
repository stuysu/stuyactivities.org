import React from "react";
import GoogleLogin from "react-google-login";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { GOOGLE_CLIENT_ID } from "../../constants";
import UserContext from "../context/UserContext";
import Typography from "@material-ui/core/Typography";
import AuthContext from "./AuthContext";

const LOGIN_WITH_GOOGLE = gql`
	mutation loginWithGoogle($token: String!) {
		login(googleToken: $token) {
			name
			email
		}
	}
`;

const GoogleLoginButton = ({ className }) => {
	const [loginWithGoogle, { error, loading }] = useMutation(
		LOGIN_WITH_GOOGLE
	);

	const authContext = React.useContext(AuthContext);

	const user = React.useContext(UserContext);

	const attemptLogin = React.useCallback(
		async data => {
			try {
				await loginWithGoogle({ variables: { token: data.tokenId } });
				user.refetch();
			} catch (er) {
				const possibleUnknownUserError = er?.graphQLErrors?.some(
					er => er?.extensions?.code === "POSSIBLE_UNKNOWN_USER"
				);

				if (possibleUnknownUserError) {
					authContext.set({
						page: "unrecognized",
						unrecognizedEmail: data?.profileObj?.email
					});
				}
			}
		},
		[loginWithGoogle, user, authContext]
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
