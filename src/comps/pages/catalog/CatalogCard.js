import React, { forwardRef } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import UnstyledLink from "../../ui/UnstyledLink";
import Chip from "@mui/material/Chip";
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

function CatalogCardWithRef({ name, url, charter, tags }, ref) {
	const classes = useStyles();
	return (
		<Card className={classes.card} ref={ref}>
			<UnstyledLink to={`/${url}`}>
				<CardActionArea>
					<div style={{ textAlign: "center" }}>
						<LazyLoadImage
							alt={name}
							height={180}
							src={charter.picture?.card}
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

const CatalogCard = forwardRef(CatalogCardWithRef);

export default CatalogCard;
