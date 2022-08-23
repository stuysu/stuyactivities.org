import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GOOGLE_CLIENT_ID } from "../../constants";
import Typography from "@mui/material/Typography";
import AuthContext from "./AuthContext";
import useScript from "../../utils/useScript";
import CircularProgress from "@mui/material/CircularProgress";

const LOGIN_WITH_GOOGLE = gql`
	mutation loginWithGoogle($token: String!) {
		login(googleToken: $token)
	}
`;

const GoogleLoginButton = ({ className }) => {
	const [loginWithGoogle, { error, loading }] = useMutation(LOGIN_WITH_GOOGLE);
	const scriptStatus = useScript("https://accounts.google.com/gsi/client");
	const ref = useRef(null);
	const [initialized, setInitialized] = useState(false);

	const authContext = React.useContext(AuthContext);

	const attemptLogin = React.useCallback(
		async ({ token, profile }) => {
			try {
				const { data } = await loginWithGoogle({ variables: { token } });
				window.localStorage.setItem("auth-jwt", data?.login);
				window.location.reload();
			} catch (er) {
				const possibleUnknownUserError = er?.graphQLErrors?.some(
					er => er?.extensions?.code === "POSSIBLE_UNKNOWN_USER"
				);

				if (possibleUnknownUserError) {
					authContext.set({
						page: "unrecognized",
						unrecognizedEmail: profile.email
					});
				}
			}
		},
		[loginWithGoogle, authContext]
	);

	useEffect(() => {
		const callback = ({ credential }) => {
			const profile = JSON.parse(atob(credential.split(".")[1]));

			attemptLogin({ token: credential, profile });
		};

		if (scriptStatus === "ready") {
			window.google.accounts.id.initialize({
				client_id: GOOGLE_CLIENT_ID,
				callback,
				cancel_on_tap_outside: true
			});

			window.google.accounts.id.prompt(notification => {
				if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
					// continue with another identity provider.
					console.log("One Tap isn't supported in this browser");
				}
			});
			setInitialized(true);
		}
	}, [attemptLogin, scriptStatus]);

	useEffect(() => {
		if (initialized && ref.current) {
			window.google.accounts.id.renderButton(ref.current, {
				type: "standard",
				size: "large"
			});
		}
	});

	return (
		<div>
			{loading ? <CircularProgress /> : <div style={{ display: "flex", justifyContent: "center" }} ref={ref} />}
			{error && (
				<Typography color={"error"} display={"block"}>
					{error?.graphQLErrors?.[0]?.message || error?.message || "Unknown error"}
				</Typography>
			)}
		</div>
	);
};

export default GoogleLoginButton;
