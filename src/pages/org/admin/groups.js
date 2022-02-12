import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import {
	Avatar,
	Box,
	Button,
	Card,
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
	TextField,
	Typography
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	}
}));

const GROUP_QUERY = gql`
	query Groups($url: String!) {
		organizationByUrl(url: $url) {
			id
			memberships {
				user {
					id
					name
					email
					grade
					picture
					isFaculty
				}
			}
			groups {
				name
				id
				memberships {
					id
					user {
						id
						name
						email
						picture
						isFaculty
						grade
					}
				}
			}
		}
	}
`;

const CREATE_GROUP_MEMBERSHIP_MUTATION = gql`
	mutation CreateGroupMembership($groupId: Int!, $userId: Int!) {
		createGroupMembership(groupId: $groupId, userId: $userId) {
			id
		}
	}
`;

const REMOVE_GROUP_MEMBERSHIP_MUTATION = gql`
	mutation RemoveGroupMembership($groupMembershipId: Int!) {
		deleteGroupMembership(groupMembershipId: $groupMembershipId)
	}
`;

const CREATE_GROUP_MUTATION = gql`
	mutation createGroup($orgId: Int!, $name: String!) {
		createGroup(orgId: $orgId, name: $name) {
			id
		}
	}
`;

const DELETE_GROUP_MUTATION = gql`
	mutation deleteGroup($groupId: Int!) {
		deleteGroup(groupId: $groupId)
	}
`;

