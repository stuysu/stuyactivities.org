import React from "react";
import { List, ListItem, makeStyles, Typography } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	}
}));

const QUERY = gql`
	query Strikes($url: String) {
		organization(url: $url) {
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

	console.log(data);

	return (
		<div>
			<List>
				{data?.organization?.map(strikeData => (
					<ListItem>
						<div>
							<Typography>Reason: "{strikeData.strikes?.reason}"</Typography>
							<Typography>Weight: "{strikeData.strikes?.weight}"</Typography>
							<Typography>Date: "{strikeData.strikes?.createdAt}"</Typography>
						</div>
					</ListItem>
				))}
			</List>
		</div>
	);
}
