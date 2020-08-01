import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../../context/ApolloProvider";

const useStyles = makeStyles({
	root: {
		textAlign: "center",
		margin: "1em, 0"
	}
});

const QUERY = gql`
	query Organization($url: String) {
		organization(url: $url) {
			name
			active
			charter {
				picture
				mission
				meetingFrequency
				commitmentLevel
			}
			# You might also want to use the tags
			tags {
				name
			}
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
	const classes = useStyles();

	const { data, loading, error } = useQuery(QUERY, {
		variables: { url },
		client
	});

	if (loading) {
		return <p>Loading</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={1} />
			<Grid item xs={10} className={classes.root}>
				<Typography variant={"h3"}>{data.organization.name}</Typography>
			</Grid>
			<Grid item xs={1} />
		</Grid>
	);
}
