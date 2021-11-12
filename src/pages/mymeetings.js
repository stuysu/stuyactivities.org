import React, {useState} from "react";
import UserContext from "../comps/context/UserContext";
import { Helmet } from "react-helmet";
import { Typography } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import FlexCenter from "../comps/ui/FlexCenter";
import Calendar from "../comps/Calendar";
import SignInRequired from "../comps/ui/SignInRequired";



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

const now = new Date();
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

function MyMeetings() {
    const user = React.useContext(UserContext);
    const audits = user?.adminRoles?.find(role => role.role === "audits") !== undefined;

    // TODO: this is in place of meetingsByUserId on 
    // backend maybe, or even in the user context
    let organizations = new Set();
    for (let membership of user?.memberships) {
        organizations.add(membership.organization.id);
    }

    const [start, setStart] = useState(firstDay);
	const [end, setEnd] = useState(lastDay);

	const { data } = useQuery(QUERY, { variables: { start, end } });

    return (<div>
        <br />
        <br />
        <Typography align={"center"} variant={"h2"} paragraph>
            {user?.name}'s Calendar
        </Typography>
        <FlexCenter>
            <Calendar
                meetings={data?.meetings
                    ?.filter(meeting => organizations.has(meeting.organization.id) && (meeting.privacy !== "private" || audits || user?.isFaculty))
                    .map(meeting => {
                        const newMeeting = { ...meeting };
                        newMeeting.title = meeting.organization.name + " - " + meeting.title;
                        newMeeting.color = meeting.privacy === "private" ? "#e17055" : "#00b894";

                        return newMeeting;
                    })
                }
                setStart={setStart}
                setEnd={setEnd}
            />
        </FlexCenter>
        <br />
    </div>)
}

export default function MyMeetingsLanding() {
    const user = React.useContext(UserContext);

    return (
        <div>
            <Helmet>
                <title>Personal Meetings | StuyActivities</title>
            </Helmet>

            {user.signedIn ?
                <MyMeetings /> :
                <SignInRequired />
            }
        </div>
    );
}