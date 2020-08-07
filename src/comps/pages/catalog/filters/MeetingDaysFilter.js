import React from "react";
import {
	Accordion,
	AccordionSummary,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useFilterStyles from "./useFilterStyles";
import arrayToggle from "../../../../utils/arrayToggle";

export default function MeetingDaysFilter({ meetingDays, setMeetingDays }) {
	const classes = useFilterStyles();

	const toggleMeetingDays = day => {
		const newDays = arrayToggle(day, meetingDays);
		setMeetingDays(newDays);
	};

	return (
		<FormControl component="fieldset" className={classes.filterChild}>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<FormLabel component="legend">Meeting Days</FormLabel>
				</AccordionSummary>
				<FormGroup>
					{[
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday"
					].map(day => (
						<FormControlLabel
							key={day}
							control={
								<Checkbox
									checked={meetingDays.includes(day)}
									onChange={() => toggleMeetingDays(day)}
									value={day}
								/>
							}
							label={day}
							className={classes.accordionChild}
						/>
					))}
				</FormGroup>
			</Accordion>
		</FormControl>
	);
}
