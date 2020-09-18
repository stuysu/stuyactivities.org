import React from "react";
import {
	Grid,
	makeStyles,
	Typography,
	TextField,
	Button,
	InputAdornment,
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
	DialogActions
} from "@material-ui/core";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { gql, useMutation } from "@apollo/client";
import { CalendarToday, Schedule, Edit, Close } from "@material-ui/icons";
import { OrgContext } from "../index";
import moment from "moment"
import ReactMarkdown from "react-markdown";

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
	marginBottom: {
		marginBottom: theme.spacing(1)
	},
	marginBottomBig: {
		marginBottom: theme.spacing(2)
	}
}));

const CREATE_MUTATION = gql`
	mutation CreateMeeting(
		$orgUrl: String
		$title: String!
		$description: String!
		$start: DateTime!
		$end: DateTime!
	) {
		createMeeting(
			orgUrl: $orgUrl
			title: $title
			description: $description
			start: $start
			end: $end
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

const Meetings = ({ match }) => {
	const classes = useStyles();
	const org = React.useContext(OrgContext)
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");

	const today = new Date();
	const [date, setDate] = React.useState(
		`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
			2,
			"0"
		)}-${today.getDate()}`
	);
	const [startTime, setStartTime] = React.useState("15:00");
	const [endTime, setEndTime] = React.useState("17:00");

	const [createMutation] = useMutation(CREATE_MUTATION, {
		onCompleted() {
			setTitle("");
			setDescription("");
			setDate(
				`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
					2,
					"0"
				)}-${today.getDate()}`
			);
			setStartTime("15:00");
			setEndTime("17:00");
		},
		update(cache, {data: {createMeeting}}) {
			cache.modify({
				id: cache.identify(org),
				fields: {
					meetings(existingMeetings = [], {readField}) {
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
						})
						if (existingMeetings.some(ref => readField("id", ref) === createMeeting.id)) {
							return existingMeetings
						} else {
							return [...existingMeetings, newMeetingRef]
						}
					}
				}
			})
		}
	});
	const create = () => {
		createMutation({
			variables: {
				orgUrl: match.params.orgUrl,
				title,
				description: description || "",
				start: new Date(`${date} ${startTime}`),
				end: new Date(`${date} ${endTime}`)
			}
		});
	};

	const [removingMeeting, setRemovingMeeting] = React.useState({})
	const [removeMutation] = useMutation(REMOVE_MUTATION, {
		onCompleted() {
			console.log("COMPLETED RUN")
			setRemovingMeeting({})
		},
		update(cache) {
			cache.modify({
				id: cache.identify(org),
				fields: {
					meetings(existingMeetings = [], {readField}) {
						return existingMeetings.filter(ref => removingMeeting.id !== readField("id", ref))
					}
				}
			})
		}
	})
	return (
		<div className={classes.margin}>
			<Grid container>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
					<Typography variant={"h4"} className={classes.newMeetingTitle}>
						New Meeting
					</Typography>
					<TextField
						className={classes.marginBottomBig}
						fullWidth
						variant="outlined"
						label="Title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
							<TextField
								fullWidth
								label={"Date"}
								type="date"
								value={date}
								onChange={e => setDate(e.target.value)}
								variant={"outlined"}
								InputLabelProps={{ shrink: true }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<CalendarToday />
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
							<TextField
								fullWidth
								label={"Start Time"}
								type="time"
								value={startTime}
								onChange={e => setStartTime(e.target.value)}
								variant={"outlined"}
								InputLabelProps={{ shrink: true }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Schedule />
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
							<TextField
								fullWidth
								label={"End Time"}
								type="time"
								value={endTime}
								onChange={e => setEndTime(e.target.value)}
								variant={"outlined"}
								InputLabelProps={{ shrink: true }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Schedule />
										</InputAdornment>
									)
								}}
							/>
						</Grid>
					</Grid>
					<Typography variant={"h6"} className={classes.marginBottom}>
						Description
					</Typography>
					<SimpleMDE
						value={description}
						onChange={value => setDescription(value)}
					/>
					<Button
						onClick={create}
						color={"primary"}
						variant="contained"
					>
						Create
					</Button>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
					<Typography variant={"h4"} style={{textAlign: "center"}}>
						Existing Meetings
					</Typography>
					<List>
						{org?.meetings?.map(meeting => (
							<Paper className={classes.margin}>
								<ListItem>
									<ListItemText primary={meeting.title} secondary={`${moment(meeting.start).format("dddd, MMMM Do YYYY, h:mm a")} to ${moment(meeting.end).format("h:mm a")}`}/>
									<ListItemSecondaryAction>
										<IconButton>
											<Edit/>
										</IconButton>
										<IconButton onClick={() => setRemovingMeeting(meeting)}>
											<Close/>
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
						Description:<br/>
						<ReactMarkdown source={removingMeeting.description}/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setRemovingMeeting({})} color="primary">
						Cancel
					</Button>
					<Button onClick={() => removeMutation({variables: removingMeeting})} color="primary">
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Meetings;
