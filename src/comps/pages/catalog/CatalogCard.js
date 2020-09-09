import React from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UnstyledLink from "../../ui/UnstyledLink";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
	card: {
		margin: theme.spacing(1)
	},
	chip: {
		marginTop: "0.3rem"
	}
}));

function TagList(props) {
	const tag = props.tag;
	const listItems = tag.map((tag) =>
		<Chip
			label={tag.name}
			size={"small"}
			style={{ height: 150 }}
		/>
	);
	return (
		{listItems}
	);
}

export default function CatalogCard({ name, url, charter, tags }) {
	const classes = useStyles();
	const tag = [];
	for (let i in tags) {
		tag.push(i);
	};

	return (
		<Card className={classes.card}>
			<UnstyledLink to={`/${url}`}>
				<CardActionArea>
					<CardMedia
						image={charter.picture}
						title={name + "'s picture"}
						style={{ height: 180 }}
					/>
					<CardContent>
						<Typography variant={"h5"} gutterBottom>
							{name}
						</Typography>
						<Typography>{charter.mission}</Typography>
						<Chip
							label={charter.commitmentLevel + " commitment"}
							size={"small"}
							className={classes.chip}
						/>
						<TagList tag={tag} />
					</CardContent>
				</CardActionArea>
			</UnstyledLink>
		</Card>
	);
}
