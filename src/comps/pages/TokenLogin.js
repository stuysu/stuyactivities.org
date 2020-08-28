import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { client } from "../context/ApolloProvider";
import FlexCenter from "../ui/FlexCenter";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import handstandVector from "./../../img/vectors/clip-dancer.svg";
import ghost from "./../../img/vectors/hugo-ghost.svg";
import LinkGoogleAccount from "../auth/LinkGoogleAccount";
import BackButton from "../ui/BackButton";
import Loading from "../ui/Loading";
import UserContext from "../context/UserContext";

const useStyles = makeStyles({
	contentContainer: {
		textAlign: "center",
		width: "800px",
		maxWidth: "100vw",
		padding: "1rem"
	},
	defaultVector: {
		maxWidth: "85%",
		width: "400px"
	},
	googleButton: {
		margin: "1rem"
	}
});

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
	const classes = useStyles();
	const user = React.useContext(UserContext);
	const { token } = useParams();

	const [login, { error, data }] = useMutation(MUTATION, {
		variables: { token },
		client
	});

	const attemptLogin = React.useCallback(() => {
		login()
			.then(() => user.refetch())
			.catch(e => {});
	}, [user, login]);

	React.useEffect(attemptLogin, []);

	if (data) {
		const linkedGoogleAccount = data?.login?.oAuths?.find(
			auth => auth.platform === "google"
		);

		return (
			<FlexCenter>
				<div className={classes.contentContainer}>
					<img
						src={handstandVector}
						alt={"A person dancing"}
						className={classes.defaultVector}
					/>

					<br />
					<Typography variant={"h5"}>
						You are now signed in as {data?.login?.name}!
					</Typography>

					<br />
					<div>
						{linkedGoogleAccount ? (
							<>
								<Typography paragraph>
									It looks like you've linked your Google
									account {linkedGoogleAccount.platformEmail}{" "}
									to your StuyActivities account in the past.
								</Typography>
								<Typography paragraph>
									Just a reminder that you can always use that
									account to sign in as well.
								</Typography>
							</>
						) : (
							<div>
								<Typography paragraph>
									You can link your Google account to your
									StuyActivities account to make future logins
									much easier!
								</Typography>
								<LinkGoogleAccount
									className={classes.googleButton}
								/>
							</div>
						)}
					</div>

					<FlexCenter>
						<BackButton
							to={"/"}
							variant={"contained"}
							color={"secondary"}
							arrow={false}
							label={"Go To The Home Page"}
						/>
					</FlexCenter>
				</div>
			</FlexCenter>
		);
	}

	if (error) {
		const errorMessage =
			error?.graphQLErrors?.[0]?.message ||
			error?.message ||
			"Unknown error";

		return (
			<FlexCenter>
				<div className={classes.contentContainer}>
					<FlexCenter>
						<img
							className={classes.defaultVector}
							src={ghost}
							alt={"child in a ghost costume"}
						/>
					</FlexCenter>
					<Typography variant={"subtitle1"} color={"error"}>
						{errorMessage}
					</Typography>
					<BackButton
						to={"/"}
						color={"secondary"}
						label={"Go To The Home Page"}
						arrow={false}
					/>
				</div>
			</FlexCenter>
		);
	}

	return (
		<FlexCenter>
			<div className={classes.contentContainer}>
				<Loading />
				<Typography paragraph>
					Please wait while we sign you in
				</Typography>
			</div>
		</FlexCenter>
	);
};

export default TokenLogin;
