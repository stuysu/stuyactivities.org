import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "../ui/Loading";
import { Typography } from "@material-ui/core";
import smartTimespan from "../../utils/smartTimespan";
import MarkdownRenderer from "../ui/MarkdownRenderer";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

const QUERY = gql`
	query($id: Int!) {
		meetingById(id: $id) {
			id
			title
			description
			start
			end
			privacy
			organization {
				id
				name
				url
				membership {
					id
				}
				charter {
					id
					picture {
						thumbnail(width: 100, height: 100)
					}
				}
			}
		}
	}
`;

const useStyles = makeStyles({
	meetingContent: {
		padding: "0 1rem"
	},
	orgHeading: {
		cursor: "pointer",
		"&:hover": {
			opacity: 0.9
		}
	},
	descriptionContainer: {
		overflowWrap: "anywhere",
		textAlign: "left"
	},
	title: {
		fontWeight: 700
	},
	logo: {
		width: 100,
		height: 100,
		objectFit: "cover",
		borderRadius: "50%",
		cursor: "pointer",
		"&:hover": {
			opacity: 0.8
		}
	}
});

const DynamicMeetingPreview = ({ meetingId, closeDialog }) => {
	const { data, loading } = useQuery(QUERY, { variables: { id: Number(meetingId) } });
	const history = useHistory();

	const user = useContext(UserContext);

	const classes = useStyles();

	if (loading) {
		return <Loading />;
	}

	const meeting = data.meetingById;

	if (!meeting) {
		return null;
	}

	const organization = meeting.organization;

	const navigateToOrg = () => {
		closeDialog();
		history.push(`/${organization.url}`);
	};

	return (
		<div>
			<img
				src={organization.charter.picture?.thumbnail}
				className={classes.logo}
				alt={organization.name + " logo"}
				onClick={navigateToOrg}
			/>
			<Typography paragraph>
				<b>{organization.name}</b>
			</Typography>
			<hr />
			<br />
			{user.signedIn ? (
				<div className={classes.meetingContent}>
					<Typography variant={"h5"} className={classes.title}>
						{meeting.title}
					</Typography>
					<Typography paragraph color={"secondary"}>
						{smartTimespan(new Date(meeting.start), new Date(meeting.end))}
					</Typography>
					<div className={classes.descriptionContainer}>
						{!!meeting.description && <MarkdownRenderer>{meeting.description}</MarkdownRenderer>}
						{!Boolean(meeting.description) && meeting.privacy === "private" && !organization.membership && (
							<p>
								This meeting is private and the description can only be seen by members of the
								organization.
							</p>
						)}
					</div>
				</div>
			) : (
				<p>You need to be signed in to see more information about this meeting.</p>
			)}
		</div>
	);
};

export default DynamicMeetingPreview;
