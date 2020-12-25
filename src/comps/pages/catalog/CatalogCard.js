import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UnstyledLink from "../../ui/UnstyledLink";
import Chip from "@material-ui/core/Chip";
import { LazyLoadImage } from "react-lazy-load-image-component";
import capitalizeString from "../../../utils/capitalizeString";

const useStyles = makeStyles(theme => ({
	chip: {
		marginTop: "0.3rem",
		marginRight: "5px"
	}
}));

function Tag({ name }) {
	const classes = useStyles();

	return <Chip label={name} size={"small"} className={classes.chip} />;
}

export default function CatalogCard({ name, url, charter, tags }) {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<UnstyledLink to={`/${url}`}>
				<CardActionArea>
					<div style={{ textAlign: "center" }}>
						<LazyLoadImage
							alt={name}
							height={180}
							src={charter.picture.card}
							width={180}
							style={{
								objectFit: "cover",
								borderRadius: "50%",
								marginTop: "1rem"
							}}
						/>
					</div>

					<CardContent>
						<Typography variant={"h5"} gutterBottom align={"center"}>
							{name}
						</Typography>
						<Typography gutterBottom>{charter.mission}</Typography>
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
