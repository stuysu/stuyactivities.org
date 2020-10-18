import React, { useState } from "react";
import {
	Button,
	FormControlLabel,
	Grid,
	InputAdornment,
	Link,
	makeStyles,
	Switch,
	TextField,
	Typography
} from "@material-ui/core";
import { CalendarToday, Schedule } from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
	marginBottom: {
		marginBottom: theme.spacing(1)
	},
	marginBottomBig: {
		marginBottom: theme.spacing(2)
	}
}));

const MeetingForm = ({ submit, buttonText, checkboxText, meeting = {}, isSubmitting }) => {
	const classes = useStyles();
	const [title, setTitle] = React.useState(meeting.title || "");
	const [isPublic, setIsPublic] = useState(meeting.privacy === "public");
	const [description, setDescription] = React.useState(meeting.description || "");

	const startDate = new Date(meeting.start || "");
	const [date, setDate] = React.useState(
		`${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${startDate.getDate()}`
	);
	const [startTime, setStartTime] = React.useState(
		meeting.start ? `${startDate.getHours()}:${String(startDate.getMinutes()).padStart(2, "0")}` : "15:00"
	);
	const [endTime, setEndTime] = React.useState(
		meeting.end
			? `${new Date(meeting.end).getHours()}:${String(new Date(meeting.end).getMinutes()).padStart(2, "0")}`
			: "17:00"
	);
	const [checked, setChecked] = React.useState(false);
	return (
		<div>
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
						Please include a Zoom link (as well as the Meeting ID and Passcode) for your meeting in the
						description above. For instructions on how to create a secure Zoom meeting using your stuy.edu
						account, click{" "}
						<Link href="https://docs.google.com/document/d/1-jbrKLIAOh97qxEk4VrQnW66PLcoVTlEvtG_tAcM-Rg/edit?usp=sharing">
							here
						</Link>
						.
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
				onClick={() =>
					submit({
						title,
						description,
						date,
						startTime,
						endTime,
						checked,
						privacy: isPublic ? "public" : "private"
					})
				}
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
