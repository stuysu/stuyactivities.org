import React from "react";
import {
	Grid,
	Typography,
	List,
	ListItemAvatar,
	ListItem,
	ListItemText,
	Avatar,
	Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	item: {
		width: "100%",
		float: "left"

	}
}));

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

export default function CatalogCard({ name, url, charter }) {
	const classes = useStyles();
	return (
		<Grid item xs={12}>
			<List>
				<Paper className={classes.item}>
					<ListItemLink href={`/${url}`}>
						<ListItemAvatar>
							<Avatar src={charter.picture} />
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
										 <br/>
										 {"Commitment Level: " + charter.commitmentLevel}
									 </Typography>
								 </React.Fragment>
							 }
						/>
					</ListItemLink>
				</Paper>
			</List>
		</Grid>

	);
}
