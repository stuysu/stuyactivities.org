import React from "react";
import filterStyles from "./filterStyles";
import arrayToggle from "../../../../utils/arrayToggle";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

export default function MeetingDaysFilter({ meetingDays, setMeetingDays }) {
	const classes = filterStyles();

	const toggleMeetingDays = day => {
		const newDays = arrayToggle(day, meetingDays);
		setMeetingDays(newDays);
	};

	return (
		<Box sx={classes.tagContainer}>
			<Typography variant={"h6"} style={{ padding: "3px" }}>
				Meeting Days
			</Typography>
			{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(tag => (
				<Chip
					key={tag}
					label={tag}
					onClick={() => toggleMeetingDays(tag)}
					value={tag}
					clickable
					variant={"outlined"}
					size={"small"}
					color={meetingDays.includes(tag) ? "secondary" : "default"}
					sx={classes.tag}
				/>
			))}
		</Box>
	);
}
