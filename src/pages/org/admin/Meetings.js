import React from "react";
import {
	Grid,
	makeStyles,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	Paper,
	IconButton,
	ListItemSecondaryAction,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Snackbar
} from "@material-ui/core";
import UnstyledLink from "../../../comps/ui/UnstyledLink";
import BackButton from "../../../comps/ui/BackButton";
import "easymde/dist/easymde.min.css";
import { gql, useMutation } from "@apollo/client";
import { Edit, Close } from "@material-ui/icons";
import { OrgContext } from "../index";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { generatePath, Route, Switch } from "react-router-dom";
import MeetingForm from "../../../comps/pages/organization/MeetingForm";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
		boxSizing: "border-box"
	},
	newMeetingTitle: {
		textAlign: "center",
		marginBottom: theme.spacing(2)
	},
	titleInput: {
		fontSize: "2em"
	},
	backButton: {
		[theme.breakpoints.up("lg")]: {
			position: "absolute",
			marginLeft: theme.spacing(10),
			marginTop: theme.spacing(3)
		},
		[theme.breakpoints.down("lg")]: {
			marginTop: theme.spacing(3)
		}
	}
}));

const CREATE_MUTATION = gql`
	mutation CreateMeeting(
		$orgUrl: String
		$title: String!
		$description: String!
		$start: DateTime!
		$end: DateTime!
		$notifyFaculty: Boolean
	) {
		createMeeting(
			orgUrl: $orgUrl
			title: $title
			description: $description
			start: $start
			end: $end
			notifyFaculty: $notifyFaculty
		) {
			id
			title
			description
			start
			end
		}
	}
`;

const REMOVE_MUTATION = gql`
	mutation DeleteMeeting($id: Int!) {
		deleteMeeting(meetingId: $id)
	}
`;

const EDIT_MUTATION = gql`
	mutation AlterMeeting(
		$id: Int!
		$title: String
		$description: String
		$start: DateTime
		$end: DateTime
		$notifyMembers: Boolean
	) {
		alterMeeting(
			meetingId: $id
			title: $title
			description: $description
			start: $start
			end: $end
			notifyMembers: $notifyMembers
		) {
			id
			title
			description
			start
			end
		}
	}
`;

