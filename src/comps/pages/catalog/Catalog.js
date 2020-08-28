import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import CatalogCard from "./CatalogCard";
import CatalogListCard from "./CatalogListCard";
import { List, ViewComfy } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SearchBox from "./filters/SearchBox";
import TagsFilter from "./filters/TagsFilter";
import CommitmentFilter from "./filters/CommitmentFilter";
import MeetingDaysFilter from "./filters/MeetingDaysFilter";
import { Helmet } from "react-helmet";

import scubaNotFound from "./../../../img/vectors/scuba-diver-not-found.svg";
import cherryNotFound from "./../../../img/vectors/cherry-page-not-found.svg";

import Button from "@material-ui/core/Button";
import UnstyledLink from "../../ui/UnstyledLink";

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
		$tags: [String]
		$commitmentLevels: [String]
		$meetingDays: [String]
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
	const [listView, setListView] = React.useState(false);

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
						<IconButton
							className={classes.displayTypeIcon}
							onClick={() => setListView(prev => !prev)}
						>
							{listView ? <List /> : <ViewComfy />}
						</IconButton>
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
						justify={"space-around"}
					>
						{data?.organizations?.map(org =>
							listView ? (
								<CatalogListCard key={org.id} {...org} />
							) : (
								<Grid item xs={12} sm={6} xl={3} lg={3} md={6}>
									<CatalogCard key={org.id} {...org} />
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
