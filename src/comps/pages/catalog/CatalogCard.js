import React from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UnstyledLink from "../../ui/UnstyledLink";

const useStyles = makeStyles(theme => ({
	card: {
		margin: theme.spacing(1)
	}
}));

export default function CatalogCard({ name, url, charter }) {
	const classes = useStyles();
	return (
		<Grid item xs={12} sm={6} xl={3} lg={3} md={6}>
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
							<Typography variant={"body2"}>
								Commitment: {charter.commitmentLevel}
							</Typography>
						</CardContent>
					</CardActionArea>
				</UnstyledLink>
			</Card>
		</Grid>
	);
}
