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
import capitalizeString from "../../../utils/capitalizeString";

const useStyles = makeStyles(theme => ({
	card: {
		margin: theme.spacing(1)
	},
	chip: {
		marginTop: "0.3rem",
		marginRight: "5px"
	}
}));

function Tag({name}) {
	const classes = useStyles();

	return (
		<Chip
			label={name}
			size={"small"}
			className={classes.chip}
		/>
	);
}

export default function CatalogCard({ name, url, charter, tags }) {
	const classes = useStyles();

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
							label={capitalizeString(charter.commitmentLevel) + " Commitment"}
							size={"small"}
							className={classes.chip}
						/>
						{tags.map(tag => (
							<Tag name={tag.name} key={tag.id} />
						))}
					</CardContent>
				</CardActionArea>
			</UnstyledLink>
		</Card>
	);
}
