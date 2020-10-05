import React from "react";
import FlexCenter from "../../ui/FlexCenter";
import {
	Avatar,
	Button,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions
} from "@material-ui/core";
import List from "@material-ui/core/List";
import { generatePath, useParams, useRouteMatch } from "react-router-dom";
import UnstyledLink from "../../ui/UnstyledLink";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Dashboard, Description, Person, Settings, GroupWork } from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { OrgContext } from "../../../pages/org";
import { gql, useMutation } from "@apollo/client";

const useStyles = makeStyles(theme => ({
	avatar: {
		height: "200px",
		width: "200px",
		marginBottom: "1rem"
	},
	orgName: {
		textAlign: "center"
	},
	stickyContainer: {
		position: "sticky",
		top: "40px"
	}
}));

const TabItem = ({ to, label, icon, exact = true }) => {
	const params = useParams();
	const renderedUrl = generatePath(to, params);
	const routeMatchesUrl = useRouteMatch(to);

	const isSelected = exact ? routeMatchesUrl?.isExact : Boolean(routeMatchesUrl);

	return (
		<UnstyledLink to={renderedUrl}>
			<ListItem button selected={isSelected}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={label} />
			</ListItem>
		</UnstyledLink>
	);
};

const LEAVE_MUTATION = gql`
	mutation DeleteMembership($membershipId: Int!) {
		deleteMembership(membershipId: $membershipId)
	}
`;

const OrgNavPanel = ({ match }) => {
	const classes = useStyles();

	const org = React.useContext(OrgContext);

	let memberStatus = org.membership ? "member" : "none";

	if (memberStatus === "none" && org.membershipRequest) {
		memberStatus = org.membershipRequest.adminApproval ? "invited" : "requested";
	}

	const joinPath = generatePath(match.path + "/join", match.params);

	const [leaveOpen, setLeaveOpen] = React.useState(false);
	const [leaveMutation] = useMutation(LEAVE_MUTATION, {
		update(cache) {
			cache.reset().then(() => org.refetch());
		},
		onCompleted() {
			setLeaveOpen(false);
		},
		onError(error) {
			setLeaveOpen(false);
			setDialogError(error.message);
		}
	});
	const [dialogError, setDialogError] = React.useState("");

	return (
		<div className={classes.stickyContainer}>
			<FlexCenter>
				<Avatar className={classes.avatar} src={org?.charter?.picture} />
			</FlexCenter>
			<Typography className={classes.orgName} variant={"h5"}>
				{org?.name}
			</Typography>

			{org.active ? (
				memberStatus !== "member" ? (
					<UnstyledLink to={joinPath}>
						<Button color={"secondary"} fullWidth>
							{memberStatus === "none" && "Request To Join"}
							{memberStatus === "invited" && "Accept Invitation"}
							{memberStatus === "requested" && "Requested"}
						</Button>
					</UnstyledLink>
				) : (
					<Button color="secondary" onClick={() => setLeaveOpen(true)} fullWidth>
						Member (Click to Leave)
					</Button>
				)
			) : (
				<Typography variant={"subtitle2"} style={{ color: "grey", textAlign: "center" }}>
					Activity Pending Approval
					<br />
					Content On This Page Is Incomplete
				</Typography>
			)}

			<hr />
			<List component="nav" aria-label="main mailbox folders">
				<TabItem label={"Overview"} to={match.path} icon={<Dashboard />} />
				<TabItem label={"Charter"} to={match.path + "/charter"} icon={<Description />} />
				<TabItem label={"Meetings"} to={match.path + "/meetings"} icon={<GroupWork />} />
				<TabItem label={"Members"} to={match.path + "/members"} icon={<Person />} />

				{org.membership?.adminPrivileges && (
					<TabItem label={"Admin Panel"} exact={false} to={match.path + "/admin"} icon={<Settings />} />
				)}
			</List>
			<Dialog open={leaveOpen} onClose={() => setLeaveOpen(false)}>
				<DialogTitle>Are you sure you want to leave {org.name}?</DialogTitle>
				<DialogContent>
					<DialogContentText>If you leave, you will have to request to join again</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setLeaveOpen(false)}>Cancel</Button>
					<Button
						onClick={() => leaveMutation({ variables: { membershipId: org.membership.id } })}
						variant={"contained"}
						color={"primary"}
					>
						Leave
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={dialogError !== ""} onClose={() => setDialogError("")}>
				<DialogTitle>Error: {dialogError}</DialogTitle>
				<DialogActions>
					<Button onClick={() => setDialogError("")}>Ok</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default OrgNavPanel;
