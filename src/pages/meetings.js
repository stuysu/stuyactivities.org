import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Typography } from "@material-ui/core";
import FlexCenter from "../comps/ui/FlexCenter";
import UserContext from "../comps/context/UserContext";
import Calendar from "../comps/Calendar";

const now = new Date();
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

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
		}
	}
`;

const Meetings = () => {
	const user = React.useContext(UserContext);
	const audits = user?.adminRoles?.find(role => role.role === "audits") !== undefined;

	const [start, setStart] = useState(firstDay);
	const [end, setEnd] = useState(lastDay);

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
                            newMeeting.title = meeting.organization.name + " - " + meeting.title;
                            newMeeting.color = meeting.privacy === "private" ? "#e17055" : "#00b894";

                            return newMeeting;
                        })
                    }

                    // passing down start and end allows the parent component
                    // full control on how the meetings are sourced
                    setStart={setStart}
                    setEnd={setEnd}
                />
			</FlexCenter>
			<br />
		</div>
	);
};

export default Meetings;