export default function Groups({ match }) {
	const classes = useStyles();

	const { data, refetch } = useQuery(GROUP_QUERY, {
		variables: { url: match.params.orgUrl }
	});

	let clearCache = {
		update(cache) {
			cache.reset();
			refetch();
		}
	};

	const [createMembershipMutation] = useMutation(CREATE_GROUP_MEMBERSHIP_MUTATION, clearCache);
	const [deleteMembershipMutation] = useMutation(REMOVE_GROUP_MEMBERSHIP_MUTATION, clearCache);
	const [createGroupMutation] = useMutation(CREATE_GROUP_MUTATION, clearCache);
	const [deleteGroupMutation] = useMutation(DELETE_GROUP_MUTATION, clearCache);

	const [newGroupName, setNewGroupName] = React.useState("");
	const createGroup = () => {
		createGroupMutation({
			variables: {
				orgId: data?.organizationByUrl.id,
				name: newGroupName
			}
		});
	};

	const [editGroup, setEditGroup] = React.useState({});
	const addGroupMemberships = () => {
		editGroup.newMembers?.forEach(user =>
			createMembershipMutation({
				variables: {
					groupId: editGroup.id,
					userId: user.id
				}
			})
		);
		setEditGroup({});
	};

	const [groupMembership, setGroupMembership] = React.useState({});
	const deleteGroupMembership = () => {
		deleteMembershipMutation({
			variables: {
				groupMembershipId: groupMembership.id
			}
		});
		setGroupMembership({});
	};

	const deleteGroup = () => {
		deleteGroupMutation({
			variables: {
				groupId: editGroup.id
			}
		});
		setEditGroup({});
	};

	const { enqueueSnackbar } = useSnackbar();

	return (
		<div className={classes.margin}>
			<Card>
				<Box p={2} m={2} pb={5}>
					<Typography variant="h5">Create New Group</Typography>
					<br />
					<TextField
						value={newGroupName}
						onChange={e => setNewGroupName(e.target.value)}
						required={true}
						label="Name"
						variant="outlined"
						fullWidth
					/>
					<br />
					<br />
					<Button
						onClick={() => {
							createGroup();
							setNewGroupName("");
						}}
						color="primary"
						variant={"contained"}
						style={{ float: "right" }}
						disabled={newGroupName === ""}
					>
						Create Group
					</Button>
				</Box>
			</Card>
			<List>
				{data?.organizationByUrl?.groups.map(group => (
					<Box mt={2}>
						<Card>
							<Box p={1}>
								<ListItem key={group.id} fullWidth>
									<Grid container xl={12} lg={12} md={12} sm={12} xs={12} direction="column">
										<Grid container justifyContent="space-between">
											<Typography variant="h5" align="left">
												{group.name}
											</Typography>
											<Button
												onClick={() =>
													navigator.clipboard
														.writeText(
															group?.memberships
																.map(membership => membership.user.email)
																.join(", ")
														)
														.then(() =>
															enqueueSnackbar("Copied email list to clipboard!", {
																anchorOrigin: {
																	vertical: "bottom",
																	horizontal: "center"
																},
																autoHideDuration: 3000
															})
														)
												}
												color={"primary"}
												variant={"contained"}
												size={"small"}
											>
												Copy Emails
											</Button>
										</Grid>
										<List>
											{group.memberships.length > 0 ? (
												group.memberships.map(membership => (
													<ListItem button>
														<ListItemAvatar>
															<Avatar src={membership.user.picture} />
														</ListItemAvatar>
														<span>
															<Typography>{membership.user.name}</Typography>
															<Typography color={"textSecondary"} variant={"subtitle2"}>
																{membership.user.email}
															</Typography>
														</span>
														<ListItemSecondaryAction>
															<IconButton
																onClick={() => {
																	setGroupMembership({
																		groupName: group.name,
																		...membership
																	});
																}}
															>
																<Delete />
															</IconButton>
														</ListItemSecondaryAction>
													</ListItem>
												))
											) : (
												<Typography color={"textSecondary"}>
													This group has no members yet.
												</Typography>
											)}
										</List>
									</Grid>
									<IconButton onClick={() => setEditGroup(group)}>
										<Edit />
									</IconButton>
								</ListItem>
							</Box>
						</Card>
					</Box>
				))}
				{/*Remove member dialog*/}
				<Dialog open={groupMembership.id !== undefined} onClose={() => setGroupMembership({})}>
					<DialogTitle>
						Are you sure you want to remove {groupMembership.user?.name} from {groupMembership.groupName}?
					</DialogTitle>
					<DialogActions>
						<Button onClick={() => setGroupMembership({})} color="primary">
							Cancel
						</Button>
						<Button onClick={deleteGroupMembership} color="primary">
							Yes
						</Button>
					</DialogActions>
				</Dialog>
				{/*Add members dialog*/}
				<Dialog open={editGroup.id !== undefined} onClose={() => setEditGroup({})} fullWidth>
					<DialogTitle>Edit or delete {editGroup.name}</DialogTitle>
					<Box margin={3}>
						<Autocomplete
							options={data?.organizationByUrl.memberships
								.map(membership => membership.user)
								.filter(
									user =>
										editGroup.newMembers?.find(newUser => newUser.id === user.id) === undefined &&
										editGroup.memberships?.find(membership => membership.user.id === user.id) ===
											undefined
								)}
							renderInput={params => <TextField {...params} label="Find User" variant="outlined" />}
							renderOption={option => (
								<>
									<ListItemAvatar>
										<Avatar src={option?.picture} />
									</ListItemAvatar>
									<span>
										<span>{option?.name}</span>
										<br />
										<span className={classes.smallerText}>
											{option?.email}
											<br />
											{option?.isFaculty ? "Faculty" : `Grade ${option?.grade}`}
										</span>
									</span>
								</>
							)}
							getOptionLabel={user => user.name}
							onChange={(_, user) => {
								if (user) {
									let newMembers;
									if (editGroup.newMembers !== undefined) {
										newMembers = [...editGroup.newMembers, user];
									} else {
										newMembers = [user];
									}
									setEditGroup({ ...editGroup, newMembers });
								}
							}}
						/>
					</Box>
					<List>
						<Box p={3} pt={0}>
							{editGroup.newMembers?.length && <Typography variant="h5">Add Members:</Typography>}
							<br />
							{editGroup.newMembers?.map((member, index) => (
								<ListItem key={index} button>
									<Grid container xl={12} lg={12} md={12} sm={12} xs={12}>
										<Typography>{member.name}</Typography>
										<ListItemSecondaryAction>
											<IconButton
												onClick={() => {
													editGroup.newMembers.splice(index, 1);
													setEditGroup({ ...editGroup });
												}}
											>
												<Delete />
											</IconButton>
										</ListItemSecondaryAction>
									</Grid>
								</ListItem>
							))}
						</Box>
					</List>
					<DialogActions>
						<Button
							color="primary"
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you want to delete the group `" +
											editGroup.name +
											"` permanently?"
									)
								) {
									deleteGroup();
								}
							}}
						>
							Delete {editGroup.name} Permanently
						</Button>
						{editGroup.newMembers?.length > 0 && <Button onClick={addGroupMemberships}>Add Members</Button>}
						<Button onClick={() => setEditGroup({})}>Close</Button>
					</DialogActions>
				</Dialog>
			</List>
		</div>
	);
}
