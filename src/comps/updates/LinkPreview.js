import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const classes = {
	list: {
		border: "1px solid lightgrey",
		borderRadius: 5,
		cursor: "pointer",
		"&:hover": {
			opacity: 0.9
		},
		margin: "0.5rem 0"
	},
	anchor: {
		textDecoration: "none",
		color: "unset"
	}
};

const clampString = (str, len) => {
	if (str.length > len) {
		return str.substr(0, len) + "...";
	}

	return str;
};

function LinkPreview({ title, description, image, url, siteName }) {
	const shortTitle = typeof title === "string" ? clampString(title, 60) : title;
	const shortDescription = typeof description === "string" ? clampString(description, 115) : description;

	const domain = new window.URL(url).hostname;

	return (
		<List sx={classes.list}>
			<Box component="a" href={url} sx={classes.anchor} target={"_blank"} rel="noopener noreferrer">
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
			</Box>
		</List>
	);
}

export default LinkPreview;
