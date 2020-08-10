import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import FlexCenter from "../ui/FlexCenter";
import { Grid, Typography } from "@material-ui/core";
import conifer from "./../../img/vectors/conifer-page-not-found.svg";
import marginalia from "./../../img/vectors/marginalia-page-not-found.svg";
import clip from "./../../img/vectors/clip-page-not-found.svg";
import pixeltrue from "./../../img/vectors/pale-page-not-found.svg";
import pale from "./../../img/vectors/pale-page-not-found.svg";
import { makeStyles } from "@material-ui/core/styles";
import BackButton from "../ui/BackButton";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import CatalogCard from "./catalog/CatalogCard";

const error404Imgs = [conifer, marginalia, clip, pixeltrue, pale];

const useStyles = makeStyles({
	contentContainer: {
		margin: "2rem",
		textAlign: "center"
	},
	defaultVector: {
		width: "500px",
		maxWidth: "80vw",
		maxHeight: "30vh"
	},
	safeMargin: {
		margin: "1rem"
	}
});

const QUERY = gql`
	query SimilarOrganizations($keyword: String!) {
		organizations(keyword: $keyword, limit: 3) {
			name
			charter {
				picture
				mission
				commitmentLevel
			}
			url
		}
	}
`;

const Error404 = () => {
	const { orgUrl } = useParams();
	const { data } = useQuery(QUERY, { variables: { keyword: orgUrl } });
	const classes = useStyles();

	const [img] = React.useState(
		error404Imgs[Math.floor(Math.random() * error404Imgs.length)]
	);

	return (
		<div>
			<Helmet>
				<meta property="og:type" content={"website"} />
				<meta
					property="og:description"
					content={"We couldn't find that page on StuyActivities."}
				/>
				<title>Page Not Found | StuyActivities</title>
			</Helmet>

			<div className={classes.contentContainer}>
				<img
					className={classes.defaultVector}
					src={img}
					alt={"Cute page-not-found vector"}
				/>
				<Typography variant={"h4"}>
					We couldn't find that page
				</Typography>

				<FlexCenter>
					<BackButton
						color={"secondary"}
						arrow={false}
						to={"/"}
						label={"Go Back Home"}
						className={classes.safeMargin}
					/>
				</FlexCenter>

				<Typography paragraph className={classes.safeMargin}>
					Maybe you meant to check out one of these activities?
				</Typography>
				{data && (
					<Grid container justify={"center"}>
						{data.organizations.map(org => (
							<CatalogCard
								xl={3}
								lg={3}
								md={3}
								sm={6}
								xs={12}
								name={org.name}
								url={org.url}
								charter={org.charter}
							/>
						))}
					</Grid>
				)}
			</div>
		</div>
	);
};

export default Error404;
