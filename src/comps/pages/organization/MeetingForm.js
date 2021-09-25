import React, { useState } from "react";
import {
	Button,
	FormControlLabel,
	Grid,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
	TextField,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as moment from "moment";
import MomentUtils from "@date-io/moment";
import { gql, useQuery } from "@apollo/client";
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from "@material-ui/pickers";
import TinyEditor from "../../updates/TinyEditor";
import { OrgContext } from "../../../pages/org/index";

const AVAILABLE_ROOMS_QUERY = gql`
	query ($start: DateTime!, $end: DateTime!) {
		availableRooms(start: $start, end: $end) {
			id
			name
			floor
			approvalRequired
		}
	}
`;

const useStyles = makeStyles(theme => ({
	marginBottom: {
		marginBottom: theme.spacing(1)
	},
	marginBottomBig: {
		marginBottom: theme.spacing(2)
	}
}));

//Map number to ordinal, used to format room floors
//1 -> 1st, 2 -> 2nd, etc...
const ordinal = number => {
	let suffixes = ["st", "nd", "rd"];
	let ones = number % 10;
	let tens = parseInt(number / 10) % 10;
	if (0 < ones && ones <= 3 && tens !== 1) return number + suffixes[ones - 1];
	return number + "th";
};

// recurring param is for editing only
// when already editing, it shows dayOfWeek input instead of date input
// ^ could be changed to show day of week when creating the recurring meeting, not only when editing it
// but idk if that's the best choice
const MeetingForm = ({
	submit,
	buttonText,
	checkboxText,
	meeting = {},
	isSubmitting,
	errorMessage,
	recurring: alreadyRecurring
}) => {
	const org = React.useContext(OrgContext);
	const classes = useStyles();
	const [title, setTitle] = React.useState(meeting.title || "");

	const publicGroup = { name: "Public", id: 0 };
	const privateGroup = { name: "Member-only", id: 0 };
	const groups = [publicGroup, privateGroup].concat(org?.groups);
	const [group, setGroup] = useState(publicGroup);
	const [description, setDescription] = React.useState(meeting.description || "");

	let defaultStart = new Date();
	let defaultEnd = new Date();
	defaultStart.setHours(15, 0);
	defaultEnd.setHours(17, 0);

	const [time, setTime] = React.useState({
		start: moment(meeting.start ? new Date(meeting.start) : defaultStart),
		end: moment(meeting.end ? new Date(meeting.end) : defaultEnd)
	});

	if (alreadyRecurring) {
		time.start.day(meeting.dayOfWeek);
		time.end.day(meeting.dayOfWeek);
	}

	const [checked, setChecked] = React.useState(false);

	const isMobile = useMediaQuery("(max-width: 800px)");

	const [lastErr, setLastErr] = React.useState("");
	const closeDialog = () => {
		setLastErr(errorMessage);
	};

	const [dayOfWeek, setDayOfWeek] = React.useState(meeting.dayOfWeek || 0);
	//only show error dialog box if mutation submission is completed & error message is a new one
	const err_dialog_open = !isSubmitting && errorMessage !== "" && errorMessage !== lastErr;

	const virtual = { name: "Virtual", id: 0 };
	const [room, setRoom] = React.useState((meeting.rooms?.length && meeting.rooms[0]) || virtual);

	const { data, loading, error } = useQuery(AVAILABLE_ROOMS_QUERY, {
		variables: {
			...time
		}
	});

	const updateEnd = new_end => {
		let end = moment(`${time.start.format("MM-DD-YYYY")} ${new_end.format("HH:mm")}`, "MM-DD-YYYY HH:mm");
		setTime({ ...time, end });
	};

	const updateDate = start => {
		let end = moment(`${start.format("MM-DD-YYYY")} ${time.end.format("HH:mm")}`, "MM-DD-YYYY HH:mm");
		setTime({ start, end });
	};

	let availableRooms = [virtual].concat(data?.availableRooms || []);
	const roomAvailable = !loading && !error && availableRooms.find(avRoom => avRoom.id === room.id) !== undefined;
	const valid = !err_dialog_open && roomAvailable;

	return (
		<div>
			<Dialog fullScreen={isMobile} open={err_dialog_open} onClose={closeDialog}>
				<DialogTitle>Something went wrong...</DialogTitle>
				<DialogContent>
					<DialogContentText>{errorMessage}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
			<TextField
				className={classes.marginBottomBig}
				fullWidth
				variant="outlined"
				label="Title"
				value={title}
				placeholder={"e.g. Weekly Check In #2"}
				onChange={e => setTitle(e.target.value)}
			/>
			<Grid container spacing={1}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
						{alreadyRecurring ? (
							<FormControl variant="outlined" fullWidth>
								<InputLabel shrink>Day Of Week</InputLabel>
								<Select
									value={dayOfWeek}
									onChange={e => setDayOfWeek(e.target.value)}
									label="Day Of Week"
								>
									<MenuItem value={0}>Sunday</MenuItem>
									<MenuItem value={1}>Monday</MenuItem>
									<MenuItem value={2}>Tuesday</MenuItem>
									<MenuItem value={3}>Wednesday</MenuItem>
									<MenuItem value={4}>Thursday</MenuItem>
									<MenuItem value={5}>Friday</MenuItem>
									<MenuItem value={6}>Saturday</MenuItem>
								</Select>
							</FormControl>
						) : (
							<DatePicker
								fullWidth
								autoOk
								label="Date"
								value={time.start}
								format="MMM DD"
								onChange={updateDate}
								animateYearScrolling
								inputVariant="outlined"
							/>
						)}
					</Grid>
					<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
						<TimePicker
							fullWidth
							autoOk
							placeholder="03:00 PM"
							mask="__:__ _M"
							label="Start Time"
							inputVariant="outlined"
							value={time.start}
							onChange={updateDate}
						/>
					</Grid>
					<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
						<TimePicker
							fullWidth
							autoOk
							placeholder="05:00 PM"
							mask="__:__ _M"
							label="End Time"
							inputVariant="outlined"
							value={time.end}
							onChange={updateEnd}
						/>
					</Grid>
					<Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
						<Autocomplete
							disableClearable
							options={availableRooms}
							getOptionLabel={option => option.name}
							getOptionSelected={option => option.id === room.id}
							disabled={loading}
							error={!roomAvailable}
							value={room}
							onChange={(_, r) => setRoom(r)}
							renderOption={option => (
								<span>
									<Typography>{option.name}</Typography>
									{option.floor && (
										<Typography color="textSecondary">{ordinal(option.floor)} Floor</Typography>
									)}
								</span>
							)}
							renderInput={params => <TextField {...params} label="Room" variant="outlined" />}
						/>
					</Grid>
					<Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
						<Autocomplete
							disableClearable
							options={groups}
							getOptionLabel={option => option.name}
							getOptionSelected={option => option.id === group.id && option.name === group.name}
							value={group}
							onChange={(_, g) => {
								setGroup(g);
								console.log(g.id);
							}}
							renderOption={option => (
								<span>
									<Typography>{option.name}</Typography>
								</span>
							)}
							renderInput={params => <TextField {...params} label="Group" variant="outlined" />}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
			</Grid>

			<br />
			<TinyEditor
				value={description}
				setValue={setDescription}
				placeholder={`e.g. We're going to be discussing the movie Ender's game this week. \n\nHere's a link to the zoom call: https://zoom.us/j/94318855567?pwd=bFpPbVV4ZStaNlVMRjY1UnZJV2tTdz09`}
			/>

			<Typography paragraph variant={"body2"} color={"primary"}>
				If a meeting is not public then only members of the club will be able to see the description.
			</Typography>

			<FormControlLabel
				control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />}
				label={checkboxText}
			/>

			{/*
				Recurring meetings introduce a host of potential problems.
				The option to create them is being temporarily removed until
				solutions to these problems are created.
				This is where the switch to enabling recurring used to be,
				but was removed. Other code relating to recurring meetings
				may or may not have been removed.
			*/}

			<Button
				onClick={() => {
					let oldRoom = meeting.rooms.length ? meeting.rooms[0].id : 0;
					submit({
						title,
						description,
						endTime: time.end,
						checked,
						date: time.start,
						privacy: group.id === 0 && group.name === "Public" ? "public" : "private",
						frequency: 0,
						dayOfWeek: alreadyRecurring ? dayOfWeek : time.start.day(),
						groupId: group.id,
						oldRoom,
						roomId: room.id
					});
					setLastErr("");
				}}
				color={"primary"}
				variant="contained"
				disabled={!valid}
			>
				{buttonText}
			</Button>
		</div>
	);
};

export default MeetingForm;
