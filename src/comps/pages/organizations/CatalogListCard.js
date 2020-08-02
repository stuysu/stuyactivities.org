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

const useStyles = makeStyles(theme => ({
	cardRoot: {
		margin: theme.spacing(1)
	},
	card: {
		display: "flex",
		"align-items": "stretch",
		"justify-content": "flex-start",
		width: "100%",
		minHeight: 75
	},
	grow: {
		width: "100%"
	},
	shrink: {
		"white-space": "no-wrap"
	},
	hyphenate: {
		"overflow-wrap": "break-word"
	}
}));

export default function CatalogCard({ name, url, charter }) {
	const classes = useStyles();
	return (
		<Grid item xs={12}>
			<Card className={classes.cardRoot}>
				<CardActionArea
					className={classes.card}
					onClick={() => (window.location.href = url)}
				>
					<CardMedia
						image={charter.picture}
						title={name + "'s picture"}
						style={{ minHeight: 75, width: 225 }}
					/>
					<CardContent className={classes.grow}>
						<Grid container spacing={1}>
							<Grid item xs={3}>
								<Typography variant={"h5"} gutterBottom className={classes.hyphenate}>
									{name}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography>
									Mission Statement: {charter.mission}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant={"body2"}>
									Commitment Level: {charter.commitmentLevel}
								</Typography>
								<Typography variant={"body2"}>
									Meeting Frequency:{" "}
									{charter.meetingFrequency} days/month
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}
