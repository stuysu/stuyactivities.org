import React from "react";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UnstyledLink from "../../ui/UnstyledLink";
import Chip from "@material-ui/core/Chip";
import { LazyLoadImage } from "react-lazy-load-image-component";
import capitalizeString from "../../../utils/capitalizeString";

const useStyles = makeStyles(theme => ({
	card: {
		margin: theme.spacing(1)
	},
	chip: {
		marginTop: "0.3rem"
	}
}));

export default function CatalogCard({ name, url, tags, charter }) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<UnstyledLink to={`/${url}`}>
				<CardActionArea>
					<LazyLoadImage
						alt={name}
						height={180}
						src={charter.picture}
						width={"100%"}
						style={{ objectFit: "cover" }}
					/>
					<CardContent>
						<Typography variant={"h5"} gutterBottom>
							{name}
						</Typography>
						<Typography>{charter.mission}</Typography>
						<Grid container spacing={1}>
							<Grid item>
								<Chip label={capitalizeString(charter.commitmentLevel + " Commitment")} />
							</Grid>
							{tags.map(tag => (
								<Grid item key={tag.id}>
									<Chip key={tag.id} label={tag.name} />
								</Grid>
							))}
						</Grid>
					</CardContent>
				</CardActionArea>
			</UnstyledLink>
		</Card>
	);
}
