import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import layout from "../../styles/Layout.module.css";
import { triggerLoginDialog } from "../auth/AuthDialog";
import ButtonLink from "../ui/ButtonLink";
import TextLink from "../ui/TextLink";
import biking from "./../../img/vectors/clip-biking.svg";

const useStyles = makeStyles({
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
});

const UnauthenticatedLanding = () => {
	const classes = useStyles();

	return (
		<div className={layout.container}>
			<Grid container alignContent={"center"} alignItems={"center"}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.vectorCell}>
					<img src={biking} alt={"Two people biking"} className={classes.vector} />
				</Grid>

				<Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.textCell}>
					<Typography variant={"h1"}>Welcome to StuyActivities</Typography>

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

					<ButtonLink to={"/catalog"} variant={"outlined"} color={"primary"} className={classes.secondButton}>
						Browse Activities
					</ButtonLink>
				</Grid>
			</Grid>
		</div>
	);
};

export default UnauthenticatedLanding;
