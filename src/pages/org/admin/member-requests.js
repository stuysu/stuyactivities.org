import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	FormControlLabel,
	Grid,
	TextField,
	Avatar,
	Snackbar,
	Switch,
	Typography
} from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { OrgContext } from "../index";
import RequestList from "../../../comps/pages/organization/RequestList";
import UserContext from "../../../comps/context/UserContext";
import UserSelect from "../../../comps/ui/UserSelect";
import Box from "@mui/material/Box";

const classes = {
	margin: {
		margin: 2
	},
	leftRightMargin: {
		marginLeft: 1,
		marginRight: 1
	},
	topBottomMargin: {
		marginTop: 1,
		marginBottom: 1
	}
};

const QUERY = gql`
	query MembershipRequests($orgId: Int!) {
		membershipRequests(orgId: $orgId) {
			id
			user {
				id
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
			id
			buttonEnabled
			instructions
		}
	}
`;

const OUTGOING_MUTATION = gql`
	mutation CreateOutgoingRequest($orgId: Int, $userId: Int!, $message: String, $admin: Boolean, $role: String) {
		createOutgoingRequest(orgId: $orgId, userId: $userId, message: $message, admin: $admin, role: $role) {
			id
		}
	}
`;

export default function MemberRequests({ match }) {
	const org = React.useContext(OrgContext);
	const { data, refetch } = useQuery(QUERY, {
		variables: { orgId: org.id }
	});
	const [dialogError, setDialogError] = React.useState("");
	const [approveMutation] = useMutation(APPROVE_MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch());
		}
	});
	const [deleteMutation] = useMutation(DELETE_MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch());
		},
		onError(err) {
			setDialogError(err.message);
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
		},
		update(cache, { data: { alterJoinInstructions } }) {
			cache.modify({
				id: cache.identify(org),
				fields: {
					joinInstructions() {
						return cache.writeFragment({
							data: alterJoinInstructions,
							fragment: gql`
								fragment AlteredJoinInstructions on JoinInstructions {
									id
									instructions
									buttonEnabled
								}
							`
						});
					}
				}
			});
		}
	});

	const [keyword, setKeyword] = React.useState("");
	const [user, setUser] = React.useState({});
	const [role, setRole] = React.useState("Member");
	const [message, setMessage] = React.useState("");
	const [adminPrivileges, setAdminPrivileges] = React.useState(false);
	const [outgoingMutation] = useMutation(OUTGOING_MUTATION, {
		onCompleted() {
			setUser({});
		},
		update(cache) {
			cache.reset().then(() => refetch());
		},
		onError(err) {
			setDialogError(err.message);
		}
	});
	const userContext = React.useContext(UserContext);

	return (
		<Box sx={classes.margin}>
			<Typography variant="h5">Join Instructions</Typography>
			<Grid container alignItems={"center"} spacing={2} sx={classes.topBottomMargin}>
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
						control={
							<Switch
								color="secondary"
								checked={buttonEnabled}
								onChange={e => setButtonEnabled(e.target.checked)}
							/>
						}
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
			{org.joinInstructions?.buttonEnabled === false && (
				<div>
					<Typography variant="h5">Send Outgoing Request</Typography>
					<Box sx={classes.topBottomMargin}>
						{!user.id ? (
							<UserSelect
								filter={user =>
									user.id !== userContext.id &&
									!org.memberships.some(member => member.user.id === user.id) &&
									data &&
									!data.membershipRequests.some(request => request.user.id === user.id)
								}
								onChange={(_, newUser) => setUser(newUser)}
								keyword={keyword}
								setKeyword={setKeyword}
							/>
						) : (
							<Grid container spacing={1} alignItems={"center"}>
								<Grid item xs={12} sm={6} md={4} lg={4} xl={2} style={{ display: "flex" }}>
									<Avatar src={user.picture} sx={classes.leftRightMargin} />
									<div>
										<Typography>{user.name}</Typography>
										<Typography color={"textSecondary"} variant={"subtitle2"}>
											{user.email}
										</Typography>
									</div>
								</Grid>
								<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
									<TextField
										variant="standard"
										fullWidth
										multiline
										label="Role"
										value={role}
										onChange={e => setRole(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
									<TextField
										variant="standard"
										fullWidth
										multiline
										label="Message (optional)"
										value={message}
										onChange={e => setMessage(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
									<FormControlLabel
										control={
											<Switch
												color="secondary"
												checked={adminPrivileges}
												onChange={e => setAdminPrivileges(e.target.checked)}
											/>
										}
										label="Admin Privileges"
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={6} lg={6} xl={2}>
									<Button
										style={{ float: "right" }}
										sx={classes.leftRightMargin}
										variant="contained"
										color="primary"
										onClick={() =>
											outgoingMutation({
												variables: {
													orgId: org.id,
													userId: user.id,
													role,
													message,
													admin: adminPrivileges
												}
											})
										}
									>
										Send
									</Button>
									<Button
										style={{ float: "right" }}
										sx={classes.leftRightMargin}
										variant="contained"
										onClick={() => setUser({})}
									>
										Cancel
									</Button>
								</Grid>
							</Grid>
						)}
					</Box>
				</div>
			)}
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
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			/>
			<Dialog open={dialogError !== ""} onClose={() => setDialogError("")}>
				<DialogTitle>Error: {dialogError}</DialogTitle>
				<DialogActions>
					<Button onClick={() => setDialogError("")}>Close</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
