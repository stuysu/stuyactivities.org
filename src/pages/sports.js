import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import {Helmet} from "react-helmet";
import {Grid, useMediaQuery} from "@material-ui/core";
import SearchBox from "../comps/pages/catalog/filters/SearchBox";
import Loading from "../comps/ui/Loading";
import UnstyledLink from "../comps/ui/UnstyledLink";
import Button from "@material-ui/core/Button";
import scubaNotFound from "../img/vectors/scuba-diver-not-found.svg";
import cherryNotFound from "../img/vectors/cherry-page-not-found.svg";
import Masonry from "react-masonry-css";
import SportsCard from "../comps/pages/sports/card";

const errorImages = [scubaNotFound, cherryNotFound];

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	bigChild: {
		padding: theme.spacing(2)
	},
	card: {
		margin: theme.spacing(1)
	},
	filterHeading: {
		paddingLeft: theme.spacing(1)
	},
	filterContainer: {
		position: "sticky",
		top: "32px"
	},
	catalogHeading: {
		position: "relative",
		padding: theme.spacing(1)
	},
	defaultVector: {
		width: "400px",
		maxWidth: "80vw",
		maxHeight: "30vh",
		marginBottom: "1rem"
	},
	notFoundContainer: {
		textAlign: "center"
	}
}));

const QUERY = gql`
	query Sports(
		$keyword: String
	) {
		sports(
			keyword: $keyword
		) {
			id
			name
			picture {
				card: url(height: 180, width: 180, crop: thumb, gravity: center, radius: 100)
				thumbnail(height: 80, width: 80)
			}
			coach
			coachEmail
			tryouts
			commitment
			schedule
			experience
			equipment
			moreInfo
		}
	}
`;

const Sports = () => {
	const classes = useStyles();
	const [keyword, setKeyword] = useState("");
	const [sports, setSports] = useState(null);

	const isMobile = useMediaQuery("(max-width: 500px)");
	const isTablet = useMediaQuery("(max-width: 900px)");

	let numColumns = 3;

	if (isTablet) {
		numColumns = 2;
	}

	if (isMobile) {
		numColumns = 1;
	}

	const { data, loading } = useQuery(QUERY, {
		variables: {
			keyword
		}
	});

	useEffect(() => {
		if (data?.sports) {
			setSports(data.sports);
		}
	}, [data, setSports]);

	return (
		<div className={classes.root}>
			<Helmet>
				<title>PSAL Sports | StuyActivities</title>
				<meta property="og:title" content="PSAL Sports | StuyActivities" />
				<meta
					property="og:description"
					content={"Discover Public School Athletics League sports offered at Stuyvesant"}
				/>
			</Helmet>

			<Grid container>
				<Grid item xs={12} sm={12} md={3} lg={3} xl={2} className={classes.bigChild}>
					<div className={classes.filterContainer}>
						<SearchBox setKeyword={setKeyword} keyword={keyword} />
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={9} lg={9} xl={10} className={classes.bigChild}>
					<div className={classes.catalogHeading}>
						<Typography variant={"h4"} className={classes.filterChild}>
							 PSAL Sports
						</Typography>
					</div>
					{loading ? (
						<Loading />
					) : (
						<>
							{sports?.length === 0 && (
								<div className={classes.notFoundContainer}>
									<img
										src={errorImages[Math.floor(Math.random() * errorImages.length)]}
										alt={"A Cute Not Found Vector"}
										className={classes.defaultVector}
									/>
									<Typography paragraph>
										We couldn't find any activities matching that criteria.
									</Typography>

									<Typography paragraph>
										If you feel there ought to be, maybe you should start one!
									</Typography>

									<UnstyledLink to={"/charter"}>
										<Button variant={"contained"} color={"primary"}>
											Create Activity
										</Button>
									</UnstyledLink>
								</div>
							)}
							<Masonry
								breakpointCols={numColumns}
								className="my-masonry-grid"
								columnClassName="my-masonry-grid_column"
							>
								{sports?.map(sport => (
									<SportsCard {...sport} key={sport.id} />
								))}
							</Masonry>
						</>
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default Sports;