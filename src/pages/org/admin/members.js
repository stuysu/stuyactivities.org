import React from "react";
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	Snackbar,
	Switch,
	TextField,
	Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { gql, useMutation, useQuery } from "@apollo/client";
import UserContext from "../../../comps/context/UserContext";
import Box from "@mui/material/Box";

const classes = {
	margin: {
		margin: 2
	}
};

const QUERY = gql`
	query Memberships($url: String!) {
		organizationByUrl(url: $url) {
			memberships {
				id
				adminPrivileges
				user {
					id
					name
					email
					picture
				}
				role
				adminPrivileges
			}
		}
	}
`;

const ALTER_MUTATION = gql`
	mutation AlterMembership($membershipId: Int!, $adminPrivileges: Boolean, $role: String, $notify: Boolean) {
		alterMembership(membershipId: $membershipId, adminPrivileges: $adminPrivileges, role: $role, notify: $notify) {
			id
			user {
				id
				name
				email
				picture
			}
			role
			adminPrivileges
		}
	}
`;

const REMOVE_MUTATION = gql`
	mutation RemoveMembership($membershipId: Int!, $notify: Boolean) {
		deleteMembership(membershipId: $membershipId, notify: $notify)
	}
`;

export default function Members({ match }) {
	const user = React.useContext(UserContext);
	const { data } = useQuery(QUERY, {
		variables: { url: match.params.orgUrl }
	});
	const [alterMutation] = useMutation(ALTER_MUTATION);
	const [removeMutation] = useMutation(REMOVE_MUTATION, {
		update(cache) {
			cache.reset();
		}
	});
	const [editingMembership, setEditingMembership] = React.useState({});
	const [removingMembership, setRemovingMembership] = React.useState({});
	const [role, setRole] = React.useState("");
	const [adminPrivileges, setAdminPrivileges] = React.useState(false);
	const [notify, setNotify] = React.useState(true);
	const [removeNotify, setRemoveNotify] = React.useState(true);
	const openEditDialog = membership => {
		setEditingMembership(membership);
		setRole(membership.role);
		setAdminPrivileges(membership.adminPrivileges);
	};
	const edit = membership => {
		setEditingMembership({});
		alterMutation({
			variables: {
				membershipId: membership.id,
				adminPrivileges,
				role,
				notify
			}
		});
		// because graphql cache stores stuff by ID, the new item will show up without a refetch
	};
	const openRemoveDialog = membership => {
		setEditingMembership({});
		setRemovingMembership(membership);
	};
	const remove = membership => {
		setRemovingMembership({});
		removeMutation({
			variables: {
				membershipId: membership.id,
				notify: removeNotify
			}
		});
	};

	let sortedMemberships = [...(data?.organizationByUrl?.memberships || [])];
	sortedMemberships.sort((a, b) => (a.adminPrivileges && !b.adminPrivileges ? -1 : 1));

	const [snackBarOpen, setSnackBarOpen] = React.useState(false);
	const emailList = sortedMemberships.map(membership => membership.user.email).join(", ");
	const copy = () => {
		navigator.clipboard.writeText(emailList).then(() => setSnackBarOpen(true));
	};
	return (
		<Box sx={classes.margin}>
			<div style={{ display: "flex" }}>
				<Button onClick={copy} color={"primary"}>
					Copy
				</Button>
				<TextField
					style={{ flexGrow: 1 }}
					InputLabelProps={{ shrink: true }}
					fullWidth
					variant={"outlined"}
					label={"Email List"}
					disabled={true}
					value={emailList}
				/>
			</div>
			<List>
				{sortedMemberships.map(membership => (
					<ListItem>
						<ListItemAvatar>
							<Avatar src={membership.user.picture} />
						</ListItemAvatar>
						<Grid container alignItems={"center"}>
							<Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
								<Typography>{membership.user.name}</Typography>
								<Typography color={"textSecondary"} variant={"subtitle2"}>
									{membership.user.email}
								</Typography>
							</Grid>
							<Grid item xl={8} lg={8} md={6} sm={6} xs={12}>
								<Typography>
									Role: "{membership.role}" {membership.adminPrivileges ? "(admin)" : ""}
								</Typography>
							</Grid>
						</Grid>
						<ListItemSecondaryAction>
							<IconButton onClick={() => openEditDialog(membership)} size="large">
								<EditIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
			<Dialog open={editingMembership.user !== undefined} onClose={() => setEditingMembership({})}>
				<DialogTitle>Edit or remove {editingMembership.user?.name}'s membership</DialogTitle>
				<DialogContent>
					<TextField
						variant="standard"
						fullWidth
						label="New role (optional)"
						value={role}
						onChange={e => setRole(e.target.value)}
					/>
					{user.id !== editingMembership.user?.id && (
						<FormControlLabel
							control={
								<Switch
									checked={adminPrivileges}
									onChange={e => setAdminPrivileges(e.target.checked)}
									color="primary"
								/>
							}
							label="Admin Privileges"
						/>
					)}
					<FormControlLabel
						control={
							<Switch checked={notify} onChange={e => setNotify(e.target.checked)} color="primary" />
						}
						label="Send an e-mail notification??"
					/>
				</DialogContent>
				<DialogActions>
					{user.id !== editingMembership.user?.id && (
						<Button onClick={() => openRemoveDialog(editingMembership)} color="primary">
							Remove
						</Button>
					)}
					<Button onClick={() => setEditingMembership({})} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => edit(editingMembership)}
						color="primary"
						disabled={
							adminPrivileges === editingMembership.adminPrivileges && editingMembership.role === role
						}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={removingMembership.user !== undefined} onClose={() => setRemovingMembership({})}>
				<DialogTitle>Are you sure you want to remove {removingMembership.user?.name}'s membership?</DialogTitle>
				<DialogContent>
					<FormControlLabel
						control={
							<Switch
								checked={removeNotify}
								onChange={e => setRemoveNotify(e.target.checked)}
								color="primary"
							/>
						}
						label="Send an e-mail notification?"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setRemovingMembership({})} color="primary">
						Cancel
					</Button>
					<Button onClick={() => remove(removingMembership)} color="primary">
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={snackBarOpen}
				autoHideDuration={3000}
				onClose={() => setSnackBarOpen(false)}
				message="Copied email list to clipboard!"
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			/>
		</Box>
	);
}
