import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import BackButton from "../../../comps/ui/BackButton";
import layout from "./../../../styles/Layout.module.css";
import Loading from "../../../comps/ui/Loading";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import moment from "moment-timezone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import capitalizeString from "../../../utils/capitalizeString";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { cache } from "../../../comps/context/ApolloProvider";
import LinkifyText from "../../../comps/ui/LinkifyText";

const CREATE_MESSAGE_MUTATION = gql`
	mutation($orgId: Int!, $message: String!) {
		createCharterApprovalMessage(orgId: $orgId, message: $message) {
			id
		}
	}
`;

const ApprovalMessages = ({ organization, refetch }) => {
	const [message, setMessage] = React.useState("");

	const [submitMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
		variables: { message, orgId: organization.id }
	});
	const messageRef = React.createRef();

	React.useEffect(() => {
		messageRef.current.scrollTop = messageRef.current.scrollHeight;
	}, [messageRef]);

	const onSubmit = () => {
		submitMessage()
			.then(() => cache.reset())
			.then(() => refetch())
			.then(() => setMessage(""));
	};

	return (
		<>
			<h3>Messages:</h3>
			<div
				style={{
					width: "100%",
					borderRadius: "10px",
					border: "solid 2px black",
					maxHeight: "350px",
					position: "relative",
					overflow: "auto"
				}}
				ref={messageRef}
			>
				<List>
					{organization?.charterApprovalMessages?.map(message => {
						return (
							<ListItem>
								<ListItemAvatar>
									<Avatar src={message?.user?.picture} />
								</ListItemAvatar>
								<div style={{ display: "flex" }}>
									<div style={{ flexGrow: 1 }}>
										<p
											style={{
												color: message?.auto ? "grey" : "black"
											}}
										>
											{message?.user?.name} -{" "}
											{message?.auto
												? "Automatic Message"
												: message?.user?.adminRoles?.length
												? "ClubPub Team"
												: "Organization Admin"}{" "}
											<span style={{ color: "grey" }}>
												({moment(message.createdAt).format("MM/DD/YY h:mma")})
											</span>
										</p>
										<p
											style={{
												fontStyle: message?.auto ? "italic" : "normal",
												color: message?.auto ? "grey" : "black",
												overflowWrap: "anywhere"
											}}
										>
											<LinkifyText color={"primary"}>{message?.message}</LinkifyText>
										</p>
									</div>
								</div>
							</ListItem>
						);
					})}
				</List>
				<div
					style={{
						position: "sticky",
						bottom: 0,
						padding: "1rem",
						background: "white",
						verticalAlign: "middle",
						display: "flex"
					}}
				>
					<TextField
						value={message}
						onChange={ev => setMessage(ev.target.value)}
						variant={"outlined"}
						placeholder={"Message for StuyActivities Admins"}
						style={{ flexGrow: 1 }}
					/>
					&nbsp;
					<Button variant={"contained"} color={"secondary"} onClick={onSubmit}>
						Send
					</Button>
				</div>
			</div>
		</>
	);
};

const ORG_QUERY = gql`
	query($url: String!) {
		organization: organizationByUrl(url: $url) {
			id
			name
			charter {
				picture {
					thumbnail(width: 200, height: 200)
				}
				mission
				purpose
				benefit
				appointmentProcedures
				uniqueness
				meetingSchedule
				meetingDays
				commitmentLevel
				keywords
				extra
				updatedAt
			}

			charterEdits {
				id
				picture {
					thumbnail(width: 200, height: 200)
				}
				submittingUser {
					id
					name
					email
				}
				status
				createdAt
				mission
				purpose
				benefit
				appointmentProcedures
				uniqueness
				meetingSchedule
				meetingDays
				commitmentLevel
				extra
				alteredFields
				keywords
			}
			memberships(onlyLeaders: true) {
				role
				user {
					name
					email
					isFaculty
					picture
				}
			}
			membershipRequests {
				role
				user {
					name
					email
					isFaculty
					picture
				}
				userApproval
			}
			charterApprovalMessages {
				id
				message
				user {
					id
					name
					email
					adminRoles {
						role
					}
				}
				auto
				createdAt
			}
		}
	}
`;

const APPROVE_MUTATION = gql`
	mutation($editId: Int!, $fields: [String!]!) {
		approveCharterFields(charterEditId: $editId, fields: $fields) {
			id
			alteredFields
		}
	}
`;

const REJECT_MUTATION = gql`
	mutation($editId: Int!, $fields: [String!]!) {
		rejectCharterFields(charterEditId: $editId, fields: $fields) {
			id
			alteredFields
		}
	}
`;

