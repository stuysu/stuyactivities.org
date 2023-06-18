import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import BackButton from "../../../comps/ui/BackButton";
import layout from "./../../../styles/Layout.module.css";
import Loading from "../../../comps/ui/Loading";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import moment from "moment-timezone";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import capitalizeString from "../../../utils/capitalizeString";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { cache } from "../../../comps/context/ApolloProvider";
import LinkifyText from "../../../comps/ui/LinkifyText";
import Box from "@mui/material/Box";

const CREATE_MESSAGE_MUTATION = gql`
	mutation ($orgId: Int!, $message: String!) {
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
			<Box
				sx={{
					width: "100%",
					borderRadius: "10px",
					borderStyle: "solid",
					borderWidth: "2px",
					borderColor: "transparency.text",
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
										<Box
											component="p"
											sx={{
												color: message?.auto ? "transparency.textLighter" : "transparency.text"
											}}
										>
											{message?.user?.name} -{" "}
											{message?.auto
												? "Automatic Message"
												: message?.user?.adminRoles?.length
												? "ClubPub Team"
												: "Organization Admin"}{" "}
											<Box component="span" sx={{ color: "transparency.textLighter" }}>
												({moment(message.createdAt).format("MM/DD/YY h:mma")})
											</Box>
										</Box>
										<Box
											component="p"
											sx={{
												fontStyle: message?.auto ? "italic" : "normal",
												color: message?.auto ? "transparency.textLighter" : "transparency.text",
												overflowWrap: "anywhere"
											}}
										>
											<LinkifyText color={"primary"}>{message?.message}</LinkifyText>
										</Box>
									</div>
								</div>
							</ListItem>
						);
					})}
				</List>
				<Box
					sx={{
						position: "sticky",
						bottom: 0,
						padding: "1rem",
						backgroundColor: "background.default",
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
				</Box>
			</Box>
		</>
	);
};

const ORG_QUERY = gql`
	query ($url: String!) {
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
				socials
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
				socials
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
	mutation ($editId: Int!, $fields: [String!]!) {
		approveCharterFields(charterEditId: $editId, fields: $fields) {
			id
			alteredFields
		}
	}
`;

const REJECT_MUTATION = gql`
	mutation ($editId: Int!, $fields: [String!]!) {
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
							edit = JSON.parse(JSON.stringify(edit))
							if (edit.extra) {
								let noExtra = false;
								if (edit.extra && edit.extra.startsWith("<RETURNING_CHARTER>")) noExtra = true;

								let tempSplit = edit.extra.split("<RETURNING_CHARTER>");

								if (!noExtra) {
									edit.extra = tempSplit[0];
									if (tempSplit.length > 0) {
										edit.returning = tempSplit[1];
										edit.alteredFields.push("returning");
									} else {
										edit.returning = "This club is not a returning activity.";
										edit.alteredFields.push("returning");
									}
								} else {
									edit.extra = null;
									edit.alteredFields = edit.alteredFields.filter(f => f != "extra");
									edit.returning = tempSplit[1];
									edit.alteredFields.push("returning");
								}
								
							}
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
														variables: { fields: edit.alteredFields.filter(f => f != "returning"), editId: edit.id }
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
														{field != "returning" &&
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
														}
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
						<Typography
							variant="h3"
							sx={{
								position: "sticky",
								top: 0,
								backgroundColor: "background.default",
								zIndex: 100
							}}
						>
							Club Leaders:
						</Typography>
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

						<Typography
							variant="h3"
							sx={{
								position: "sticky",
								top: 0,
								backgroundColor: "background.default",
								zIndex: 100
							}}
						>
							Pending Leader Requests:
						</Typography>
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
