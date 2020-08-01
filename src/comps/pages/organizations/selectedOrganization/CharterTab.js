import React from "react";
import {useParams} from "react-router-dom";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {gql} from "@apollo/client";

const useStyles = makeStyles({
	root: {
		textAlign: 'center',
		margin: '1em, 0'

	}

});

const QUERY = gql`
	query Organizations (
		$keyword: String
		$tags: [String]
		$commitmentLevels: [String]
		$meetingDays: [String]
		$min: Int
		$max: Int
	) {
		organizations (
			keyword: $keyword
			tags: $tags
			commitmentLevels: $commitmentLevels
			meetingDays: $meetingDays
			meetingFrequency: { min: $min, max: $max }
			limit: 50
			offset: 0
		) {
			name
			url
			active
			charter {
				picture
				mission
				meetingFrequency
				commitmentLevel
			}
		}
		tags {
			name
		}
	}
`;

// const { error, data, refetch } = useQuery(QUERY, {
// 	variables: {
//
//
// 	}
// });
// if (error) return <p>There was an error loading this page</p>;

export default function CharterTab(charter) {
	const url = useParams().url;

	return (
		<Grid container spacing={2}>
			<Grid item xs={1}/>
			<Grid item xs={10} className={useStyles.root}>
				<Typography variant={"h3"}>
					NAME
				</Typography>

			</Grid>
			<Grid item xs={1}/>
		</Grid>
	);
}
