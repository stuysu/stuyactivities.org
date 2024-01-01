import { useState } from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";

import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import smartTimespan from "../../../utils/smartTimespan";
import { triggerMeetingDialog } from "../../meetings/MeetingPreviewDialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "../../ui/Alert";

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
/* Meeting Card to let admin manage meeting */
const AdminMeetingCard = ({
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
	rooms,
	onDelete
}) => {
	const history = useHistory();

	const showOrganization = organization && organization.name && organization.url;

	const navigateToOrg = () => {
		if (showOrganization) {
			history.push(organization.url);
		}
	};

	const [deleted, setDeleted] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const del = async () => {
		setDeleted(true);
		await onDelete();
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
							sx={classes.descriptionContainer}
							className="HtmlContent"
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					)
				) : (
					<Box sx={classes.buttonContainer}>
						<Button
							variant={"contained"}
							color={"secondary"}
							onClick={() => triggerMeetingDialog(id)}
							sx={{ marginRight: "50px" }}
							disabled={deleted}
						>
							View More
						</Button>
						<Button
							variant={"contained"}
							color={"primary"}
							onClick={() => setConfirmOpen(true)}
							disabled={deleted}
						>
							Delete
						</Button>
					</Box>
				)}
			</Box>

			<Alert
				title={`Are you sure you want to delete this meeting?`}
				description={`The club members will be emailed.`}
				affirmative="Yes"
				negative="No"
				affirmativeCallback={del}
				open={confirmOpen}
				setOpen={setConfirmOpen}
			/>
		</Card>
	);
};

export default AdminMeetingCard;
