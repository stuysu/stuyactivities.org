import React from "react";
import { OrgContext } from "./index";
import MeetingCards from "../../comps/pages/organization/MeetingCards";
import { Typography, makeStyles } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1)
	}
}));

export default function Meetings() {
	const classes = useStyles();
	const org = React.useContext(OrgContext);
	return (
		<div className={classes.margin}>
			<Typography variant={"h4"}>Upcoming Meetings</Typography>
			<br />
			{!org.upcomingMeetings?.length ? (
				<span style={{ color: "grey" }}>There currently are no upcoming meetings scheduled.</span>
			) : (
				<MeetingCards meetings={org.upcomingMeetings} />
			)}
			<br />
			<Typography variant={"h4"}>All Meetings</Typography>
			<br />
			{!org.meetings?.length ? (
				<span style={{ color: "grey" }}>There are no meetings scheduled.</span>
			) : (
				<FullCalendar
					plugins={[dayGridPlugin, listPlugin]}
					headerToolbar={{
						start: "title",
						center: "",
						end: "dayGridMonth dayGridWeek listYear prev next"
					}}
					events={org.meetings || []}
				/>
			)}
		</div>
	);
}
