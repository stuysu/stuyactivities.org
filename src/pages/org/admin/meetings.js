import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Paper,
	Snackbar,
	Typography
} from "@material-ui/core";
import UnstyledLink from "../../../comps/ui/UnstyledLink";
import BackButton from "../../../comps/ui/BackButton";
import { gql, useMutation } from "@apollo/client";
import { Close, Edit } from "@material-ui/icons";
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
		$privacy: String!
	) {
		createMeeting(
			orgUrl: $orgUrl
			title: $title
			description: $description
			start: $start
			end: $end
			notifyFaculty: $notifyFaculty
			privacy: $privacy
		) {
			id
			title
			description
			start
			end
			privacy
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
		$privacy: String
	) {
		alterMeeting(
			meetingId: $id
			title: $title
			description: $description
			start: $start
			end: $end
			notifyMembers: $notifyMembers
			privacy: $privacy
		) {
			id
			title
			description
			start
			end
			privacy
		}
	}
`;

const CREATE_RECURRING_MUTATION = gql`
	mutation CreateRecurringMeeting(
		$orgUrl: String
		$title: String!
		$description: String!
		$start: Time!
		$end: Time!
		$privacy: String!
		$frequency: Int!
		$dayOfWeek: Int!
	) {
		createRecurringMeeting(
			orgUrl: $orgUrl
			title: $title
			description: $description
			start: $start
			end: $end
			privacy: $privacy
			frequency: $frequency
			dayOfWeek: $dayOfWeek
		) {
			id
			title
			description
			start
			end
			privacy
			frequency
			dayOfWeek
		}
	}
`;

const REMOVE_RECURRING_MUTATION = gql`
	mutation DeleteRecurringMeeting($id: Int!) {
		deleteRecurringMeeting(recurringMeetingId: $id)
	}
`;

const EDIT_RECURRING_MUTATION = gql`
	mutation AlterRecurringMeeting(
		$id: Int!
		$title: String
		$description: String
		$start: Time
		$end: Time
		$privacy: String
		$notifyMembers: Boolean
		$frequency: Int
		$dayOfWeek: Int
	) {
		alterRecurringMeeting(
			recurringMeetingId: $id
			title: $title
			description: $description
			start: $start
			end: $end
			notifyMembers: $notifyMembers
			privacy: $privacy
			frequency: $frequency
			dayOfWeek: $dayOfWeek
		) {
			id
			title
			description
			start
			end
			privacy
			frequency
			dayOfWeek
		}
	}
`;

const Main = ({ match }) => {
	const classes = useStyles();
	const org = React.useContext(OrgContext);
	//changing the key of a component causes react to remake it
	//here, we use the key to reset the form when it has been submitted
	const [formKey, setFormKey] = React.useState(0);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [createMutation, { loading }] = useMutation(CREATE_MUTATION, {
		onCompleted() {
			setFormKey(formKey + 1);
			setErrorMessage("");
		},
		onError(error) {
			console.log({ error });
			setErrorMessage(error.message);
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
	// loadingReucrring is quick fix to get around const
	// also could use let, idk why I went with this option
	// I feel like both r equally valid
	const [createRecurringMutation, { loadingRecurring }] = useMutation(CREATE_RECURRING_MUTATION, {
		onCompleted() {
			setFormKey(formKey + 1);
			setErrorMessage("");
		},
		onError(error) {
			console.log({ error });
			setErrorMessage(error.message);
		},
		update(cache) {
			// too many variables involved based on child meetings...
			cache.reset().then(() => org.refetch());
		}
	});
	const [removeRecurringMutation] = useMutation(REMOVE_RECURRING_MUTATION, {
		onCompleted() {
			setRemovingMeeting({});
		},
		update(cache) {
			// just refresh cache because recurring meeting also deletes child meetings
			// could do fancier but it's ok
			cache.reset().then(() => org.refetch());
		}
	});
	const create = ({ title, description, date, endTime, checked, privacy, frequency}) => {
		console.log(frequency);
		if (frequency) {
			createRecurringMutation({
				variables: {
					orgUrl: match.params.orgUrl,
					title,
					description: description || "",
					start: date.format("HH:mm:ss.SSSZ"),
					end: endTime.format("HH:mm:ss.SSSZ"),
					privacy,
					frequency,
					dayOfWeek: date.day()
				}
			});
		} else {
			createMutation({
				variables: {
					orgUrl: match.params.orgUrl,
					title,
					description: description || "",
					start: date.toISOString(),
					end: moment(
						`${date.format("MM-DD-YYYY")} ${endTime.format("HH:mm")}`,
						"MM-DD-YYYY HH:mm"
					).toISOString(),
					notifyFaculty: checked,
					privacy
				}
			});
		}
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
						isSubmitting={loading || loadingRecurring}
						errorMessage={errorMessage}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
					<Typography variant={"h4"} style={{ textAlign: "center" }}>
						Existing Meetings
					</Typography>
					{org?.recurringMeetings?.length > 0 && <Typography variant={"h5"} className={classes.margin}>Recurring Meetings</Typography>}
					<List>
						{org?.recurringMeetings?.map(meeting => (
							<Paper className={classes.margin}>
								<ListItem>
									<ListItemText
										primary={meeting.title}
										secondary={`${moment(meeting.start, "HH:mm:ss.SSSZ").format("h:mm a")} to ${moment(meeting.end, "HH:mm:ss.SSSZ").format("h:mm a")}`}
									/>
									<ListItemSecondaryAction>
										<UnstyledLink
											to={generatePath(match.path, match.params) + "/editRecurring/" + meeting.id}
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
					{org?.recurringMeetings?.length > 0 && <Typography variant={"h5"} className={classes.margin}>Non-Recurring Meetings</Typography>}
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
					<Button onClick={() => removingMeeting.frequency ? removeRecurringMutation({variables:removingMeeting}) : removeMutation({ variables: removingMeeting })} color="primary">
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
	const [errorMessage, setErrorMessage] = React.useState("");

	const recurring = match.path.includes("editRecurring");
	const editingMeeting = recurring ? 
		org?.recurringMeetings?.find(meeting => meeting.id === Number(match.params.meetingId)) :
		org?.meetings?.find(meeting => meeting.id === Number(match.params.meetingId));

	const [editMutation, { loading }] = useMutation(recurring ? EDIT_RECURRING_MUTATION : EDIT_MUTATION, {
		update(cache, { data: { alterMeeting } }) {
			cache.reset().then(() => org.refetch());
		},
		onError(error) {
			setErrorMessage(error.message);
		},
		onCompleted() {
			setSnackbarOpen(true);
			setErrorMessage("");
		}
	});
	const edit = ({ title, description, date, endTime, checked, privacy, frequency, dayOfWeek }) => {
		editMutation({
			variables: {
				id: Number(match.params.meetingId),
				title,
				description: description || "",
				start: recurring ?
					date.format("HH:mm:ss.SSSZ") :
					date.toISOString(),
				end: recurring ?
					endTime.format("HH:mm:ss.SSSZ") :
					moment(
						`${date.format("MM-DD-YYYY")} ${endTime.format("HH:mm")}`,
						"MM-DD-YYYY HH:mm"
					).toISOString(),
				notifyMembers: checked,
				privacy,
				frequency,
				dayOfWeek
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
						{recurring ? "Edit Recurring Meeting" : "Edit Meeting"}
					</Typography>
					<MeetingForm
						submit={edit}
						meeting={editingMeeting}
						buttonText={"Edit"}
						checkboxText={"Notify club members?"}
						isSubmitting={loading}
						errorMessage={errorMessage}
						recurring={recurring}
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
			<Route path={match.path + "/editRecurring/:meetingId"} component={EditPage} />
			<Route path={match.path} component={Main} />
		</Switch>
	);
};

export default Meetings;
