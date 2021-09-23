import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OrgContext } from "../../../pages/org/index";
import joinVector from "../../../img/vectors/undraw_join.svg";
import TextField from "@material-ui/core/TextField";
import { gql, useMutation } from "@apollo/client";
import { cache } from "../../context/ApolloProvider";

import moment from "moment-timezone";
import UserContext from "../../context/UserContext";
import SignInRequired from "../../ui/SignInRequired";

// import musicBand from "./../../../img/vectors/pablita-music-band.svg";

//styles
const useStyles = makeStyles(theme => ({
	tabName: {
		textAlign: "center"
	},
	charterAnswer: {
		marginBottom: "1.5rem"
	},
	vector: {
		maxWidth: "30vw",
		width: "300px",
		maxHeight: "20vh",
		margin: "0.5rem"
	},
	tabContainer: {
		padding: "1rem",
		textAlign: "center"
	},
	note: {
		width: "400px",
		maxWidth: "90vw",
		marginBottom: "1.5rem"
	}
}));

const CREATE = gql`
	mutation ($message: String, $orgId: Int!) {
		createMembershipRequest(orgId: $orgId, message: $message) {
			id
		}
	}
`;

const CreateRequest = () => {
	const classes = useStyles();
	const org = React.useContext(OrgContext);
	const [message, setMessage] = React.useState("");
	const user = React.useContext(UserContext);

	const [submit, { error }] = useMutation(CREATE, {
		variables: {
			message,
			orgId: org.id
		}
	});

	if (!user.signedIn) {
		return <SignInRequired />;
	}

	const onSubmit = () => {
		submit()
			.then(() => cache.reset())
			.then(() => org.refetch())
			.catch(console.log);
	};

	return (
		<>
			<div>
				<img src={joinVector} alt={"Friends helping each other up a window."} className={classes.vector} />
			</div>

			<p>
				{org?.joinInstructions?.instructions
					? "Join instructions: " + org.joinInstructions.instructions
					: "Do you want to add a note to your request?"}
			</p>
			{(org?.joinInstructions === null || org?.joinInstructions.buttonEnabled) && (
				<>
					<TextField
						multiline
						rows={3}
						variant={"outlined"}
						label={"Optional Note"}
						className={classes.note}
						value={message}
						onChange={ev => setMessage(ev.target.value)}
					/>
					<br />
					<Button color={"primary"} variant={"contained"} onClick={onSubmit}>
						Submit Request
					</Button>
				</>
			)}
			{error && (
				<Typography paragraph color={"error"}>
					{error.graphQLErrors[0]?.message || error.message}
				</Typography>
			)}
		</>
	);
};

const DELETE = gql`
	mutation ($requestId: Int!) {
		deleteMembershipRequest(requestId: $requestId)
	}
`;

const ExistingRequest = () => {
	const org = React.useContext(OrgContext);
	const classes = useStyles();

	const [deleteRequest, { error }] = useMutation(DELETE, {
		variables: { requestId: org.membershipRequest.id },
		update: cache => {
			cache.reset().then(() => org.refetch());
		}
	});

	return (
		<>
			<div>
				<img src={joinVector} alt={"Friends helping each other up a window."} className={classes.vector} />
			</div>

			<p>
				You've requested to join this club on{" "}
				{moment(new Date(org.membershipRequest.createdAt)).format("dddd, MMMM Do YYYY, h:mm a")}
			</p>
			{Boolean(org?.membershipRequest?.userMessage) && (
				<p>
					<b>Your Note: </b>
					{org?.membershipRequest?.userMessage}
				</p>
			)}
			<Button
				color={"primary"}
				// variant={"contained"}
				onClick={deleteRequest}
			>
				Delete Request
			</Button>
			{error && (
				<Typography paragraph color={"error"}>
					{error.graphQLErrors[0]?.message || error.message}
				</Typography>
			)}
		</>
	);
};

const ACCEPT = gql`
	mutation ($requestId: Int!) {
		approveMembershipRequest(requestId: $requestId) {
			id
		}
	}
`;

const AcceptRequest = () => {
	const org = React.useContext(OrgContext);
	const classes = useStyles();

	const [acceptRequest, { error, loading: loadingAccept }] = useMutation(ACCEPT, {
		variables: { requestId: org.membershipRequest.id },
		update: cache => {
			cache.reset().then(() => org.refetch());
		}
	});

	const [rejectRequest, { loading: loadingDelete }] = useMutation(DELETE, {
		variables: { requestId: org.membershipRequest.id },
		update: cache => {
			cache.reset().then(() => org.refetch());
		}
	});

	return (
		<>
			<div>
				<img src={joinVector} alt={"Friends helping each other up a window."} className={classes.vector} />
			</div>
			<p>You've been invited to join this club as a {org.membershipRequest.role}</p>
			<Button
				disabled={loadingDelete || loadingAccept}
				color={"secondary"}
				variant={"contained"}
				onClick={acceptRequest}
			>
				Accept
			</Button>
			&nbsp; &nbsp; &nbsp;
			<Button color={"primary"} disabled={loadingAccept || loadingDelete} onClick={rejectRequest}>
				Reject
			</Button>
			{error && (
				<Typography paragraph color={"error"}>
					{error.graphQLErrors[0]?.message || error.message}
				</Typography>
			)}
		</>
	);
};

const Join = ({ match }) => {
	const classes = useStyles();
	const org = React.useContext(OrgContext);

	return (
		<div>
			<Typography variant={"h4"} className={classes.tabName}>
				Join Activity
			</Typography>

			<div className={classes.tabContainer}>
				{!org.membership && !org.membershipRequest && <CreateRequest />}
				{!org.membership && org.membershipRequest && org.membershipRequest.userApproval && <ExistingRequest />}
				{!org.membership && org.membershipRequest && org.membershipRequest.adminApproval && <AcceptRequest />}
				{org.membership && <p>You're a member of this activity :)</p>}
			</div>
		</div>
	);
};

export default Join;
