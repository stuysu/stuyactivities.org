import React, { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { triggerMeetingDialog } from "../comps/meetings/MeetingPreviewDialog";
import FullCalendar from "@fullcalendar/react";
import { gql, useQuery } from "@apollo/client";
import { makeStyles, Typography } from "@material-ui/core";
import FlexCenter from "../comps/ui/FlexCenter";

const now = new Date();
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const QUERY = gql`
	query($start: DateTime!, $end: DateTime!) {
		meetings(start: $start, end: $end) {
			id
			title
			start
			end
			organization {
				id
				name
			}
		}
	}
`;

const useStyles = makeStyles(theme => ({
	calendarContainer: {
		width: 1200,
		maxWidth: "95%"
	}
}));

const Meetings = () => {
	const [start, setStart] = useState(firstDay);
	const [end, setEnd] = useState(lastDay);

	const { data } = useQuery(QUERY, { variables: { start, end } });
	const classes = useStyles();

	return (
		<div>
			<br />
			<br />
			<Typography align={"center"} variant={"h2"} paragraph>
				All Meetings Calendar
			</Typography>
			<FlexCenter>
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
							end: "dayGridMonth dayGridWeek listYear prev next"
						}}
						dayMaxEventRows={4}
						events={data?.meetings?.map(a => {
							const newMeeting = { ...a };
							newMeeting.title = a.organization.name + " - " + a.title;
							return newMeeting;
						})}
						eventClick={ev => triggerMeetingDialog(ev.event.id)}
					/>
				</div>
			</FlexCenter>
			<br />
		</div>
	);
};

export default Meetings;
