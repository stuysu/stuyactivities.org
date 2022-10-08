import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "./context/ThemeProvider";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { triggerMeetingDialog } from "./meetings/MeetingPreviewDialog";
import classes from "../styles/Calendar.module.css";

const BaseStyle = {
	width: 1200,
	maxWidth: "95%",
	// see https://github.com/stuysu/stuyactivities.org/pull/601#discussion_r979145428
	fontSize: "0.875rem"
};

// find the first & last days of month
const now = new Date();
export const FirstDay = new Date(now.getFullYear(), now.getMonth(), 1);
export const LastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const DarkBox = styled(Box)({
	"--fc-today-bg-color": "rgba(255, 255, 255, 0.05)",
	"--fc-page-bg-color": "rgb(18,18,18)",
	"--fc-list-event-hover-bg-color": "rgba(255, 255, 255, 0.05)"
});

export function Calendar({ meetings, setStart = undefined, setEnd = undefined, height = undefined, sx = BaseStyle }) {
	const theme = React.useContext(ThemeContext);
	const CalendarBox = theme.colorMode ? DarkBox : Box;
	// check that both React useState functions are defined, if not, return undefined
	const dateState =
		setStart &&
		setEnd &&
		(ev => {
			setStart(ev.view.activeStart);
			setEnd(ev.view.activeEnd);
		});

	return (
		<CalendarBox sx={sx}>
			<FullCalendar
				height={height}
				datesSet={dateState}
				viewDidMount={dateState}
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
		</CalendarBox>
	);
}
