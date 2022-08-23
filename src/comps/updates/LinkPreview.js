import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

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
	},
	anchor: {
		textDecoration: "none",
		color: "unset"
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

	const shortTitle = typeof title === "string" ? clampString(title, 60) : title;
	const shortDescription = typeof description === "string" ? clampString(description, 115) : description;

	const domain = new window.URL(url).hostname;

	return (
		<List className={classes.list}>
			<a href={url} className={classes.anchor} target={"_blank"} rel="noopener noreferrer">
				<ListItem>
					<ListItemAvatar>
						<Avatar alt={title} src={image} />
					</ListItemAvatar>
					<ListItemText
						primary={shortTitle}
						secondary={
							<>
								{shortDescription}
								<br />
								{domain}
							</>
						}
					/>
				</ListItem>
			</a>
		</List>
	);
}

export default LinkPreview;
