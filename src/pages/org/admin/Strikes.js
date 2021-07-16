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

	let array = data?.organization?.strikes;

	if (array === undefined || array.length === 0) {
		return (
			<div className={classes.margin}>
				<Typography>Your club doesn't have any strikes yet. Keep up the good work!</Typography>
			</div>
		);
	} else {
		return (
			<div className={classes.margin}>
				<List>
					{data?.organization?.strikes?.map(strikeData => (
						<ListItem>
							<div>
								<Typography>Reason: {strikeData.reason}</Typography>
								<Typography>Weight: {strikeData.weight}</Typography>
								<Typography>
									Date:{" "}
									{new Date(strikeData.createdAt).toLocaleDateString(undefined, {
										year: "numeric",
										month: "long",
										day: "numeric"
									})}
								</Typography>
							</div>
						</ListItem>
					))}
				</List>
				<Typography>
					To appeal these strikes, email <a href="mailto: clubpub@stuysu.org">clubpub@stuysu.org</a> with your
					organization name, the reason you were given the strike, and why it should be removed.
				</Typography>
			</div>
		);
	}
}
