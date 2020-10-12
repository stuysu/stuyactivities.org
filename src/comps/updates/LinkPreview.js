import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";

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

const clampString = (str, len) => {
	if (str.length > len) {
		return str.substr(0, len) + "...";
	}

	return str;
};

function LinkPreview({ title, description, image, url, siteName }) {
	const classes = useStyles();

	const confirmDialog = async () => {
		window.open(url);
	};

	const shortTitle = typeof title === "string" ? clampString(title, 60) : title;
	const shortDescription = typeof description === "string" ? clampString(description, 115) : description;

	const domain = new window.URL(url).hostname;

	return (
		<List className={classes.list}>
			<ListItem onClick={confirmDialog}>
				<ListItemAvatar>
					<Avatar alt={title} src={image} />
				</ListItemAvatar>
				<ListItemText
					primary={shortTitle}
					secondary={
						<>
							{shortDescription}
							<Typography>{domain}</Typography>
						</>
					}
				/>
			</ListItem>
		</List>
	);
}

export default LinkPreview;
