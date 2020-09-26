import React from "react";
import {
	Avatar,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UnstyledLink from "../../ui/UnstyledLink";
import Chip from "@material-ui/core/Chip";
import capitalizeString from "../../../utils/capitalizeString";

const useStyles = makeStyles(theme => ({
	item: {
		width: "100%",
		float: "left"
	},
	avatar: {
		marginRight: "18px",
		width: theme.spacing(8),
		height: theme.spacing(8)
	},
	chip: {
		marginTop: "0.3rem",
		marginRight: "5px"
	}
}));

function Tag({ name }) {
	const classes = useStyles();

	return <Chip label={name} size={"small"} className={classes.chip} />;
}

export default function CatalogCard({ name, url, charter, tags }) {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<List>
				<Paper className={classes.item}>
					<UnstyledLink to={`/${url}`}>
						<ListItem>
							<ListItemAvatar>
								<Avatar
									src={charter.picture}
									className={classes.avatar}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={
									<React.Fragment>
										<Typography variant={"h5"}>
											{name}
										</Typography>
									</React.Fragment>
								}
								secondary={
									<React.Fragment>
										<Typography variant={"body1"}>
											{charter.mission}
											<br />
											<Chip
												label={
													capitalizeString(
														charter.commitmentLevel
													) + " Commitment"
												}
												size={"small"}
												className={classes.chip}
											/>
											{tags.map(tag => (
												<Tag
													name={tag.name}
													key={tag.id}
												/>
											))}
										</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>
					</UnstyledLink>
				</Paper>
			</List>
		</Grid>
	);
}
