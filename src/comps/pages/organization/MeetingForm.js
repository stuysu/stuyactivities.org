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
	InputAdornment,
	Link,
	makeStyles,
	Switch,
	Select,
	MenuItem,
	TextField,
	Typography
} from "@material-ui/core";
import { Schedule } from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as moment from "moment";

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

	const [month, setMonth] = React.useState(moment().format("MM"));
	const [day, setDay] = React.useState(moment().format("DD"));
	const [year, setYear] = React.useState(moment().format("YYYY"));

	const startDate = new Date(meeting.start || "");

	const [startTime, setStartTime] = React.useState(
		meeting.start ? `${startDate.getHours()}:${String(startDate.getMinutes()).padStart(2, "0")}` : "15:00"
	);
	const [endTime, setEndTime] = React.useState(
		meeting.end
			? `${new Date(meeting.end).getHours()}:${String(new Date(meeting.end).getMinutes()).padStart(2, "0")}`
			: "17:00"
	);
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
				<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
					<Select
						fullWidth
						value={moment(month, "MM").format("MMM")}
						onChange={e => {
							setMonth(moment(e.target.value, "MMM").format("MM"));
						}}
						variant={"outlined"}
					>
						{moment.monthsShort().map(month => (
							<MenuItem value={month}>{month}</MenuItem>
						))}
					</Select>
				</Grid>
				<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
					<Select
						fullWidth
						value={day}
						onChange={e => {
							setDay(e.target.value);

						}}
						variant={"outlined"}
					>
						{
							//Add all days in month as selectable options
							[...Array(moment(`${year}-${month}`, "YYYY-M").daysInMonth() + 1).keys()]
								.slice(1)
								.map(day => (
									<MenuItem value={day}>{day}</MenuItem>
								))
						}
					</Select>
				</Grid>
				<Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
					<Select
						fullWidth
						value={year}
						onChange={e => {
							setYear(e.target.value);
						}}
						variant={"outlined"}
					>
						{[moment().year(), moment().year() + 1].map(year => (
							<MenuItem value={year}>{year}</MenuItem>
						))}
					</Select>
				</Grid>
				<Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
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
				<Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
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
						startTime,
						endTime,
						checked,
						date: `${year}-${month}-${day}`,
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
