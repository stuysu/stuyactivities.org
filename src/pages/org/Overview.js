import React from "react";
import { OrgContext } from "./index";
import FlexCenter from "../../comps/ui/FlexCenter";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MeetingCards from "../../comps/pages/organization/MeetingCards";
import Link from "@material-ui/core/Link";
import Linkify from "linkifyjs/react";

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

				<Typography paragraph>
					{!org.active && !org.charter.mission && (
						<span style={{ color: "grey" }}>This response is pending approval</span>
					)}
					{org.charter.mission}
				</Typography>

				<Typography variant={"h6"} color={"primary"}>
					Meeting Schedule:
				</Typography>

				<Typography paragraph>
					{!org.active && !org.charter.meetingSchedule && (
						<span style={{ color: "grey" }}>This response is pending approval</span>
					)}
					<Linkify
						options={{
							tagName: "span",
							format: function (value, type) {
								return (
									<Link href={value} target={"_blank"} color={"secondary"}>
										{value}
									</Link>
								);
							}
						}}
					>
						{org.charter.meetingSchedule}
					</Linkify>
				</Typography>

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
									<Typography>{membership.user.name}</Typography>
									<Typography color={"textSecondary"} variant={"subtitle2"}>
										{membership.role}
									</Typography>
									<Typography color={"textSecondary"} variant={"subtitle2"}>
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

				{!org.upcomingMeetings?.length && (
					<span style={{ color: "grey" }}>There currently are no upcoming meetings scheduled.</span>
				)}

				<MeetingCards meetings={org.upcomingMeetings} />
			</div>
		</FlexCenter>
	);
};

export default Overview;
