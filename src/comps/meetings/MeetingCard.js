import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import smartTimespan from "../../utils/smartTimespan";
import MarkdownRenderer from "../ui/MarkdownRenderer";

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
		overflowWrap: "anywhere"
	},
	title: {
		fontWeight: 700
	}
});

const MeetingCard = ({ id, title, description, start, end, organization, privacy, className }) => {
	const classes = useStyles();
	const history = useHistory();

	const showOrganization = organization && organization.name && organization.url;

	const navigateToOrg = () => {
		if (showOrganization) {
			history.push(organization.url);
		}
	};

	return (
		<Card variant={"outlined"} className={className}>
			{Boolean(showOrganization) && (
				<List>
					<ListItem className={classes.orgHeading}>
						<ListItemAvatar onClick={navigateToOrg}>
							<Avatar alt={organization?.name} src={organization?.charter?.picture} />
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
					{smartTimespan(new Date(start), new Date(end))}
				</Typography>
				<div className={classes.descriptionContainer}>
					<MarkdownRenderer>{description}</MarkdownRenderer>
				</div>
			</div>
		</Card>
	);
};

export default MeetingCard;
