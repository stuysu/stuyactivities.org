import React from "react";
import { OrgContext } from "./index";
import { Box, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import Grid from "@mui/material/Grid";
import MeetingCard from "../../comps/meetings/MeetingCard";
import { triggerMeetingDialog } from "../../comps/meetings/MeetingPreviewDialog";

const classes = {
	margin: {
		margin: 1
	},
	calendarContainer: {
		width: 850,
		maxWidth: "100%"
	}
};

export default function Meetings() {
	const org = React.useContext(OrgContext);
	return (
		<Box sx={classes.margin}>
			<Typography variant={"h2"} align={"center"}>
				Meetings
			</Typography>
			{org.recurringMeetings?.length > 0 && (
				<>
					<Typography variant={"h4"}>Recurring Meetings</Typography>
					<Grid container>
						{org.recurringMeetings.map(meeting => (
							<Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
								<MeetingCard {...meeting} />
							</Grid>
						))}
					</Grid>
				</>
			)}
			<Typography variant={"h4"}>Upcoming Meetings</Typography>
			<br />
			{org.upcomingMeetings?.length ? (
				<Grid container>
					{org.upcomingMeetings.map(meeting => (
						<Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
							<MeetingCard {...meeting} />
						</Grid>
					))}
				</Grid>
			) : (
				<span style={{ color: "grey" }}>There currently are no upcoming meetings scheduled.</span>
			)}
			<br />
			<Typography variant={"h4"}>All Meetings</Typography>
			<br />

			<Box sx={classes.calendarContainer}>
				<FullCalendar
					plugins={[dayGridPlugin, listPlugin]}
					headerToolbar={{
						start: "title",
						end: "dayGridMonth listMonth prev next"
					}}
					events={org?.meetings.map(meeting => {
						const newMeeting = { ...meeting };
						newMeeting.title +=
							typeof meeting.rooms[0] === "undefined" ? "" : `: Room ${meeting.rooms[0].name}`;
						return newMeeting;
					})}
					eventClick={ev => triggerMeetingDialog(ev.event.id)}
				/>
			</Box>
		</Box>
	);
}
