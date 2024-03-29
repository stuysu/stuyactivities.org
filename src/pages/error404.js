import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import FlexCenter from "../comps/ui/FlexCenter";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import conifer from "../img/vectors/conifer-page-not-found.svg";
import marginalia from "../img/vectors/marginalia-page-not-found.svg";
import clip from "../img/vectors/clip-page-not-found.svg";
import pixeltrue from "../img/vectors/pale-page-not-found.svg";
import pale from "../img/vectors/pale-page-not-found.svg";
import BackButton from "../comps/ui/BackButton";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import CatalogCard from "../comps/pages/catalog/CatalogCard";
import Box from "@mui/material/Box";

const error404Imgs = [conifer, marginalia, clip, pixeltrue, pale];

const classes = {
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
};

const QUERY = gql`
	query SimilarOrganizations($keyword: String!) {
		organizations(keyword: $keyword, limit: 3) {
			id
			name
			charter {
				picture {
					card: url(height: 180, width: 180, crop: thumb, gravity: center, radius: 100)
				}
				mission
				commitmentLevel
			}
			tags {
				id
				name
			}
			url
		}
	}
`;

const Error404 = () => {
	const { orgUrl } = useParams();
	const { data } = useQuery(QUERY, { variables: { keyword: orgUrl } });

	const [img] = React.useState(error404Imgs[Math.floor(Math.random() * error404Imgs.length)]);

	return (
		<div>
			<Helmet>
				<meta property="og:type" content={"website"} />
				<meta property="og:description" content={"We couldn't find that page on StuyActivities."} />
				<title>Page Not Found | StuyActivities</title>
			</Helmet>

			<Box sx={classes.contentContainer}>
				<Box component="img" sx={classes.defaultVector} src={img} alt={"Cute page-not-found vector"} />
				<Typography variant={"h4"}>We couldn't find that page!</Typography>

				<FlexCenter>
					<BackButton
						color={"secondary"}
						arrow={false}
						to={"/"}
						label={"Go Back Home"}
						sx={classes.safeMargin}
					/>
				</FlexCenter>

				{Boolean(data?.organizations?.length) && (
					<>
						<Typography paragraph sx={classes.safeMargin}>
							Maybe you meant to check out one of these activities?
						</Typography>
						<Grid container justifyContent={"center"} spacing={2}>
							{data?.organizations?.map(org => (
								<Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
									<CatalogCard {...org} />
								</Grid>
							))}
						</Grid>
					</>
				)}
			</Box>
		</div>
	);
};

export default Error404;
