import React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";

import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import smartTimespan from "../../utils/smartTimespan";
import { triggerMeetingDialog } from "./MeetingPreviewDialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const classes = {
	card: {
		position: "relative"
	},
	meetingContent: {
		padding: "0 1rem",
		overflow: "auto"
	},
	orgHeading: {
		cursor: "pointer",
		"&:hover": {
			opacity: 0.9
		}
	},
	descriptionContainer: {
		overflowWrap: "anywhere"
	},
	title: {
		fontWeight: 700
	},
	buttonContainer: {
		width: "100%",
		height: "50px",
		bottom: 0
	}
};

const MeetingCard = ({
	id,
	title,
	start,
	end,
	organization,
	sx,
	dayOfWeek,
	frequency,
	description,
	privacy,
	group,
	rooms
}) => {
	const history = useHistory();

	const showOrganization = organization && organization.name && organization.url;

	const navigateToOrg = () => {
		if (showOrganization) {
			history.push(organization.url);
		}
	};

	return (
		<Card variant={"outlined"} sx={[...(Array.isArray(sx) ? sx : [sx]), classes.card]}>
			{Boolean(showOrganization) && (
				<List>
					<ListItem sx={classes.orgHeading}>
						<ListItemAvatar onClick={navigateToOrg}>
							<Avatar alt={organization?.name} src={organization?.charter?.picture?.thumbnail} />
						</ListItemAvatar>
						<ListItemText primary={organization?.name} onClick={navigateToOrg} />
					</ListItem>
				</List>
			)}
			<Box sx={classes.meetingContent}>
				<Typography variant={"h5"} sx={classes.title}>
					{title}
				</Typography>
				<Typography paragraph color={"secondary"}>
					{frequency
						? `${moment(dayOfWeek, "d").format("dddd")}s, every ${frequency} week(s), ${moment(
								start,
								"HH:mm:ss.SSSZ"
						  ).format("h:mm a")} to ${moment(end, "HH:mm:ss.SSSZ").format("h:mm a")}`
						: smartTimespan(new Date(start), new Date(end))}
					<br />
					Location: {rooms?.length ? rooms[0].name : "Virtual"}
					<br />
					{privacy === "public" ? "Public" : `Private (${group?.id ? group.name : "members only"})`}
				</Typography>

				{frequency ? (
					description && (
						<Typography
							paragraph
							// TODO: investigate if this works
							sx={classes.descriptionContainer}
							className="HtmlContent"
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					)
				) : (
					<Box sx={classes.buttonContainer}>
						<Button variant={"contained"} color={"secondary"} onClick={() => triggerMeetingDialog(id)}>
							View More
						</Button>
					</Box>
				)}
			</Box>
		</Card>
	);
};

export default MeetingCard;
