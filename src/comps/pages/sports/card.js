import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {CardContent} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import capitalizeString from "../../../utils/capitalizeString";

const SportsCard = (sport) => {
	return (
		<Card>
			<CardActionArea>
				<div style={{ textAlign: "center" }}>
					<LazyLoadImage
						alt={name}
						height={180}
						src={sport.picture}
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
						{sport.name}
					</Typography>
					<Chip
						label={capitalizeString(sport.commitmentLevel) + " Commitment"}
						size={"small"}
						className={classes.chip}
					/>
					<Chip
						label={capitalizeString(sport.season) + " Commitment"}
						size={"small"}
						className={classes.chip}
					/>
					<Chip
						label={capitalizeString(sport.sex) + " Commitment"}
						size={"small"}
						className={classes.chip}
					/>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default SportsCard;