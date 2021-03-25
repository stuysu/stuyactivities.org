import React from "react";
import { OrgContext } from "./index";
import FlexCenter from "../../comps/ui/FlexCenter";
import { Typography, useMediaQuery } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MeetingCard from "../../comps/meetings/MeetingCard";
import LinkifyText from "../../comps/ui/LinkifyText";
import Masonry from "react-masonry-css";
import UpdateCard from "../../comps/updates/UpdateCard";
import ListItemText from "@material-ui/core/ListItemText";
import UnstyledLink from "../../comps/ui/UnstyledLink";

const Overview = () => {
	const org = React.useContext(OrgContext);
	const isMobile = useMediaQuery("(max-width: 900px)");

	return (
		<FlexCenter>
			<div style={{ width: "100%" }}>
				<Typography variant={"h2"} style={{ textAlign: "center" }}>
					Overview
				</Typography>

				<Typography variant={"h5"} color={"primary"}>
					Mission:
				</Typography>

				<Typography paragraph>
					{!org.active && !org.charter.mission && (
						<span style={{ color: "grey" }}>This response is pending approval</span>
					)}
					{org.charter.mission}
				</Typography>

				<Typography variant={"h5"} color={"primary"}>
					Meeting Schedule:
				</Typography>

				<Typography paragraph>
					{!org.active && !org.charter.meetingSchedule && (
						<span style={{ color: "grey" }}>This response is pending approval</span>
					)}
					<LinkifyText>{org.charter.meetingSchedule}</LinkifyText>
				</Typography>

				<Typography variant={"h5"} color={"primary"}>
					Leaders
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

				<Typography variant={"h5"} color={"primary"}>
					Upcoming Meetings
				</Typography>
				<br />

				{!org.upcomingMeetings?.length && (
					<span style={{ color: "grey" }}>There currently are no upcoming meetings scheduled.</span>
				)}

				<Masonry
					breakpointCols={isMobile ? 1 : 2}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{org.upcomingMeetings.map(meeting => (
						<MeetingCard {...meeting} key={meeting.id} />
					))}
				</Masonry>

				<Typography variant={"h5"} color={"primary"}>
					Posts
				</Typography>
				<br />
				<Masonry
					breakpointCols={isMobile ? 1 : 2}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{org.updates.map(update => (
						<UpdateCard {...update} key={update.id} organization={org} />
					))}
				</Masonry>

				{!org.updates?.length && (
					<span style={{ color: "grey" }}>This activity has not made any posts yet.</span>
				)}

				{
					<UnstyledLink to={`/${org.url}`}>
						<ListItem button>
							<ListItemAvatar>
								<Avatar alt={org?.name} src={org?.charter?.picture?.thumbnail} />
							</ListItemAvatar>
							<ListItemText primary={org?.name} />
						</ListItem>
					</UnstyledLink>
				}
			</div>
		</FlexCenter>
	);
};

export default Overview;
