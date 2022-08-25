import React from "react";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { triggerMeetingDialog } from "./meetings/MeetingPreviewDialog";

const useStyles = makeStyles(theme => ({
	event: {
		cursor: "pointer"
	}
}));

// find the first & last days of month
const now = new Date();
export const FirstDay = new Date(now.getFullYear(), now.getMonth(), 1);
export const LastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

export function Calendar({ meetings, setStart, setEnd }) {
	const classes = useStyles();

	return (
		<Box
			sx={{
				width: 1200,
				maxWidth: "95%"
			}}
		>
			<FullCalendar
				height={800}
				datesSet={ev => {
					setStart(ev.view.activeStart);
					setEnd(ev.view.activeEnd);
				}}
				viewDidMount={ev => {
					setStart(ev.view.activeStart);
					setEnd(ev.view.activeEnd);
				}}
				plugins={[dayGridPlugin, listPlugin]}
				headerToolbar={{
					start: "title",
					end: "dayGridMonth listMonth prev next"
				}}
				dayMaxEventRows={4}
				events={meetings}
				eventClick={ev => triggerMeetingDialog(ev.event.id)}
				eventClassNames={classes.event}
			/>
		</Box>
	);
}
