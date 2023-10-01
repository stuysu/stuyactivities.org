import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import CatalogCard from "../comps/pages/catalog/CatalogCard";
import CatalogListCard from "../comps/pages/catalog/CatalogListCard";
import PromotedClubCard from "../comps/pages/explore/PromotedClubCard";
import { List as ListIcon, ViewComfy } from "@mui/icons-material";
import SearchBox from "../comps/pages/catalog/filters/SearchBox";
import TagsFilter from "../comps/pages/catalog/filters/TagsFilter";
import CommitmentFilter from "../comps/pages/catalog/filters/CommitmentFilter";
import MeetingDaysFilter from "../comps/pages/catalog/filters/MeetingDaysFilter";
import { Helmet } from "react-helmet";

import scubaNotFound from "../img/vectors/scuba-diver-not-found.svg";
import cherryNotFound from "../img/vectors/cherry-page-not-found.svg";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UnstyledLink from "../comps/ui/UnstyledLink";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Loading from "../comps/ui/Loading";
import List from "@mui/material/List";
import Masonry from "react-masonry-css";
import { useHistory } from "react-router-dom";

const errorImages = [scubaNotFound, cherryNotFound];

const classes = {
	root: {
		flexGrow: 1
	},
	bigChild: {
		padding: 2
	},
	card: {
		margin: 1
	},
	filterHeading: {
		paddingLeft: 1
	},
	filterContainer: {
		position: "sticky",
		top: "32px"
	},
	catalogHeading: {
		position: "relative",
		padding: 1
	},
	displayTypeIcon: {
		position: "absolute",
		right: 1,
		top: 1
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
};

const QUERY = gql`
	query Organizations(
		$keyword: String
		$tags: [Int!]
		$commitmentLevels: [String!]
		$meetingDays: [String!]
		$limit: Int!
		$offset: Int!
		$randomOrderSeed: Int!
	) {
		organizations: organizations(
			keyword: $keyword
			tags: $tags
			commitmentLevels: $commitmentLevels
			meetingDays: $meetingDays
			limit: $limit
			randomOrderSeed: $randomOrderSeed
			active: true
			locked: false
			offset: $offset
		) {
			id
			name
			url
			active
			charter {
				id
				picture {
					card: url(height: 180, width: 180, crop: thumb, gravity: center, radius: 100)
					thumbnail(height: 80, width: 80)
				}
				mission
				commitmentLevel
			}
			tags {
				id
				name
			}
		}
		promotedClubs: promotedClubs {
			id
			blurb
			organization {
				id
				name
				url
				charter {
					id
					picture {
						url
						thumbnail(width: 80, height: 80)
					}
				}
			}
		}
	}
`;

const Catalog = () => {
	const [keyword, setKeyword] = useState("");
	const [tags, setTags] = useState([]);
	const [commitmentLevels, setCommitmentLevels] = useState([]);
	const [meetingDays, setMeetingDays] = useState([]);
	const [listView, setListView] = useState(false);
	const [limit] = useState(15);
	const [offset, setOffset] = useState(0);
	const [organizations, setOrganizations] = useState(null);
	const lastItemRef = useRef();

	const isMobile = useMediaQuery("(max-width: 500px)");
	const isTablet = useMediaQuery("(max-width: 900px)");
	const history = useHistory();

	let numColumns = 3;

	if (isTablet) {
		numColumns = 2;
	}

	if (isMobile) {
		numColumns = 1;
	}

	const [randomOrderSeed] = React.useState(
		parseInt(history.location.state?.randomSeed) || Math.floor(Math.random() * 1000)
	);

	const { data, loading } = useQuery(QUERY, {
		variables: {
			keyword,
			tags,
			limit,
			commitmentLevels,
			meetingDays,
			randomOrderSeed,
			offset
		}
	});

	useEffect(() => {
		if (!history.location.state?.randomSeed) {
			history.replace({
				pathname: "/catalog",
				state: {
					randomSeed: randomOrderSeed
				}
			});
		}
	}, [randomOrderSeed, history]);

	useEffect(() => {
		if (
			!loading &&
			lastItemRef &&
			lastItemRef.current &&
			offset <= data?.organizations?.length + organizations?.length
		) {
			const options = {
				threshold: 0.3
			};

			const callback = entries => {
				if (entries[0].isIntersecting) {
					setOffset(offset + limit);
				}
			};

			const observer = new IntersectionObserver(callback, options);
			observer.observe(lastItemRef.current);

			return () => observer.disconnect();
		}
	});

	useEffect(() => {
		setOffset(0);
	}, [setOffset, keyword, tags, limit, commitmentLevels, meetingDays]);

	useEffect(() => {
		if (data?.organizations) {
			setOrganizations(currentOrgs => {
				if (offset === 0) {
					return data.organizations;
				}

				const combinedSize = currentOrgs.length + data.organizations.length;

				if (combinedSize >= offset && currentOrgs.length <= offset) {
					return currentOrgs.concat(data.organizations);
				}

				return currentOrgs;
			});
		}
	}, [data, setOrganizations, offset]);

	return (
		<Box sx={classes.root}>
			<Helmet>
				<title>Catalog | StuyActivities</title>
				<meta property="og:title" content="Catalog | StuyActivities" />
				<meta
					property="og:description"
					content={"Look through and find activities at Stuyvesant High School."}
				/>
			</Helmet>

			<Grid container>
				<Grid item xs={12} sm={12} md={3} lg={3} xl={2} sx={classes.bigChild}>
					<Box sx={classes.filterContainer}>
						<SearchBox setKeyword={setKeyword} keyword={keyword} />
						<TagsFilter tags={tags} setTags={setTags} />
						<CommitmentFilter
							commitmentLevels={commitmentLevels}
							setCommitmentLevels={setCommitmentLevels}
						/>
						<MeetingDaysFilter meetingDays={meetingDays} setMeetingDays={setMeetingDays} />
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={9} lg={9} xl={10} sx={classes.bigChild}>
					{data !== undefined && data.promotedClubs.length !== 0 && (
						<div>
							<Typography variant={"h4"}>Featured Clubs</Typography>
							<div>
								{data.promotedClubs.map(promotedClub => (
									<PromotedClubCard {...promotedClub} />
								))}
							</div>
						</div>
					)}
					<Box sx={classes.catalogHeading}>
						<Typography variant={"h4"} sx={classes.filterChild}>
							Catalog
						</Typography>
						<ToggleButtonGroup
							value={listView}
							exclusive
							onChange={() => setListView(!listView)}
							aria-label={"toggle list view"}
							sx={classes.displayTypeIcon}
						>
							<ToggleButton value={false} aria-label="card view">
								<ViewComfy />
							</ToggleButton>
							<ToggleButton value={true} aria-label="list view">
								<ListIcon />
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					{loading && offset === 0 && !organizations ? (
						<Loading />
					) : (
						<>
							{organizations?.length === 0 && (
								<Box sx={classes.notFoundContainer}>
									<Box
										component="img"
										src={errorImages[Math.floor(Math.random() * errorImages.length)]}
										alt={"A Cute Not Found Vector"}
										sx={classes.defaultVector}
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
								</Box>
							)}
							{listView ? (
								<List>
									{organizations?.map((org, index) => (
										<CatalogListCard
											key={org.id}
											{...org}
											ref={organizations?.length === index + 1 ? lastItemRef : undefined}
										/>
									))}
								</List>
							) : (
								<Masonry
									breakpointCols={numColumns}
									className="my-masonry-grid"
									columnClassName="my-masonry-grid_column"
								>
									{organizations?.map((org, index) => (
										<CatalogCard
											{...org}
											key={org.id}
											ref={organizations?.length === index + 1 ? lastItemRef : undefined}
										/>
									))}
								</Masonry>
							)}

							{loading && (
								<div style={{ textAlign: "center", marginBottom: "1rem" }}>
									<Loading />
								</div>
							)}
						</>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Catalog;
