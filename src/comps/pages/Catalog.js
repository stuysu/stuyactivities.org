import React from "react";
import {Grid, TextField, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox, Slider, Typography, Card, CardMedia, CardContent, CardActionArea, Accordion, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {makeStyles} from '@material-ui/core/styles';
import {gql} from "@apollo/client";
import {useQuery, useLazyQuery} from "@apollo/react-hooks";

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
	}
}))
const QUERY = gql`
query Organizations($keyword: String, $tags: [String], $commitmentLevels: [String], $meetingDays: [String], $min: Int, $max: Int) {
	organizations(keyword: $keyword, tags: $tags, commitmentLevels: $commitmentLevels, meetingDays: $meetingDays, meetingFrequency: {min: $min, max: $max}, limit: 50, offset: 0) {
		name
		url
		picture
		active
		charter {
			mission
			meetingFrequency
			commitmentLevel
		}
	}
}`
const Catalog = () => {
	const classes = useStyles()
	const [filters, changeFilters] = React.useState({
		keyword: "",
		tags: [],
		commitmentLevels: ["Low", "Medium", "High"],
		meetingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		meetingFrequency: {min: 1, max: 20}
	})
	const [organizations, updateOrganizations] = React.useState([])
	const [finishedFirst, finishFirst] = React.useState(false)
	const {loading, error, data, refetch} = useQuery(QUERY, {variables: {...filters, min: filters.meetingFrequency.min, max: filters.meetingFrequency.max}})
	if (error) return `Error! ${error}`
	if (!finishedFirst) {
		if (loading) return <Typography variant={"h3"}>Loading Organizations</Typography>
		finishFirst(true)
		updateOrganizations(data.organizations)
	}
	const useFilterChangeEvent = async (event, newVal) => {
		console.log(newVal)
		let newFilters = {}
		if (event.target.name === "keyword") {
			newFilters = {...filters, keyword: event.target.value}
		} else if (Array.isArray(newVal)) { //workaround because name doesn't work on the slider for some reason
			if (filters.meetingFrequency.min === newVal[0] && filters.meetingFrequency.max === newVal[1]) return
			newFilters = {...filters, meetingFrequency: {min: newVal[0], max: newVal[1]}}
		} else {
			if (newVal) {
				newFilters = {...filters, [event.target.name]: filters[event.target.name].concat([event.target.value])}
			} else {
				newFilters = {...filters, [event.target.name]: filters[event.target.name].filter(e => e !== event.target.value)}
			}
		}
		changeFilters(newFilters)
		const {data} = await refetch({...newFilters, min: newFilters.meetingFrequency.min, max: newFilters.meetingFrequency.max})
		if (data) {
			updateOrganizations(data.organizations)
		}
	}
	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={3} direction={"column"} className={classes.bigChild}>
					<Typography className={classes.filterChild} variant={"h4"}>Filters</Typography>
					<FormControl className={classes.filterChild}>
						<TextField name="keyword" label="Search" variant="outlined" fullWidth={true} value={filters.keyword} onChange={useFilterChangeEvent}/>
					</FormControl><br/>
					<FormControl component="fieldset" className={classes.filterChild}>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon/>}>
								<FormLabel component="legend">Tags</FormLabel>
							</AccordionSummary>
							<FormGroup>
								{["Tag 1", "Tag 2", "Tag 3"].map(e =>
									<FormControlLabel control={<Checkbox checked={filters.tags.includes(e)} onChange={useFilterChangeEvent} name={"tags"} value={e}/>} label={e} className={classes.accordionChild}/>)}
							</FormGroup>
						</Accordion>
					</FormControl><br/>
					<FormControl component="fieldset" className={classes.filterChild}>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon/>}>
								<FormLabel component="legend">Commitment Level</FormLabel>
							</AccordionSummary>
							<FormGroup>
								{["Low", "Medium", "High"].map(e =>
									<FormControlLabel control={<Checkbox checked={filters.commitmentLevels.includes(e)} onChange={useFilterChangeEvent} name={"commitmentLevels"} value={e}/>} label={e} className={classes.accordionChild}/>)}
							</FormGroup>
						</Accordion>
					</FormControl><br/>
					<FormControl component="fieldset" className={classes.filterChild}>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon/>}>
								<FormLabel component="legend">Meeting Days</FormLabel>
							</AccordionSummary>
							<FormGroup>
								{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",]
									.map(e => <FormControlLabel control={<Checkbox checked={filters.meetingDays.includes(e)} onChange={useFilterChangeEvent} name={"meetingDays"} value={e}/>} label={e} className={classes.accordionChild}/>)}
							</FormGroup>
						</Accordion>
					</FormControl><br/>
					<FormControl className={classes.filterChild}>
						<Typography id="freqText" gutterBottom>Meeting Frequency (days/month)</Typography>
						<Slider value={[filters.meetingFrequency.min, filters.meetingFrequency.max]} min={1} max={20} valueLabelDisplay="auto" aria-labelledby="freqText" name={"meetingFrequency"} onChange={useFilterChangeEvent} marks={true}/>
					</FormControl><br/>
				</Grid>
				<Grid container item xs={9} className={classes.bigChild} alignContent={"flex-start"} alignItems={"flex-start"} justify={"space-around"}>
					<Grid item xs={12}>
						<Typography variant={"h4"} className={classes.filterChild}>Catalog</Typography><br/>
					</Grid>
					{organizations.map(org => <Grid item xs={4}>
						<Card className={classes.card}>
							<CardActionArea onClick={()=>window.location.href = org.url}>
								<CardMedia image={org.picture} title={org.name + "'s picture"} style={{height: 140}}/>
								<CardContent>
									<Typography variant={"h5"} gutterBottom>{org.name}</Typography>
									<Typography>Mission Statement: {org.charter.mission}</Typography>
									<Typography variant={"body2"}>Commitment Level: {org.charter.commitmentLevel}</Typography>
									<Typography variant={"body2"}>Meeting Frequency: {org.charter.meetingFrequency} days/month</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>)}
				</Grid>
			</Grid>
		</div>
	)
};

export default Catalog;
