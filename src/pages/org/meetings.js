import React from "react";
import { OrgContext } from "./index";
import { makeStyles, Typography } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import Grid from "@material-ui/core/Grid";
import MeetingCard from "../../comps/meetings/MeetingCard";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1)
	},
	calendarContainer: {
		width: 850,
		maxWidth: "100%"
	}
}));

export default function Meetings() {
	const classes = useStyles();
	const org = React.useContext(OrgContext);
	return (
		<div className={classes.margin}>
			<Typography variant={"h2"} align={"center"}>
				Meetings
			</Typography>
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


			<div className={classes.calendarContainer}>
				<FullCalendar
					plugins={[dayGridPlugin, listPlugin]}
					headerToolbar={{
						start: "title",
						end: "dayGridMonth dayGridWeek listYear prev next"
					}}
					dayPopover
					events={org.meetings}
				/>
			</div>
		</div>
	);
}
