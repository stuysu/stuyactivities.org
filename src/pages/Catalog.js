import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import CatalogCard from "../comps/pages/catalog/CatalogCard";
import CatalogListCard from "../comps/pages/catalog/CatalogListCard";
import { List, ViewComfy } from "@material-ui/icons";
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
	) {
		organizations(
			keyword: $keyword
			tags: $tags
			commitmentLevels: $commitmentLevels
			meetingDays: $meetingDays
			limit: 50
			offset: 0
		) {
			id
			name
			url
			active
			tags {
				name
			}
			charter {
				picture
				mission
				commitmentLevel
			}
		}
	}
`;

const Catalog = () => {
	const classes = useStyles();

	const [keyword, setKeyword] = React.useState("");
	const [tags, setTags] = React.useState([]);
	const [commitmentLevels, setCommitmentLevels] = React.useState([]);
	const [meetingDays, setMeetingDays] = React.useState([]);
	const [listView, setListView] = React.useState("card");

	const {
		error,
		data
		// refetch
	} = useQuery(QUERY, {
		variables: {
			keyword,
			tags,
			commitmentLevels,
			meetingDays
		}
	});
	if (error) return <p>There was an error loading this page</p>;

	//toggle list view
	const handleListView = (event, newListView) => {
		if (newListView !== null) {
			setListView(newListView);
		}
	};

	return (
		<div className={classes.root}>
			<Helmet>
				<title>Catalog | StuyActivities</title>

				<meta
					property="og:description"
					content={
						"Look through and find activities at Stuyvesant High School."
					}
				/>
			</Helmet>

			<Grid container>
				<Grid
					item
					xs={12}
					sm={12}
					md={3}
					lg={3}
					xl={2}
					className={classes.bigChild}
				>
					<div className={classes.filterContainer}>
						<Typography
							className={classes.filterHeading}
							variant={"h4"}
						>
							Filters
						</Typography>
						<SearchBox setKeyword={setKeyword} keyword={keyword} />
						<TagsFilter tags={tags} setTags={setTags} />
						<CommitmentFilter
							commitmentLevels={commitmentLevels}
							setCommitmentLevels={setCommitmentLevels}
						/>
						<MeetingDaysFilter
							meetingDays={meetingDays}
							setMeetingDays={setMeetingDays}
						/>
					</div>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					md={9}
					lg={9}
					xl={10}
					className={classes.bigChild}
				>
					<div className={classes.catalogHeading}>
						<Typography
							variant={"h4"}
							className={classes.filterChild}
						>
							Catalog
						</Typography>
						<ToggleButtonGroup
							value={listView}
							exclusive
							onChange={handleListView}
							aria-label={"toggle list view"}
							className={classes.displayTypeIcon}
						>
							<ToggleButton value="card" aria-label="card view">
								<ViewComfy />
							</ToggleButton>
							<ToggleButton value="list" aria-label="list view">
								<List />
							</ToggleButton>
						</ToggleButtonGroup>
					</div>

					{data?.organizations?.length === 0 && (
						<div className={classes.notFoundContainer}>
							<img
								src={
									errorImages[
										Math.floor(
											Math.random() * errorImages.length
										)
									]
								}
								alt={"A Cute Not Found Vector"}
								className={classes.defaultVector}
							/>
							<Typography paragraph>
								We couldn't find any activities matching that
								criteria.
							</Typography>

							<Typography paragraph>
								If you feel there ought to be, maybe you should
								start one!
							</Typography>

							<UnstyledLink to={"/charter"}>
								<Button variant={"contained"} color={"primary"}>
									Create Activity
								</Button>
							</UnstyledLink>
						</div>
					)}

					<Grid
						container
						alignContent={"flex-start"}
						alignItems={"flex-start"}
					>
						{data?.organizations?.map(org =>
							listView === "list" ? (
								<CatalogListCard key={org.id} {...org} />
							) : (
								<Grid
									item
									xs={12}
									sm={6}
									xl={3}
									lg={3}
									md={6}
									key={org.id}
								>
									<CatalogCard {...org} />
								</Grid>
							)
						)}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Catalog;
