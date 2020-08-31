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
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles( theme => ({
	card: {
		margin: theme.spacing(1)
	},
	chip: {
		marginTop: "0.3rem"
	}
}));

export default function CatalogCard({ name, url, charter }) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<UnstyledLink to={`/${url}`}>
				<CardActionArea>
					<CardMedia
						image={charter.picture}
						title={name + "'s picture"}
						style={{ height: 140 }}
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
					</CardContent>
				</CardActionArea>
			</UnstyledLink>
		</Card>
	);
}
