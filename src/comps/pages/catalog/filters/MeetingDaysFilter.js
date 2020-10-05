import React from "react";
import useFilterStyles from "./useFilterStyles";
import arrayToggle from "../../../../utils/arrayToggle";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

export default function MeetingDaysFilter({ meetingDays, setMeetingDays }) {
	const classes = useFilterStyles();

	const toggleMeetingDays = day => {
		const newDays = arrayToggle(day, meetingDays);
		setMeetingDays(newDays);
	};

	return (
		<div className={classes.tagContainer}>
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
					color={meetingDays.includes(tag) ? "secondary" : ""}
					className={classes.tag}
				/>
			))}
		</div>
	);
}
