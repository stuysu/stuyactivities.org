import React from "react";
import {
	Accordion,
	AccordionSummary,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	TextField,
	Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import CatalogCard from "./CatalogCard";
import CatalogListCard from "./CatalogListCard";
import { List, ViewComfy } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	bigChild: {
		padding: theme.spacing(2)
	},
	filterChild: {
		padding: theme.spacing(1),
		width: "100%"
	},
	accordionChild: {
		"padding-left": theme.spacing(1)
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

	// Returns a new array containing val, if it didn't before or with val removed otherwise
	const arrayToggle = (val, arr) => {
		const newArray = [...arr];
		const valIndex = arr.indexOf(val);

		if (valIndex === -1) {
			newArray.push(val);
		} else {
			newArray.splice(valIndex, 1);
		}

		return newArray;
	};

	const toggleTag = tag => {
		const newTags = arrayToggle(tag, tags);
		setTags(newTags);
	};

	const toggleCommitmentLevel = level => {
		const newLevels = arrayToggle(level, commitmentLevels);
		setCommitmentLevels(newLevels);
	};

	const toggleMeetingDay = day => {
		const newDays = arrayToggle(day, meetingDays);
		setMeetingDays(newDays);
	};

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
						<FormControl className={classes.filterChild}>
							<TextField
								name="keyword"
								label="Search"
								variant="outlined"
								fullWidth={true}
								value={keyword}
								onChange={ev => setKeyword(ev.target.value)}
							/>
						</FormControl>
						<br />
						<FormControl
							component="fieldset"
							className={classes.filterChild}
						>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<FormLabel component="legend">
										Tags
									</FormLabel>
								</AccordionSummary>
								<FormGroup>
									{data?.tags?.map(tag => (
										<FormControlLabel
											key={tag.id}
											control={
												<Checkbox
													checked={tags.includes(
														tag.name
													)}
													onChange={() =>
														toggleTag(tag.name)
													}
													value={tag.name}
												/>
											}
											label={tag.name}
											className={classes.accordionChild}
										/>
									))}
								</FormGroup>
							</Accordion>
						</FormControl>
						<br />
						<FormControl
							component="fieldset"
							className={classes.filterChild}
						>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<FormLabel component="legend">
										Commitment Level
									</FormLabel>
								</AccordionSummary>
								<FormGroup>
									{["Low", "Medium", "High"].map(level => (
										<FormControlLabel
											key={level}
											control={
												<Checkbox
													checked={commitmentLevels.includes(
														level
													)}
													onChange={() =>
														toggleCommitmentLevel(
															level
														)
													}
													value={level}
												/>
											}
											label={level}
											className={classes.accordionChild}
										/>
									))}
								</FormGroup>
							</Accordion>
						</FormControl>
						<br />
						<FormControl
							component="fieldset"
							className={classes.filterChild}
						>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<FormLabel component="legend">
										Meeting Days
									</FormLabel>
								</AccordionSummary>
								<FormGroup>
									{[
										"Monday",
										"Tuesday",
										"Wednesday",
										"Thursday",
										"Friday"
									].map(day => (
										<FormControlLabel
											key={day}
											control={
												<Checkbox
													checked={meetingDays.includes(
														day
													)}
													onChange={() =>
														toggleMeetingDay(day)
													}
													value={day}
												/>
											}
											label={day}
											className={classes.accordionChild}
										/>
									))}
								</FormGroup>
							</Accordion>
						</FormControl>
						<br />
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
