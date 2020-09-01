import React from "react";
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	makeStyles,
	Typography
} from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	}
}));

const QUERY = gql`
	query MembershipRequests($url: String!) {
		membershipRequests(orgUrl: $url) {
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

export default function Members({ match }) {
	const classes = useStyles();
	const { data } = useQuery(QUERY, {
		variables: { url: match.params.orgUrl }
	});
	const [approveMutation] = useMutation(APPROVE_MUTATION);
	const [deleteMutation] = useMutation(DELETE_MUTATION, {
		update(cache) {
			cache.reset();
		}
	});
	const [rejectingRequest, setRejectingRequest] = React.useState({});
	if (
		data?.membershipRequests?.filter(
			request => !request.userApproval || !request.adminApproval
		)?.length === 0
	) {
		return (
			<Typography variant="h5">
				No outgoing or incoming requests at this time
			</Typography>
		);
	}
	const incomingRequests = [],
		outgoingRequests = [];
	//would use filter, but forEach prevents going through array twice
	if (data?.membershipRequests) {
		data.membershipRequests.forEach(request => {
			if (!request.userApproval || !request.adminApproval) {
				request.userApproval
					? incomingRequests.push(request)
					: outgoingRequests.push(request);
			}
		});
	}
	const RequestList = ({ requests }) => {
		return (
			<List>
				{requests?.map(request => (
					<ListItem>
						<ListItemAvatar>
							<Avatar src={request.user.picture} />
						</ListItemAvatar>
						<Grid container alignItems={"center"}>
							<Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
								<Typography>{request.user.name}</Typography>
								<Typography
									color={"textSecondary"}
									variant={"subtitle2"}
								>
									{request.user.email}
								</Typography>
							</Grid>
							<Grid item xl={8} lg={8} md={6} sm={6} xs={12}>
								<Typography>
									Desired Role: "{request.role}"{" "}
									{request.adminPrivileges
										? "(wants admin)"
										: ""}
								</Typography>
								<Typography>
									Message: "
									{request.userApproval
										? request.userMessage
										: request.adminMessage}
									"
								</Typography>
							</Grid>
						</Grid>
						<ListItemSecondaryAction>
							{request.userApproval ? (
								<IconButton
									onClick={() =>
										approveMutation({
											variables: { requestId: request.id }
										})
									}
								>
									<CheckIcon />
								</IconButton>
							) : (
								""
							)}
							<IconButton
								onClick={() => setRejectingRequest(request)}
							>
								<CloseIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		);
	};
	return (
		<div className={classes.margin}>
			{incomingRequests.length > 0 ? (
				<Typography variant="h5">Incoming Requests</Typography>
			) : (
				""
			)}
			<RequestList requests={incomingRequests} />
			{outgoingRequests.length > 0 ? (
				<Typography variant="h5">Outgoing Requests</Typography>
			) : (
				""
			)}
			<RequestList requests={outgoingRequests} />
			<Dialog
				open={rejectingRequest?.id !== undefined}
				onClose={() => setRejectingRequest({})}
			>
				<DialogTitle>
					Are you sure you want to{" "}
					{rejectingRequest?.userApproval
						? "reject the request from "
						: "delete the request to"}{" "}
					{rejectingRequest?.user?.name}?
				</DialogTitle>
				<DialogActions>
					<Button
						onClick={() => setRejectingRequest({})}
						color="primary"
					>
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
		</div>
	);
}
