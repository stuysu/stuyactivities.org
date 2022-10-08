import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import FlexCenter from "../comps/ui/FlexCenter";
import UserContext from "../comps/context/UserContext";
import { Calendar, FirstDay, LastDay } from "../comps/Calendar";

const QUERY = gql`
	query ($start: DateTime!, $end: DateTime!) {
		meetings(start: $start, end: $end) {
			id
			title
			start
			end
			privacy
			organization {
				id
				name
			}
			rooms {
				name
			}
		}
	}
`;

const Meetings = () => {
	const user = React.useContext(UserContext);
	const audits = user?.adminRoles?.find(role => role.role === "audits") !== undefined;

	const [start, setStart] = useState(FirstDay);
	const [end, setEnd] = useState(LastDay);

	const { data } = useQuery(QUERY, { variables: { start, end } });

	return (
		<div>
			<br />
			<br />
			<Typography align={"center"} variant={"h2"} paragraph>
				All Meetings Calendar
			</Typography>
			<FlexCenter>
				<Calendar
					// give calendar meetings objects
					meetings={data?.meetings
						?.filter(meeting => meeting.privacy !== "private" || audits || user?.isFaculty)
						.map(meeting => {
							const newMeeting = { ...meeting };
							const meetingRoom =
								typeof meeting.rooms[0] === "undefined" ? "" : `: Room ${meeting.rooms[0].name}`;
							newMeeting.title = meeting.organization.name + " - " + meeting.title + meetingRoom;
							newMeeting.color = meeting.privacy === "private" ? "#e17055" : "#00b894";
							return newMeeting;
						})}
					// passing down start and end allows the parent component
					// full control on how the meetings are sourced
					setStart={setStart}
					setEnd={setEnd}
					height={800}
				/>
			</FlexCenter>
			<br />
		</div>
	);
};

export default Meetings;
