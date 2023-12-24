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
	TextField,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as moment from "moment";
import { gql, useQuery } from "@apollo/client";
// use mobile pickers to restore legacy behavior
import { MobileDatePicker as DatePicker, MobileTimePicker as TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TinyEditor from "../../updates/TinyEditor";
import { OrgContext } from "../../../pages/org/index";
import UserContext from "../../context/UserContext";
import NumberInput from "../../ui/NumberInput";

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

const classes = {
	marginBottom: {
		marginBottom: 1
	},
	marginBottomBig: {
		marginBottom: 2
	}
};

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
	const [title, setTitle] = React.useState(meeting.title || "");

	const [weeks, setWeeks] = React.useState(1);
	const user = React.useContext(UserContext);
	const meetingAdmin = user?.adminRoles?.some(row => "admin" === row.role);

	const publicGroup = { name: "Public", id: 0 };
	const privateGroup = { name: "Member-only", id: 0 };
	const groups = [publicGroup, privateGroup].concat(org?.groups);
	const [group, setGroup] = useState(publicGroup);
	const [description, setDescription] = React.useState(meeting.description || "");

	let defaultStart = new Date();
	let defaultEnd = new Date();
	defaultStart.setHours(15, 35);
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
	const reservedRoom = meeting.rooms?.length > 0 ? meeting.rooms[0] : null;
	const [room, setRoom] = React.useState(reservedRoom || virtual);

	const { data, loading, error } = useQuery(AVAILABLE_ROOMS_QUERY, {
		variables: {
			...time
		}
	});

	const updateEnd = new_end => {
		let end = moment(new_end);
		setTime({ ...time, end });
	};

	const updateDate = start => {
		start = moment(start); // Pickers provide a `Date` and not a `moment` now
		let end = moment(`${start.format("MM-DD-YYYY")} ${time.end.format("HH:mm")}`, "MM-DD-YYYY HH:mm");
		setTime({ start, end });
	};

	let availableRooms = [virtual].concat(data?.availableRooms || []);

	if (reservedRoom) {
		let rvnum = reservedRoom.id;
		for (let i = 0; i < availableRooms.length; ++i) {
			let num = availableRooms[i].id;
			if (rvnum < num) {
				availableRooms.splice(i, 0, reservedRoom);
				break;
			}
		}
	}

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
			<Grid container spacing={1}>
				<Grid item xs={12} sm={meetingAdmin ? 8 : 12} lg={meetingAdmin ? 10 : 12}>
					<TextField
						sx={classes.marginBottomBig}
						fullWidth
						variant="outlined"
						label="Title"
						value={title}
						placeholder={"e.g. Weekly Check In #2"}
						onChange={e => setTitle(e.target.value)}
					/>
				</Grid>
				{meetingAdmin ? (
					<Grid item xs={12} sm={4} lg={2}>
						<NumberInput label="Weeks to Repeat" value={weeks} setValue={setWeeks} fullWidth />
					</Grid>
				) : (
					<></>
				)}
			</Grid>

			<Grid container spacing={1}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
						{alreadyRecurring ? (
							<FormControl variant="outlined" fullWidth>
								<InputLabel shrink>Day Of Week</InputLabel>
								<Select
									variant="standard"
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
								label="Date"
								value={time.start}
								inputFormat="MMM dd"
								onChange={updateDate}
								renderInput={params => <TextField fullWidth variant="outlined" {...params} />}
							/>
						)}
					</Grid>
					<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
						<TimePicker
							label="Start Time"
							value={time.start}
							onChange={updateDate}
							renderInput={params => <TextField fullWidth variant="outlined" {...params} />}
						/>
					</Grid>
					<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
						<TimePicker
							label="End Time"
							value={time.end}
							onChange={updateEnd}
							renderInput={params => <TextField fullWidth variant="outlined" {...params} />}
						/>
					</Grid>
					<Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
						<Autocomplete
							disableClearable
							options={availableRooms}
							getOptionLabel={option => option.name}
							isOptionEqualToValue={option => option.id === room.id}
							disabled={loading}
							error={!roomAvailable}
							value={room}
							onChange={(_, r) => setRoom(r)}
							renderOption={(props, option) => (
								<li {...props}>
									<span>
										<Typography>{option.name}</Typography>
										{option.floor && (
											<Typography color="textSecondary">{ordinal(option.floor)} Floor</Typography>
										)}
										{option.approvalRequired && (
											<Typography color="primary" variant="body2">
												NOTE: Additional permissions / reservations may be required
											</Typography>
										)}
									</span>
								</li>
							)}
							renderInput={params => <TextField {...params} label="Room" variant="outlined" />}
						/>
					</Grid>
					<Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
						<Autocomplete
							disableClearable
							options={groups}
							getOptionLabel={option => option.name}
							isOptionEqualToValue={option => option.id === group.id && option.name === group.name}
							value={group}
							onChange={(_, g) => {
								setGroup(g);
								console.log(g.id);
							}}
							renderOption={(props, option) => (
								<li {...props}>
									<span>
										<Typography>{option.name}</Typography>
									</span>
								</li>
							)}
							renderInput={params => <TextField {...params} label="Group" variant="outlined" />}
						/>
					</Grid>
				</LocalizationProvider>
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
				control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} color="secondary" />}
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
					let oldRoom = meeting.rooms?.length ? meeting.rooms[0].id : 0;
					submit({
						title,
						description,
						endTime: time.end,
						checked,
						date: time.start,
						privacy: group.id === 0 && group.name === "Public" ? "public" : "private",
						weeks: meetingAdmin && weeks ? weeks : 0,
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
