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
	Link,
	makeStyles,
	Switch,
	TextField,
	Typography
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
	marginBottom: {
		marginBottom: theme.spacing(1)
	},
	marginBottomBig: {
		marginBottom: theme.spacing(2)
	}
}));

const MeetingForm = ({ submit, buttonText, checkboxText, meeting = {}, isSubmitting, errorMessage }) => {
	const classes = useStyles();
	const [title, setTitle] = React.useState(meeting.title || "");
	const [isPublic, setIsPublic] = useState(meeting.privacy === "public");
	const [description, setDescription] = React.useState(meeting.description || "");

	let defaultStart = new Date();
	let defaultEnd = new Date();
	defaultStart.setHours(15,0);
	defaultEnd.setHours(17,0);

	const [date, setDate] = React.useState(moment(meeting.start ? new Date(meeting.start) : defaultStart));
	const [end, setEnd] = React.useState(moment(meeting.end ? new Date(meeting.end) : defaultEnd));

	const [checked, setChecked] = React.useState(false);

	const isMobile = useMediaQuery("(max-width: 800px)");

	const [lastErr, setLastErr] = React.useState("");
	const closeDialog = () => {
		setLastErr(errorMessage);
	};

	return (
		<div>
			<Dialog fullScreen={isMobile} open={errorMessage !== "" && lastErr !== errorMessage} onClose={closeDialog}>
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
						<DatePicker
							fullWidth
							label="Date"
							value={date}
							onChange={setDate}
							animateYearScrolling
							inputVariant="outlined"
						/>
					</Grid>
					<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
						<TimePicker fullWidth autoOk label="Start Time" inputVariant="outlined" value={date} onChange={setDate} />
					</Grid>
					<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
						<TimePicker fullWidth autoOk label="Start Time" inputVariant="outlined" value={end} onChange={setEnd} />
					</Grid>
				</MuiPickersUtilsProvider>
			</Grid>

			<br />
			<TextField
				fullWidth
				label={"Description"}
				outlined
				variant={"outlined"}
				multiline
				rows={5}
				value={description}
				placeholder={`e.g. We're going to be discussing the movie Ender's game this week. \n\nHere's a link to the zoom call: https://zoom.us/j/94318855567?pwd=bFpPbVV4ZStaNlVMRjY1UnZJV2tTdz09`}
				onChange={ev => setDescription(ev.target.value)}
				helperText={
					<Typography paragraph>
						Please include a Zoom, Google Meet, or Discord link (as well as the Meeting ID and Passcode) for
						your meeting in the description above. For instructions on how to create a secure Zoom meeting
						using your stuy.edu account, click{" "}
						<Link href="https://docs.google.com/document/d/1-jbrKLIAOh97qxEk4VrQnW66PLcoVTlEvtG_tAcM-Rg/edit?usp=sharing">
							here
						</Link>
						. Click <Link href={"/rules"}>here</Link> to make sure you are following all online meetings
						regulations.
					</Typography>
				}
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

			<Button
				onClick={() => {
					setLastErr("");
					submit({
						title,
						description,
						endTime: end,
						checked,
						date,
						privacy: isPublic ? "public" : "private"
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
