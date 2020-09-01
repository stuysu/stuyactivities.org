import React from "react";
import { OrgContext } from "./OrgRouter";
import FlexCenter from "../../ui/FlexCenter";
import { Grid, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import ReactMarkdown from "react-markdown";
import moment from "moment-timezone";

const Overview = () => {
	const org = React.useContext(OrgContext);

	return (
		<FlexCenter>
			<div style={{ width: "100%" }}>
				<Typography variant={"h4"} style={{ textAlign: "center" }}>
					Overview
				</Typography>
				<Typography variant={"h6"} color={"primary"}>
					Mission:
				</Typography>
				<Typography paragraph>{org.charter.mission}</Typography>
				<Typography variant={"h6"} color={"primary"}>
					Meeting Schedule:
				</Typography>
				<Typography paragraph>{org.charter.meetingSchedule}</Typography>
				<br />

				<Typography variant={"h6"} color={"primary"}>
					Leaders{" "}
				</Typography>
				<List>
					{org.leaders.map(membership => {
						return (
							<ListItem key={membership.user.id} button>
								<ListItemAvatar>
									<Avatar src={membership.user.picture} />
								</ListItemAvatar>
								<span>
									<Typography>
										{membership.user.name}
									</Typography>
									<Typography
										color={"textSecondary"}
										variant={"subtitle2"}
									>
										{membership.role}
									</Typography>
									<Typography
										color={"textSecondary"}
										variant={"subtitle2"}
									>
										{membership.user.email}
									</Typography>
								</span>
							</ListItem>
						);
					})}
				</List>

				<Typography variant={"h6"} color={"primary"}>
					Upcoming Meetings
				</Typography>
				<br />
				<Grid>
					{org.upcomingMeetings.map(meeting => {
						const start = new Date(Number(meeting.start));
						const end = new Date(Number(meeting.end));

						const formattedStart = moment(start)
							.tz("America/New_York")
							.format("dddd, MMMM Do YYYY, h:mm a");

						const formattedEnd = moment(end)
							.tz("America/New_York")
							.format("dddd, MMMM Do YYYY, h:mm a");

						return (
							<Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
								<Card style={{ padding: "1rem" }}>
									<Typography
										variant={"h6"}
										color={"secondary"}
									>
										{meeting.title}
									</Typography>
									<p>Starts: {formattedStart}</p>
									<p>Ends: {formattedEnd}</p>
									<ReactMarkdown
										source={meeting.description}
									/>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</div>
		</FlexCenter>
	);
};

export default Overview;
