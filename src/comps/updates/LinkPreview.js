import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
	list: {
		border: "1px solid lightgrey",
		borderRadius: 5,
		cursor: "pointer",
		"&:hover": {
			opacity: 0.9
		},
		margin: "0.5rem 0"
	},
	icon: {
		height: 70,
		width: 70,
		objectFit: "contain"
	}
});

function LinkPreview({ title, description, image, url, siteName }) {
	const classes = useStyles();

	const confirmDialog = async () => {
		window.open(url);
	};

	return (
		<List className={classes.list}>
			<ListItem onClick={confirmDialog}>
				<ListItemAvatar>
					<Avatar alt={title} src={image} />
				</ListItemAvatar>
				<ListItemText primary={title} secondary={description} />
			</ListItem>
		</List>
	);
}

export default LinkPreview;
