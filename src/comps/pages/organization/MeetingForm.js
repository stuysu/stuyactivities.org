import React from "react";
import {
	FormControlLabel,
	Switch,
	makeStyles,
	TextField,
	Grid,
	InputAdornment,
	Typography,
	Button
} from "@material-ui/core";
import { CalendarToday, Schedule } from "@material-ui/icons";

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
			<TextField
				fullWidth
				outlined
				variant={"outlined"}
				multiline
				rows={5}
				value={description}
				onChange={ev => setDescription(ev.target.value)}
			/>
			<FormControlLabel
				control={<Switch checked={checked} onChange={e => setChecked(e.target.checked)} />}
				label={checkboxText}
			/>
			<br />
			<Button
				onClick={() => submit({ title, description, date, startTime, endTime, checked })}
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
