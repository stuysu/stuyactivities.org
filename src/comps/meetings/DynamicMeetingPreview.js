import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "../ui/Loading";
import { Typography } from "@mui/material";
import smartTimespan from "../../utils/smartTimespan";
import makeStyles from "@mui/styles/makeStyles";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

const QUERY = gql`
	query ($id: Int!) {
		meetingById(id: $id) {
			id
			title
			description
			start
			end
			privacy
			rooms {
				id
				name
			}
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
						<br />
						Location: {meeting.rooms.length ? meeting.rooms[0].name : "Virtual"}
						<br />
						{meeting.privacy === "public"
							? "Public"
							: `Private (${meeting.group?.id ? meeting.group.name : "members only"})`}
					</Typography>
					<div
						className={classes.descriptionContainer + " HtmlContent"}
						dangerouslySetInnerHTML={{ __html: meeting.description }}
					/>
				</div>
			) : (
				<p>You need to be signed in to see more information about this meeting.</p>
			)}
		</div>
	);
};

export default DynamicMeetingPreview;
