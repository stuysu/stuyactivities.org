import React, { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { triggerMeetingDialog } from "../comps/meetings/MeetingPreviewDialog";
import FullCalendar from "@fullcalendar/react";
import { gql, useQuery } from "@apollo/client";
import Loading from "../comps/ui/Loading";

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
		}
	}
`;

const Meetings = () => {
	const [start, setStart] = useState(firstDay);
	const [end, setEnd] = useState(lastDay);

	const { data, loading } = useQuery(QUERY, { variables: { start, end } });

	if (loading) {
		return <Loading />;
	}

	return (
		<div>
			<FullCalendar
				viewDidMount={ev => {
					setStart(ev.view.activeStart);
					setEnd(ev.view.activeEnd);
				}}
				plugins={[dayGridPlugin, listPlugin]}
				headerToolbar={{
					start: "title",
					end: "dayGridMonth dayGridWeek listYear prev next"
				}}
				events={data.meetings}
				eventClick={ev => triggerMeetingDialog(ev.event.id)}
			/>
		</div>
	);
};

export default Meetings;
