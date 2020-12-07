import React from "react";
import { useQuery, gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

const meetingQuery = gql`
	{
		organizations {
			name
			meetings {
				description
				start
				end
			}
		}
	}
`;

const useStyles = makeStyles(theme => ({
	table: {
		margin: "auto",
		padding: "2rem"
	}
}));

function MeetingViewer() {
	const classes = useStyles();

	const { data, loading } = useQuery(meetingQuery);

	const timeOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric"
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	const findZoom = desc => {
		let re = /https:\/\/(us02web\.)*zoom.us\/j\/.+?\s/;
		let matches = re.exec(desc);
		if (matches !== null) {
			return matches[0];
		}
		return [];
	};

	return (
		<div>
			<table border="2" className={classes.table}>
				<thead>
					<td>Club Name</td>
					<td>Start</td>
					<td>End</td>
					<td>Description</td>
					<td>Zoom Link</td>
				</thead>
				{data.organizations.map(org => {
					return org.meetings.map(meeting => {
						let start_time = new Date(meeting.start);
						let end_time = new Date(meeting.end);

						if (end_time < new Date().getTime()) {
							return "";
						}

						return (
							<tr>
								<td>{org.name}</td>
								<td>{start_time.toLocaleDateString("en-US", timeOptions)}</td>
								<td>{end_time.toLocaleDateString("en-US", timeOptions)}</td>
								<td>{meeting.description}</td>
								<td>{meeting.description !== null ? findZoom(meeting.description) : ""}</td>
							</tr>
						);
					});
				})}
			</table>
		</div>
	);
}

export default MeetingViewer;
