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
	filterContainer: {
		position: "sticky",
		top: "32px"
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
		tags {
			id
			name
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
							className={classes.filterChild}
							variant={"h4"}
						>
							Filters
						</Typography>
						<SearchBox set={setKeyword} value={keyword} />
						<TagsFilter
							tags={tags}
							setTags={setTags}
							allTags={data?.tags || []}
						/>
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
					container
					item
					xs={12}
					sm={12}
					md={9}
					lg={9}
					xl={10}
					className={classes.bigChild}
					alignContent={"flex-start"}
					alignItems={"flex-start"}
					justify={"space-around"}
				>
					<Grid item xs={12}>
						<Typography
							variant={"h4"}
							className={classes.filterChild}
						>
							Catalog
						</Typography>
						<IconButton onClick={() => setListView(prev => !prev)}>
							{listView ? <List /> : <ViewComfy />}
						</IconButton>
					</Grid>
					{data?.organizations?.map(org =>
						listView ? (
							<CatalogListCard key={org.id} {...org} />
						) : (
							<CatalogCard key={org.id} {...org} />
						)
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default Catalog;
