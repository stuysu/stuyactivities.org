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

const useStyles = makeStyles(() => ({
	item: {
		width: "100%",
		float: "left"
	},
	avatar: {
		height: "20%"
	}
}));

export default function CatalogCard({ name, url, charter }) {
	const classes = useStyles();
	return (
		<Grid item xs={12}>
			<List>
				<Paper className={classes.item}>
					<UnstyledLink to={`/${url}`}>
						<ListItem>
							<ListItemAvatar>
								<Avatar src={charter.picture} variant={"square"} className={classes.avatar}/>
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
											{"Commitment Level: " +
												charter.commitmentLevel}
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
