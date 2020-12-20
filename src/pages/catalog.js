import React, { useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import CatalogCard from "../comps/pages/catalog/CatalogCard";
import CatalogListCard from "../comps/pages/catalog/CatalogListCard";
import { List as ListIcon, ViewComfy } from "@material-ui/icons";
import SearchBox from "../comps/pages/catalog/filters/SearchBox";
import TagsFilter from "../comps/pages/catalog/filters/TagsFilter";
import CommitmentFilter from "../comps/pages/catalog/filters/CommitmentFilter";
import MeetingDaysFilter from "../comps/pages/catalog/filters/MeetingDaysFilter";
import { Helmet } from "react-helmet";

import scubaNotFound from "../img/vectors/scuba-diver-not-found.svg";
import cherryNotFound from "../img/vectors/cherry-page-not-found.svg";

import Button from "@material-ui/core/Button";
import UnstyledLink from "../comps/ui/UnstyledLink";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Loading from "../comps/ui/Loading";
import List from "@material-ui/core/List";
import Masonry from "react-masonry-css";

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
	displayTypeIcon: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1)
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
	query Organizations(
		$keyword: String
		$tags: [Int!]
		$commitmentLevels: [String!]
		$meetingDays: [String!]
		$limit: Int!
		$offset: Int!
		$randomOrderSeed: Int!
	) {
		organizations(
			keyword: $keyword
			tags: $tags
			commitmentLevels: $commitmentLevels
			meetingDays: $meetingDays
			limit: $limit
			randomOrderSeed: $randomOrderSeed
			offset: $offset
		) {
			id
			name
			url
			active
			charter {
				id
				picture
				mission
				commitmentLevel
			}
			tags {
				id
				name
			}
		}
	}
`;

const Catalog = () => {
	const classes = useStyles();
	const [keyword, setKeyword] = useState("");
	const [tags, setTags] = useState([]);
	const [commitmentLevels, setCommitmentLevels] = useState([]);
	const [meetingDays, setMeetingDays] = useState([]);
	const [listView, setListView] = useState(false);
	const [limit] = useState(15);
	const [offset, setOffset] = useState(0);
	const [organizations, setOrganizations] = useState(null);

	const isMobile = useMediaQuery("(max-width: 500px)");
	const isTablet = useMediaQuery("(max-width: 900px)");

	let numColumns = 3;

	if (isTablet) {
		numColumns = 2;
	}

	if (isMobile) {
		numColumns = 1;
	}

	const [randomOrderSeed] = React.useState(Math.floor(Math.random() * 1000));

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
		if (offset <= data?.organizations?.length + organizations?.length) {
			const scrollHandler = () => {
				const offsetTop = window.innerHeight + window.scrollY;
				const pageHeight = window.document.body.offsetHeight;

				if (pageHeight - offsetTop < 800 && !loading) {
					setOffset(offset => offset + 15);
				}
			};

			window.addEventListener("scroll", scrollHandler);

			return () => window.removeEventListener("scroll", scrollHandler);
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
		<div className={classes.root}>
			<Helmet>
				<title>Catalog | StuyActivities</title>
				<meta property="og:title" content="Catalog | StuyActivities" />
				<meta
					property="og:description"
					content={"Look through and find activities at Stuyvesant High School."}
				/>
			</Helmet>

			<Grid container>
				<Grid item xs={12} sm={12} md={3} lg={3} xl={2} className={classes.bigChild}>
					<div className={classes.filterContainer}>
						<SearchBox setKeyword={setKeyword} keyword={keyword} />
						<TagsFilter tags={tags} setTags={setTags} />
						<CommitmentFilter
							commitmentLevels={commitmentLevels}
							setCommitmentLevels={setCommitmentLevels}
						/>
						<MeetingDaysFilter meetingDays={meetingDays} setMeetingDays={setMeetingDays} />
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={9} lg={9} xl={10} className={classes.bigChild}>
					<div className={classes.catalogHeading}>
						<Typography variant={"h4"} className={classes.filterChild}>
							Catalog
						</Typography>
						<ToggleButtonGroup
							value={listView}
							exclusive
							onChange={() => setListView(!listView)}
							aria-label={"toggle list view"}
							className={classes.displayTypeIcon}
						>
							<ToggleButton value={false} aria-label="card view">
								<ViewComfy />
							</ToggleButton>
							<ToggleButton value={true} aria-label="list view">
								<ListIcon />
							</ToggleButton>
						</ToggleButtonGroup>
					</div>
					{loading && offset === 0 && !organizations ? (
						<Loading />
					) : (
						<>
							{organizations?.length === 0 && (
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

							{listView ? (
								<List>
									{organizations?.map(org => (
										<CatalogListCard key={org.id} {...org} />
									))}
								</List>
							) : (
								<Masonry
									breakpointCols={numColumns}
									className="my-masonry-grid"
									columnClassName="my-masonry-grid_column"
								>
									{organizations?.map(org => (
										<CatalogCard {...org} key={org.id} />
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
		</div>
	);
};

export default Catalog;
