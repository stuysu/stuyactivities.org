import React from "react";
import Card from "@mui/material/Card";
import makeStyles from "@mui/styles/makeStyles";
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

const useStyles = makeStyles({
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
});

const MeetingCard = ({
	id,
	title,
	start,
	end,
	organization,
	className,
	dayOfWeek,
	frequency,
	description,
	privacy,
	group,
	rooms
}) => {
	const classes = useStyles();
	const history = useHistory();

	const showOrganization = organization && organization.name && organization.url;

	const navigateToOrg = () => {
		if (showOrganization) {
			history.push(organization.url);
		}
	};

	return (
		<Card variant={"outlined"} className={className + " " + classes.card}>
			{Boolean(showOrganization) && (
				<List>
					<ListItem className={classes.orgHeading}>
						<ListItemAvatar onClick={navigateToOrg}>
							<Avatar alt={organization?.name} src={organization?.charter?.picture?.thumbnail} />
						</ListItemAvatar>
						<ListItemText primary={organization?.name} onClick={navigateToOrg} />
					</ListItem>
				</List>
			)}
			<div className={classes.meetingContent}>
				<Typography variant={"h5"} className={classes.title}>
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
							className={classes.descriptionContainer + " HtmlContent"}
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					)
				) : (
					<div className={classes.buttonContainer}>
						<Button variant={"contained"} color={"secondary"} onClick={() => triggerMeetingDialog(id)}>
							View More
						</Button>
					</div>
				)}
			</div>
		</Card>
	);
};

export default MeetingCard;
