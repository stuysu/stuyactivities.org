import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import UnstyledLink from "../../ui/UnstyledLink";
import { Typography } from "@material-ui/core";
import PromotedClubDeleteButton from "./PromotedClubDeleteButton";

const useStyles = makeStyles({
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
});

const PromotedClubCard = ({ id, blurb, organization, showDelete = false, refetch = () => {} }) => {
	const classes = useStyles();

	return (
		<Card variant={"outlined"} className={classes.clubCard}>
			<List>
				<UnstyledLink to={`/${organization.url}`}>
					<ListItem className={classes.orgHeading}>
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
			<div className={classes.content}>
				<Typography paragraph>{blurb}</Typography>
			</div>
		</Card>
	);
};

export default PromotedClubCard;