const Main = ({ match }) => {
	const classes = useStyles();
	const org = React.useContext(OrgContext);
	//changing the key of a component causes react to remake it
	//here, we use the key to reset the form when it has been submitted
	const [formKey, setFormKey] = React.useState(0);
	const [createMutation, { loading }] = useMutation(CREATE_MUTATION, {
		onCompleted() {
			setFormKey(formKey + 1);
		},
		update(cache, { data: { createMeeting } }) {
			cache.modify({
				id: cache.identify(org),
				fields: {
					meetings(existingMeetings = [], { readField }) {
						const newMeetingRef = cache.writeFragment({
							data: createMeeting,
							fragment: gql`
								fragment NewMeeting on Meeting {
									id
									title
									description
									start
									end
								}
							`
						});
						if (existingMeetings.some(ref => readField("id", ref) === createMeeting.id)) {
							return existingMeetings;
						} else {
							return [...existingMeetings, newMeetingRef];
						}
					}
				}
			});
		}
	});
	const create = ({ title, description, date, startTime, endTime, checked }) => {
		createMutation({
			variables: {
				orgUrl: match.params.orgUrl,
				title,
				description: description || "",
				start: new Date(`${date} ${startTime}`).toISOString(),
				end: new Date(`${date} ${endTime}`).toISOString(),
				notifyFaculty: checked
			}
		});
	};

	const [removingMeeting, setRemovingMeeting] = React.useState({});
	const [removeMutation] = useMutation(REMOVE_MUTATION, {
		onCompleted() {
			setRemovingMeeting({});
		},
		update(cache) {
			cache.modify({
				id: cache.identify(org),
				fields: {
					meetings(existingMeetings = [], { readField }) {
						return existingMeetings.filter(ref => removingMeeting.id !== readField("id", ref));
					}
				}
			});
		}
	});
	return (
		<div className={classes.margin}>
			<Grid container>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
					<Typography variant={"h4"} className={classes.newMeetingTitle}>
						New Meeting
					</Typography>
					<MeetingForm
						submit={create}
						key={formKey}
						buttonText={"Create"}
						checkboxText={"Notify faculty members?"}
						isSubmitting={loading}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
					<Typography variant={"h4"} style={{ textAlign: "center" }}>
						Existing Meetings
					</Typography>
					<List>
						{org?.meetings?.map(meeting => (
							<Paper className={classes.margin}>
								<ListItem>
									<ListItemText
										primary={meeting.title}
										secondary={`${moment(meeting.start).format(
											"dddd, MMMM Do YYYY, h:mm a"
										)} to ${moment(meeting.end).format("h:mm a")}`}
									/>
									<ListItemSecondaryAction>
										<UnstyledLink
											to={generatePath(match.path, match.params) + "/edit/" + meeting.id}
										>
											<IconButton>
												<Edit />
											</IconButton>
										</UnstyledLink>
										<IconButton onClick={() => setRemovingMeeting(meeting)}>
											<Close />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							</Paper>
						))}
					</List>
				</Grid>
			</Grid>

			<Dialog open={removingMeeting?.id !== undefined} onClose={() => setRemovingMeeting({})}>
				<DialogTitle>Are you sure you want to remove {removingMeeting?.title}?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Description:
						<br />
						<ReactMarkdown source={removingMeeting.description} />
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setRemovingMeeting({})} color="primary">
						Cancel
					</Button>
					<Button onClick={() => removeMutation({ variables: removingMeeting })} color="primary">
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const EditPage = ({ match }) => {
	const org = React.useContext(OrgContext);
	const classes = useStyles();
	//Use snackbar since edit has no other visible effects
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const editingMeeting = org?.meetings?.find(meeting => meeting.id === Number(match.params.meetingId));
	const [editMutation, { loading }] = useMutation(EDIT_MUTATION, {
		update(cache, { data: { alterMeeting } }) {
			cache.modify({
				id: cache.identify(org),
				fields: {
					meetings(existingMeetings = [], { readField }) {
						const alteredMeetingRef = cache.writeFragment({
							data: alterMeeting,
							fragment: gql`
								fragment AlteredMeeting on Meeting {
									id
									title
									description
									start
									end
								}
							`
						});
						return [
							...existingMeetings.filter(ref => readField("id", ref) !== alterMeeting.id),
							alteredMeetingRef
						];
					}
				}
			});
		},
		onCompleted() {
			setSnackbarOpen(true);
		}
	});
	const edit = ({ title, description, date, startTime, endTime, checked }) => {
		editMutation({
			variables: {
				id: Number(match.params.meetingId),
				title,
				description: description || "",
				start: new Date(`${date} ${startTime}`).toISOString(),
				end: new Date(`${date} ${endTime}`).toISOString(),
				notifyMembers: checked
			}
		});
	};
	//Grid isn't really necessary here but we use it to make the edit menu similar in shape to the main page halves
	return (
		<div>
			<BackButton
				className={classes.backButton}
				label={"Back to Meetings"}
				to={generatePath("/" + match.params.orgUrl + "/admin/meetings")}
			/>
			<Grid container justify={"center"} className={classes.margin}>
				<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
					<Typography variant={"h4"} className={classes.newMeetingTitle}>
						Edit Meeting
					</Typography>
					<MeetingForm
						submit={edit}
						meeting={editingMeeting}
						buttonText={"Edit"}
						checkboxText={"Notify club members?"}
						isSubmitting={loading}
					/>
				</Grid>
			</Grid>
			<Snackbar
				autoHideDuration={1000}
				open={snackbarOpen}
				onClose={() => setSnackbarOpen(false)}
				message={"Meeting Edited!"}
			/>
		</div>
	);
};

const Meetings = ({ match }) => {
	return (
		<Switch>
			<Route path={match.path + "/edit/:meetingId"} component={EditPage} />
			<Route path={match.path} component={Main} />
		</Switch>
	);
};

export default Meetings;
