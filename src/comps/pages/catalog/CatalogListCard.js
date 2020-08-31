import React from "react";
import {
	Avatar,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UnstyledLink from "../../ui/UnstyledLink";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({
	item: {
		width: "100%",
		float: "left"
	},
	avatar: {
		width: "50px",
		height: "20%",
		marginRight: "18px"
	},
	redChip: {
		backgroundColor: red[500],
		color: red[50],
		marginTop: "0.3rem"
	},
	yellowChip: {
		backgroundColor: yellow[700],
		color: yellow[50],
		marginTop: "0.3rem"
	},
	greenChip: {
		backgroundColor: green[500],
		color: green[50],
		marginTop: "0.3rem"
	}
}));

export default function CatalogCard({ name, url, charter }) {
	const classes = useStyles();
	let chipColor;
	charter.commitmentLevel === "high" ? chipColor = classes.redChip
		: charter.commitmentLevel === "medium" ? chipColor = classes.yellowChip
		: chipColor = classes.greenChip;

	return (
		<Grid item xs={12}>
			<List>
				<Paper className={classes.item}>
					<UnstyledLink to={`/${url}`}>
						<ListItem>
							<ListItemAvatar>
								<Avatar src={charter.picture} variant={"square"} className={classes.avatar}/>
							</ListItemAvatar>
							<ListItemText
								primary={
									<React.Fragment>
										<Typography variant={"h5"}>
											{name}
										</Typography>
									</React.Fragment>
								}
								secondary={
									<React.Fragment>
										<Typography variant={"body1"}>
											{charter.mission}
											<br />
											<Chip
												label={charter.commitmentLevel + " commitment"}
												size={"small"}
												className={chipColor}
											/>
										</Typography>
									</React.Fragment>
								}
							/>

						</ListItem>
					</UnstyledLink>
				</Paper>
			</List>
		</Grid>
	);
}
