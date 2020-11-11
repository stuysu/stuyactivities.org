import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import ApolloProvider from "../comps/context/ApolloProvider";

const meetingQuery = gql`
{
	organizations{
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
		padding: "2rem",
	}
}));


function Meeting() {
	const classes = useStyles();

	const {
		data
	} = useQuery(meetingQuery);

	const timeOptions = {
		weekday: "long",
		year: "numeric",
		month:"long",
		day:"numeric",
		hour: "numeric",
		minute: "numeric"
   };

	if (!data) {
		return (
			<div>
				Loading...
			</div>
		);
	}r

	const findZoom = (desc) => {
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
					<td>
						Club Name
					</td>
					<td>
						Start
					</td>
					<td>
						End
					</td>
					<td>
						Description
					</td>
					<td>
						Zoom Link
					</td>
				</thead>
				{data.organizations.map(org => {
					return org.meetings.map(meeting => {
						let start_time = new Date(meeting.start);
						let end_time = new Date(meeting.end);

						if (end_time < (new Date()).getTime()) {
							return "";
						}

						return (
							<tr>
								<td>
									{org.name}
								</td>
								<td>
									{start_time.toLocaleDateString("en-US", timeOptions)}
								</td>
								<td>
									{end_time.toLocaleDateString("en-US", timeOptions)}
								</td>
								<td>
									{meeting.description}
								</td>
								<td>
									{meeting.description !== null ? findZoom(meeting.description) : "" }
								</td>
							</tr>
						);
					});
				})}
			</table>

			<br />
			<br />
			<br />
			{JSON.stringify(data)}
		</div>
	);
}

export default function Viewer() {

	return (
		<ApolloProvider>
			<Meeting />
		</ApolloProvider>
	);
}