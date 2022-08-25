import React from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import UserContext from "../../../comps/context/UserContext";
import UnstyledLink from "../../../comps/ui/UnstyledLink";
import Box from "@mui/material/Box";

const classes = {
	root: {
		// TODO: investigate the meaning of this
		// "max-width": theme.breakpoints.values.md,
		margin: "auto" //possible TODO: make a standard class for centering things
	},
	title: {
		"text-align": "center",
		margin: 2
	},
	card: {
		display: "flex",
		"align-items": "flex-start",
		"justify-content": "flex-start"
	},
	cardRoot: {
		"margin-top": 1,
		"margin-bottom": 1,
		display: "flex"
	}
};

const QUERY = gql`
	query {
		organizationsWithPendingCharters {
			id
			name
			url
			charter {
				picture {
					url
					thumbnail(width: 150, height: 150)
				}
				mission
			}
		}
	}
`;

const Approvals = () => {
	const user = React.useContext(UserContext);
	const { loading, error, data } = useQuery(QUERY);
	if (!user?.adminRoles?.some(e => e.role === "charters")) {
		return <p>You do not have the proper admin role to access this page!</p>;
	}
	console.log(error);
	if (error) return <p>There was an error fetching the charters: {error.message}</p>;
	if (loading || !data) return <p>Loading</p>;
	console.log(error, data);
	return (
		<Box sx={classes.root}>
			<Typography variant={"h3"} sx={classes.title}>
				Charter Approvals
			</Typography>
			{data.organizationsWithPendingCharters.map((org, index) => (
				<div key={org.id}>
					<Card sx={classes.cardRoot}>
						<UnstyledLink to={"/admin/approvals/" + org.url}>
							<CardActionArea sx={classes.card}>
								<CardMedia
									image={org.charter.picture?.thumbnail}
									style={{
										width: 150,
										height: 150,
										flexShrink: 0
									}}
									title={org.name + "'s picture"}
								/>
								<CardContent>
									<Typography variant={"h5"}>{org.name}</Typography>
									<Typography variant={"body1"}>{org.charter.mission}</Typography>
								</CardContent>
							</CardActionArea>
						</UnstyledLink>

						<CardActions>
							<UnstyledLink to={"/admin/approvals/" + org.url}>
								<Button color="primary">View</Button>
							</UnstyledLink>
						</CardActions>
					</Card>
				</div>
			))}
		</Box>
	);
};

export default Approvals;
