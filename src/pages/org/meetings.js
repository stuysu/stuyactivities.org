import React from "react";
import { OrgContext } from "./index";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MeetingCard from "../../comps/meetings/MeetingCard";
import { Calendar } from "../../comps/Calendar";

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

	if (org.locked === "LOCK") {
		return (
			<Typography variant={"h2"} style={{ textAlign: "center" }}>
				Locked activities may not schedule meetings.
			</Typography>
		);
	}

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
			<Calendar
				meetings={org?.meetings.map(meeting => {
					const newMeeting = { ...meeting };
					newMeeting.title +=
						typeof meeting.rooms[0] === "undefined" ? "" : `: Room ${meeting.rooms[0].name}`;
					return newMeeting;
				})}
				sx={classes.calendarContainer}
				height={undefined}
			/>
		</Box>
	);
}
