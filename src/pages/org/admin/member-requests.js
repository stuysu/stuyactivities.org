import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	FormControlLabel,
	Grid,
	makeStyles,
	Snackbar,
	Switch,
	TextField,
	Typography
} from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import { OrgContext } from "../index";
import RequestList from "../../../comps/pages/organization/RequestList";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	},
	topBottomMargin: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

const QUERY = gql`
	query MembershipRequests($orgId: Int!) {
		membershipRequests(orgId: $orgId) {
			id
			user {
				name
				email
				picture
			}
			role
			adminPrivileges
			userMessage
			adminMessage
			userApproval
			adminApproval
		}
	}
`;

const APPROVE_MUTATION = gql`
	mutation ApproveMembershipRequest($requestId: Int!) {
		approveMembershipRequest(requestId: $requestId) {
			id
		}
	}
`;

const DELETE_MUTATION = gql`
	mutation DeleteMembershipRequest($requestId: Int!) {
		deleteMembershipRequest(requestId: $requestId)
	}
`;

const ALTER_JOIN_MUTATION = gql`
	mutation AlterJoinInstructions($orgId: Int!, $buttonEnabled: Boolean, $instructions: String) {
		alterJoinInstructions(orgId: $orgId, buttonEnabled: $buttonEnabled, instructions: $instructions) {
			buttonEnabled
			instructions
		}
	}
`;

export default function MemberRequests({ match }) {
	const classes = useStyles();
	const org = React.useContext(OrgContext);
	const { data, refetch } = useQuery(QUERY, {
		variables: { orgId: org.id }
	});
	const [approveMutation] = useMutation(APPROVE_MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch());
		}
	});
	const [deleteMutation] = useMutation(DELETE_MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch());
		}
	});
	const [rejectingRequest, setRejectingRequest] = React.useState({});
	const incomingRequests = [],
		outgoingRequests = [];
	//would use filter, but forEach prevents going through array twice
	if (data?.membershipRequests) {
		data.membershipRequests.forEach(request => {
			if (!request.userApproval || !request.adminApproval) {
				request.userApproval ? incomingRequests.push(request) : outgoingRequests.push(request);
			}
		});
	}

	const [instructions, setInstructions] = React.useState(org?.joinInstructions?.instructions || "");
	const [buttonEnabled, setButtonEnabled] = React.useState(
		org?.joinInstructions === null || org.joinInstructions.buttonEnabled
	);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [joinInstructionsMutation] = useMutation(ALTER_JOIN_MUTATION, {
		onCompleted() {
			setSnackbarOpen(true);
		}
	});

	return (
		<div className={classes.margin}>
			<Typography variant="h5">Join Instructions</Typography>
			<Grid container alignItems={"center"} spacing={2} className={classes.topBottomMargin}>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
					<TextField
						fullWidth
						multiline
						variant="outlined"
						label="Join Instructions"
						value={instructions}
						onChange={e => setInstructions(e.target.value)}
					/>
				</Grid>
				<Grid item xs={8} sm={8} md={4} lg={4} xl={4}>
					<FormControlLabel
						control={<Switch checked={buttonEnabled} onChange={e => setButtonEnabled(e.target.checked)} />}
						label="Allow join through StuyActivities"
					/>
				</Grid>
				<Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
					<Button
						style={{ float: "right" }}
						color="primary"
						variant="contained"
						onClick={() =>
							joinInstructionsMutation({ variables: { orgId: org.id, instructions, buttonEnabled } })
						}
					>
						Set
					</Button>
				</Grid>
			</Grid>
			{data?.membershipRequests?.filter(request => !request.userApproval || !request.adminApproval)?.length ===
			0 ? (
				<Typography variant="h5">No outgoing or incoming requests at this time</Typography>
			) : (
				<>
					{incomingRequests.length > 0 ? <Typography variant="h5">Incoming Requests</Typography> : ""}
					<RequestList
						requests={incomingRequests}
						approve={request => approveMutation({ variables: { requestId: request.id } })}
						reject={setRejectingRequest}
					/>
					{outgoingRequests.length > 0 ? <Typography variant="h5">Outgoing Requests</Typography> : ""}
					<RequestList
						requests={outgoingRequests}
						approve={request => approveMutation({ variables: { requestId: request.id } })}
						reject={setRejectingRequest}
					/>
					<Dialog open={rejectingRequest?.id !== undefined} onClose={() => setRejectingRequest({})}>
						<DialogTitle>
							Are you sure you want to{" "}
							{rejectingRequest?.userApproval ? "reject the request from " : "delete the request to"}{" "}
							{rejectingRequest?.user?.name}?
						</DialogTitle>
						<DialogActions>
							<Button onClick={() => setRejectingRequest({})} color="primary">
								Cancel
							</Button>
							<Button
								onClick={() => {
									deleteMutation({
										variables: {
											requestId: rejectingRequest.id
										}
									});
									setRejectingRequest({});
								}}
								color="primary"
							>
								{rejectingRequest.userApproval ? "Reject" : "Delete"}
							</Button>
						</DialogActions>
					</Dialog>
				</>
			)}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={1000}
				onClose={() => setSnackbarOpen(false)}
				message="Set join instructions!"
			></Snackbar>
		</div>
	);
}
