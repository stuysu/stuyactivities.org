import React from "react";
import { List, ListItem, makeStyles, Typography } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	}
}));

const QUERY = gql`
	query Strikes($url: String!) {
		organization(orgUrl: $url) {
			strikes {
				weight
				reason
				createdAt
			}
		}
	}
`;

export default function Strikes({ match }) {
	const classes = useStyles();
	const { data } = useQuery(QUERY, {
		variables: { url: match.params.orgUrl }
	});

	return (
		<div>
			<List>
				<ListItem>
					<div>
						<Typography>Reason: {data?.organization?.strikes?.reason}</Typography>
						<Typography>Weight: {data?.organization?.strikes?.weight}</Typography>
						<Typography>Date: {data?.organization?.strikes?.createdAt}</Typography>
					</div>
				</ListItem>
			</List>
		</div>
	);
}
