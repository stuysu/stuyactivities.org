import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import UserContext from "../context/UserContext";
import Loading from "../ui/Loading";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import MeetingCard from "../meetings/MeetingCard";
import { Typography } from "@mui/material";
import { client } from "../context/ApolloProvider";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 3
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 2
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};

const QUERY = gql`
	query ($userId: Int!) {
		meetings: upcomingUserMeetings(userId: $userId) {
			id
			title
			description
			start
			end
			group {
				id
				name
			}
			organization {
				id
				name
				url
				charter {
					picture {
						thumbnail: url(width: 100, height: 100)
						url
					}
				}
			}
			rooms {
				id
				name
			}
			privacy
		}
	}
`;

const classes = {
	meetingCard: {
		margin: "0 0.5rem",
		minHeight: 250
	},
	title: {
		marginLeft: "0.5rem"
	}
};

const UserMeetings = () => {
	const user = useContext(UserContext);
	const { data, loading } = useQuery(QUERY, { variables: { userId: user.id }, client });

	if (loading) {
		return (
			<div>
				<Typography variant={"h3"} color={"primary"}>
					My Upcoming Meetings:
				</Typography>
				<Loading />
			</div>
		);
	}
	return (
		<div>
			<Typography variant={"h3"} color={"primary"} sx={classes.title}>
				My Upcoming Meetings:
			</Typography>

			<Carousel responsive={responsive}>
				{data.meetings.map(meeting => (
					<MeetingCard {...meeting} key={meeting.id} sx={classes.meetingCard} />
				))}
			</Carousel>

			{!data.meetings.length && (
				<Typography paragraph color={"secondary"}>
					You don't have any upcoming meetings. When any club that you are a member of creates a meeting
					you'll see it here.
				</Typography>
			)}
		</div>
	);
};

export default UserMeetings;
