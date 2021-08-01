import MomentUtils from "@date-io/moment";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Switch,
	TextField,
	Typography
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { DatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import * as moment from "moment";
import React, { useState } from "react";
import TinyEditor from "../../updates/TinyEditor";

const useStyles = makeStyles(theme => ({
	marginBottom: {
		marginBottom: theme.spacing(1)
	},
	marginBottomBig: {
		marginBottom: theme.spacing(2)
	}
}));

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
	const classes = useStyles();
	const [title, setTitle] = React.useState(meeting.title || "");
	const [isPublic, setIsPublic] = useState(meeting.privacy === "public");
	const [description, setDescription] = React.useState(meeting.description || "");

	let defaultStart = new Date();
	let defaultEnd = new Date();
	defaultStart.setHours(15, 0);
	defaultEnd.setHours(17, 0);

	let newDate;
	if (alreadyRecurring) {
		newDate = moment(meeting.start, "HH:mm:ss.SSSZ");
		newDate.day(meeting.dayOfWeek);
	}

	const [date, setDate] = React.useState(
		alreadyRecurring ? newDate : moment(meeting.start ? new Date(meeting.start) : defaultStart)
	);
	const [end, setEnd] = React.useState(
		alreadyRecurring
			? moment(meeting.end, "HH:mm:ss.SSSZ")
			: moment(meeting.end ? new Date(meeting.end) : defaultEnd)
	);

	const [checked, setChecked] = React.useState(false);

	const isMobile = useMediaQuery("(max-width: 800px)");

	const [lastErr, setLastErr] = React.useState("");
	const closeDialog = () => {
		setLastErr(errorMessage);
	};

	const [recurring, setRecurring] = React.useState(alreadyRecurring || false);
	const [frequency, setFrequency] = React.useState(meeting.frequency || 1);
	const [dayOfWeek, setDayOfWeek] = React.useState(meeting.dayOfWeek || 0);
	//only show error dialog box if mutation submission is completed & error message is a new one
	const err_dialog_open = !isSubmitting && errorMessage !== "" && errorMessage !== lastErr;

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
					<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
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
								value={date}
								format="MMMM DD"
								onChange={setDate}
								animateYearScrolling
								inputVariant="outlined"
							/>
						)}
					</Grid>
					<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
						<KeyboardTimePicker
							fullWidth
							autoOk
							placeholder="03:00 PM"
							mask="__:__ _M"
							label="Start Time"
							inputVariant="outlined"
							value={date}
							onChange={setDate}
						/>
					</Grid>
					<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
						<KeyboardTimePicker
							fullWidth
							autoOk
							placeholder="05:00 PM"
							mask="__:__ _M"
							label="End Time"
							inputVariant="outlined"
							value={end}
							onChange={setEnd}
						/>{" "}
					</Grid>
				</MuiPickersUtilsProvider>
			</Grid>

			<br />
			<TinyEditor
				value={description}
				setValue={setDescription}
				placeholder={`e.g. We're going to be discussing the movie Ender's game this week. \n\nHere's a link to the zoom call: https://zoom.us/j/94318855567?pwd=bFpPbVV4ZStaNlVMRjY1UnZJV2tTdz09`}
			/>

			<Grid component="label" container alignItems="center" spacing={1}>
				<Grid item>Members Only</Grid>
				<Grid item>
					<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
				</Grid>
				<Grid item>Public</Grid>
			</Grid>
			<Typography paragraph variant={"body2"} color={"primary"}>
				If a meeting is not public then only members of the club will be able to see the description.
			</Typography>

			<FormControlLabel
				control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />}
				label={checkboxText}
			/>
			<br />

			{!alreadyRecurring && buttonText !== "Edit" && (
				<FormControl component="label">
					<FormControlLabel
						control={<Switch checked={recurring} onChange={e => setRecurring(!recurring)} />}
						label={"Recur?"}
					/>
					<FormHelperText>
						<Typography paragraph>
							When a meeting is recurring, new meetings will automatically be created with the same
							settings as the recurring meeting. You may then edit those meetings individually to provide
							additional information. Removing a recurring meeting will only remove meetings with the same
							exact settings (including start and end times, title, and description).
						</Typography>
					</FormHelperText>
				</FormControl>
			)}

			{recurring && (
				<Grid component="label" container alignItems="center" spacing={1}>
					<Grid item>This meeting will happen every</Grid>
					<Grid item>
						<TextField
							variant={"outlined"}
							type="number"
							value={frequency}
							onChange={e => Number(e.target.value) >= 1 && setFrequency(e.target.value)}
						/>
					</Grid>
					<Grid>week(s).</Grid>
				</Grid>
			)}

			<br />

			<Button
				onClick={() => {
					setLastErr("");
					submit({
						title,
						description,
						endTime: end,
						checked,
						date,
						privacy: isPublic ? "public" : "private",
						frequency: recurring ? Number(frequency) : 0,
						dayOfWeek: alreadyRecurring ? dayOfWeek : date.day()
					});
				}}
				color={"primary"}
				variant="contained"
				disabled={isSubmitting}
			>
				{buttonText}
			</Button>
		</div>
	);
};

export default MeetingForm;
