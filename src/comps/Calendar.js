import React from "react";
import { makeStyles } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { triggerMeetingDialog } from "../comps/meetings/MeetingPreviewDialog";

const useStyles = makeStyles(theme => ({
	calendarContainer: {
		width: 1200,
		maxWidth: "95%"
	},
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
		<div className={classes.calendarContainer}>
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
		</div>
	);
}
