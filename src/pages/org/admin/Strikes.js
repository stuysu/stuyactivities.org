import React from "react";
import { List, ListItem, Link, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";

const classes = {
	margin: {
		margin: 2
	}
};

const QUERY = gql`
	query Strikes($url: String) {
		organizationByUrl(url: $url) {
			strikes {
				weight
				reason
				createdAt
			}
		}
	}
`;

export default function Strikes({ match }) {
	const { data } = useQuery(QUERY, {
		variables: { url: match.params.orgUrl }
	});

	let array = data?.organizationByUrl?.strikes;

	if (array === undefined || array.length === 0) {
		return (
			<Box sx={classes.margin}>
				<Typography>Your club doesn't have any strikes yet. Keep up the good work!</Typography>
			</Box>
		);
	} else {
		return (
			<Box sx={classes.margin}>
				<List>
					{data?.organizationByUrl?.strikes?.map(strikeData => (
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
					To appeal these strikes, email <Link color="secondary"  href="mailto: clubpub@stuysu.org">clubpub@stuysu.org</Link> with your
					organization name, the reason you were given the strike, and why it should be removed.
				</Typography>
			</Box>
		);
	}
}
