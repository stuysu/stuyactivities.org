import React, { useState } from "react";
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
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
const Overview = () => {
	const org = React.useContext(OrgContext);
	const isMobile = useMediaQuery("(max-width: 900px)");
	const [relatedClubs, setRelatedClubs] = useState(4);
	const [showMore, setShowMore] = useState(true);
	const ids = [];
	org.tags.forEach(n => {
		ids.push(n.id);
	});
	const relatedQuery = gql`{
		organizations(tags: ${"[" + ids + "]"}) {
			name
			tags {
				id
			}
			url 
			charter {
				picture {
					url
					icon: url(width: 200, height: 200, crop: thumb, gravity: center)
					thumbnail(width: 80, height: 80)
					tinyThumbnail: thumbnail(width: 40, height: 40)
				}
			}
		}
	}`;
	const { data, loading } = useQuery(relatedQuery);

	if (loading) {
		return null;
	}
	if (!loading) {
		// get how many tags are shared and sort
		const orgs = data.organizations;
		const tempOrgList = [];
		orgs.forEach(n => {
			const orgIds = [];
			n.tags.forEach(j => {
				orgIds.push(j.id);
			});
			let common = 0;
			ids.forEach(i => {
				orgIds.forEach(k => {
					if (i === k) {
						common++;
					}
				});
			});
			tempOrgList.push([n, common]);
		});
		var orgList = tempOrgList.sort().reverse().slice(0, relatedClubs);
	}

	const handleRelatedClubs = () => {
		if (relatedClubs + 3 <= data.organizations.length) {
			setRelatedClubs(relatedClubs + 3);
		} else {
			setRelatedClubs(relatedClubs + (data.organizations.length % 3));
			setShowMore(false);
		}
	};

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
				<Typography variant={"h5"} color={"primary"}>
					Related Clubs
				</Typography>
				<List>
					{orgList.map(relatedOrg => {
						if (relatedOrg[0].name !== org.name) {
							const url = "/" + relatedOrg[0].url;
							return (
								<ListItem key={relatedOrg[0].name} button component="a" href={url}>
									<ListItemAvatar>
										<Avatar src={relatedOrg[0].charter.picture.icon} />
									</ListItemAvatar>
									<span>
										<Typography>{relatedOrg[0].name}</Typography>
									</span>
								</ListItem>
							);
						}
						return null;
					})}
				</List>
				{showMore ? (
					<Button color={"primary"} onClick={handleRelatedClubs}>
						Show More
					</Button>
				) : (
					<></>
				)}
			</div>
		</FlexCenter>
	);
};

export default Overview;

