import React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import UnstyledLink from "../../ui/UnstyledLink";
import { Typography } from "@mui/material";
import PromotedClubDeleteButton from "./PromotedClubDeleteButton";
import Box from "@mui/material/Box";

const classes = {
	clubCard: {
		position: "relative",
		width: "100%",
		margin: "0.5rem 0"
	},
	orgHeading: {
		cursor: "pointer",
		"&:hover": {
			opacity: 0.9
		}
	},
	content: {
		padding: "0 1rem"
	}
};

const PromotedClubCard = ({ id, blurb, organization, showDelete = false, refetch = () => {} }) => {
	return (
		<Card variant={"outlined"} sx={classes.clubCard}>
			<List>
				<UnstyledLink to={`/${organization.url}`}>
					<ListItem sx={classes.orgHeading}>
						<ListItemAvatar>
							<Avatar alt={organization?.name} src={organization?.charter?.picture?.thumbnail} />
						</ListItemAvatar>
						<ListItemText primary={organization?.name} />
					</ListItem>
				</UnstyledLink>
				{showDelete && (
					<ListItemSecondaryAction>
						<PromotedClubDeleteButton promotionId={id} refetch={refetch} />
					</ListItemSecondaryAction>
				)}
			</List>
			<Box sx={classes.content}>
				<Typography paragraph>{blurb}</Typography>
			</Box>
		</Card>
	);
};

export default PromotedClubCard;
