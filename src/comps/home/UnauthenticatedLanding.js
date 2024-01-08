import React from "react";
import Button from "@mui/material/Button";
import layout from "../../styles/Layout.module.css";
import Grid from "@mui/material/Grid";
import TextLink from "../ui/TextLink";
import ButtonLink from "../ui/ButtonLink";

import { triggerLoginDialog } from "../auth/AuthDialog";
import biking from "./../../img/vectors/clip-biking.svg";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const classes = {
	vector: {
		width: 400,
		maxWidth: "80vw"
	},
	vectorCell: {
		textAlign: "center"
	},
	textCell: {
		padding: "0 1rem"
	},
	secondButton: {
		margin: "1rem"
	}
};

const UnauthenticatedLanding = () => {
	return (
		<div className={layout.container}>
			<Grid container alignContent={"center"} alignItems={"center"}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={classes.vectorCell}>
					<Box component="img" src={biking} alt={"Two people biking"} sx={classes.vector} />
				</Grid>

				<Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={classes.textCell}>
					<Typography variant={"h1"}>Welcome to StuyActivities</Typography>
					<Typography variant={"h4"}>
						Most service is restored, save for image hosting. We thank you for your patience.
					</Typography>

					<Typography paragraph>
						This is an app for students of Stuyvesant High School to create and manage their clubs.
					</Typography>
					<Typography paragraph>
						If you're not a student or faculty at Stuyvesant you're still welcome to explore our diverse
						array of clubs and organizations but the features available to you will be limited.
					</Typography>
					<Typography paragraph>
						Clubs and organizations chartered on StuyActivities are required to follow a set of{" "}
						<TextLink to={"/rules"}>rules and guidelines</TextLink>.
					</Typography>
					<Typography paragraph>
						If you want to learn more about how this site works and the fabulous people who helped put it
						together you can check out the <TextLink to={"/about"}>about page</TextLink>.
					</Typography>

					<Button variant="outlined" color="primary" onClick={triggerLoginDialog}>
						Sign In
					</Button>

					<ButtonLink to={"/catalog"} variant={"outlined"} color={"primary"} sx={classes.secondButton}>
						Browse Activities
					</ButtonLink>
				</Grid>
			</Grid>
		</div>
	);
};

export default UnauthenticatedLanding;