const OrgApprovals = ({ match }) => {
	const { data, refetch, loading } = useQuery(ORG_QUERY, {
		variables: { url: match.params.url }
	});

	const [approve] = useMutation(APPROVE_MUTATION, { update: cache => cache.reset().then(() => refetch()) });
	const [reject] = useMutation(REJECT_MUTATION, { update: cache => cache.reset().then(() => refetch()) });

	if (loading) {
		return <Loading />;
	}

	if (!data?.organization) {
		return (
			<div className={layout.container}>
				<main className={layout.main}>
					<p>There are no organizations with that url</p>
					<BackButton to={"/admin/approvals"} label={"Back to Approvals"} />
				</main>
			</div>
		);
	}

	return (
		<div>
			<h2>Charter Approvals For {data.organization.name}</h2>
			<Grid container spacing={5}>
				<Grid item lg={8}>
					{data.organization.charterEdits
						.filter(edit => edit.status === "pending")
						.map(edit => {
							return (
								<Card
									style={{
										padding: "0.5rem",
										position: "relative"
									}}
								>
									<div style={{ display: "flex" }}>
										<h3 style={{ flexGrow: 1 }}>
											Changes Proposed By: {edit.submittingUser.name} ({edit.submittingUser.email}
											)
										</h3>
										<div>
											<Button
												variant={"outlined"}
												color={"secondary"}
												onClick={() =>
													window.confirm("Are you sure you want to reject all changes") &&
													reject({
														variables: { fields: edit.alteredFields, editId: edit.id }
													})
												}
											>
												Reject All
											</Button>
											&nbsp; &nbsp; &nbsp;
											<Button
												variant={"contained"}
												color={"primary"}
												onClick={() =>
													window.confirm("Are you sure you want to approve all changes") &&
													approve({
														variables: { fields: edit.alteredFields, editId: edit.id }
													})
												}
											>
												Approve All
											</Button>
										</div>
									</div>
									<p>Proposed at: {moment(edit.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}</p>
									<List>
										{edit.alteredFields.map((field, index) => {
											let value = edit[field];

											if (Array.isArray(value)) {
												value = value.join(", ");
											}

											return (
												<>
													<ListItem>
														<div
															style={{
																maxWidth: "80%"
															}}
														>
															<h4>{capitalizeString(field)}</h4>
															{field === "picture" ? (
																<Avatar
																	src={value.thumbnail}
																	style={{
																		width: 200,
																		height: 200
																	}}
																/>
															) : (
																<p>{value}</p>
															)}
														</div>
														<ListItemSecondaryAction>
															<Button
																variant={"outlined"}
																color={"secondary"}
																onClick={() =>
																	window.confirm(
																		"Are you sure you want to reject " + field
																	) &&
																	reject({
																		variables: { fields: [field], editId: edit.id }
																	})
																}
															>
																Reject
															</Button>
															<br />
															<br />
															<Button
																variant={"contained"}
																color={"primary"}
																onClick={() =>
																	window.confirm(
																		"Are you sure you want to approve " + field
																	) &&
																	approve({
																		variables: { fields: [field], editId: edit.id }
																	})
																}
															>
																Approve
															</Button>
														</ListItemSecondaryAction>
													</ListItem>
													{index + 1 < edit.alteredFields.length && <Divider />}
												</>
											);
										})}
									</List>
								</Card>
							);
						})}
				</Grid>
				<Grid item lg={4}>
					<Card
						style={{
							height: "250px",
							padding: "0.5rem",
							paddingTop: 0,
							overflow: "auto",
							position: "relative"
						}}
					>
						<h3
							style={{
								position: "sticky",
								top: 0,
								background: "white",
								zIndex: 100
							}}
						>
							Club Leaders:
						</h3>
						<List>
							{data.organization.memberships.map(mem => (
								<ListItem key={mem.id} button>
									<ListItemAvatar>
										<Avatar src={mem.user.picture} />
									</ListItemAvatar>
									<div>
										<Typography>{mem.user.name}</Typography>
										<Typography color={"textSecondary"} variant={"subtitle2"}>
											{mem.user.email}
										</Typography>
									</div>
								</ListItem>
							))}
						</List>

						<h3
							style={{
								position: "sticky",
								top: 0,
								background: "white",
								zIndex: 100
							}}
						>
							Pending Leader Requests:
						</h3>
						<List>
							{data.organization.membershipRequests
								.filter(mem => !mem.userApproval)
								.map(mem => (
									<ListItem key={mem.id} button>
										<ListItemAvatar>
											<Avatar src={mem.user.picture} />
										</ListItemAvatar>
										<div>
											<Typography>{mem.user.name}</Typography>
											<Typography color={"textSecondary"} variant={"subtitle2"}>
												{mem.user.email}
											</Typography>
										</div>
									</ListItem>
								))}
						</List>
					</Card>
					<ApprovalMessages organization={data.organization} refetch={refetch} />
				</Grid>
			</Grid>
		</div>
	);
};

export default OrgApprovals;
