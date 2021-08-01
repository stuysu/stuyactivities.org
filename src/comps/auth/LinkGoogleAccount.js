import { gql, useMutation } from "@apollo/client";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../constants";

const MUTATION = gql`
	mutation LinkGoogle($token: String!) {
		linkOAuthPlatform(platform: "google", token: $token) {
			platformEmail
		}
	}
`;

const useStyles = makeStyles({
	text: {
		textAlign: "center"
	}
});

const LinkGoogleAccount = ({ className }) => {
	const classes = useStyles();
	const [linkGoogleAccount, { error, data }] = useMutation(MUTATION);
	const [success, setSuccess] = React.useState(false);

	const handleGoogleSuccess = async user => {
		try {
			await linkGoogleAccount({ variables: { token: user.tokenId } });
			setSuccess(true);
		} catch (e) {}
	};

	if (success) {
		return (
			<div className={className}>
				<Typography paragraph color={"secondary"}>
					Your Google account {data?.linkOAuthProvider?.platformEmail} has been successfully linked to your
					StuyActivities account!
				</Typography>
			</div>
		);
	}

	return (
		<div className={className}>
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				onSuccess={handleGoogleSuccess}
				onFailure={console.log}
				buttonText={"Link Your Google Account"}
			/>
			<br />
			{error && (
				<Typography paragraph color={"error"} className={classes.text}>
					{error?.graphQLErrors?.[0]?.message || error?.message || "Unknown error"}
				</Typography>
			)}
		</div>
	);
};

export default LinkGoogleAccount;
