import React from "react";
import { Typography, Grid, Card } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import moment from "moment-timezone";
export default function MeetingCards({ meetings }) {
	return (
		<Grid container spacing={1}>
			{meetings.map(meeting => {
				const formattedStart = moment(meeting.start)
					.tz("America/New_York")
					.format("dddd, MMMM Do YYYY, h:mm a");

				const formattedEnd = moment(meeting.end).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm a");

				return (
					<Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={meeting.id}>
						<Card style={{ padding: "1rem" }}>
							<Typography variant={"h6"} color={"secondary"}>
								{meeting.title}
							</Typography>
							<p>Starts: {formattedStart}</p>
							<p>Ends: {formattedEnd}</p>
							<ReactMarkdown source={meeting.description} />
						</Card>
					</Grid>
				);
			})}
		</Grid>
	);
}
