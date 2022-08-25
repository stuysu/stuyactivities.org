import React from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { client } from "../comps/context/ApolloProvider";
import FlexCenter from "../comps/ui/FlexCenter";
import { Typography } from "@mui/material";
import handstandVector from "../img/vectors/clip-dancer.svg";
import ghost from "../img/vectors/hugo-ghost.svg";
import BackButton from "../comps/ui/BackButton";
import Loading from "../comps/ui/Loading";
import UserContext from "../comps/context/UserContext";
import Box from "@mui/material/Box";

const classes = {
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
};

const MUTATION = gql`
	mutation Login($token: String!) {
		login(loginToken: $token)
	}
`;

const TokenLogin = () => {
	const user = React.useContext(UserContext);
	const { token } = useParams();

	const [login, { error, data }] = useMutation(MUTATION, {
		variables: { token },
		client
	});

	const attemptLogin = React.useCallback(() => {
		if (!data) {
			login()
				.then(() => user.refetch())
				.catch(e => {});
		}
	}, [login, user, data]);

	React.useEffect(attemptLogin, [attemptLogin]);

	if (data) {
		return (
			<FlexCenter>
				<Box sx={classes.contentContainer}>
					<Box component="img" src={handstandVector} alt={"A person dancing"} sx={classes.defaultVector} />

					<br />
					<Typography variant={"h5"}>You are now signed in as {user.name}!</Typography>

					<br />

					<FlexCenter>
						<BackButton
							to={"/"}
							variant={"contained"}
							color={"secondary"}
							arrow={false}
							label={"Go To The Home Page"}
						/>
					</FlexCenter>
				</Box>
			</FlexCenter>
		);
	}

	if (error) {
		const errorMessage = error?.graphQLErrors?.[0]?.message || error?.message || "Unknown error";

		return (
			<FlexCenter>
				<Box sx={classes.contentContainer}>
					<FlexCenter>
						<Box component="img" sx={classes.defaultVector} src={ghost} alt={"child in a ghost costume"} />
					</FlexCenter>
					<Typography variant={"subtitle1"} color={"error"}>
						{errorMessage}
					</Typography>
					<BackButton to={"/"} color={"secondary"} label={"Go To The Home Page"} arrow={false} />
				</Box>
			</FlexCenter>
		);
	}

	return (
		<FlexCenter>
			<Box sx={classes.contentContainer}>
				<Loading />
				<Typography paragraph>Please wait while we sign you in</Typography>
			</Box>
		</FlexCenter>
	);
};

export default TokenLogin;
