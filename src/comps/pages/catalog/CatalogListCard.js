import { Divider, Grid, ListItem, ListItemAvatar, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import capitalizeString from "../../../utils/capitalizeString";
import UnstyledLink from "../../ui/UnstyledLink";

export default function CatalogCard({ name, url, tags, charter }) {
	return (
		<>
			<UnstyledLink to={"/" + url}>
				<ListItem button style={{ padding: "1rem" }}>
					<ListItemAvatar>
						<LazyLoadImage
							src={charter.picture?.thumbnail}
							width={80}
							style={{
								borderRadius: "50%",
								marginRight: "1rem",
								width: "80px",
								height: "80px",
								objectFit: "cover"
							}}
						/>
					</ListItemAvatar>
					<div>
						<Typography style={{ paddingBottom: "3px" }}>{name}</Typography>
						<Typography color={"textSecondary"} variant={"subtitle2"} style={{ paddingBottom: "4px" }}>
							{charter.mission}
						</Typography>
						<Grid container spacing={1}>
							<Grid item>
								<Chip
									label={capitalizeString(charter.commitmentLevel + " Commitment")}
									size={"small"}
								/>
							</Grid>
							{tags.map(tag => (
								<Grid item key={tag.id}>
									<Chip key={tag.id} label={tag.name} size={"small"} />
								</Grid>
							))}
						</Grid>
					</div>
				</ListItem>
			</UnstyledLink>

			<Divider />
		</>
	);
}
