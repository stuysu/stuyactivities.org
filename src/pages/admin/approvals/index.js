import React from "react";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	makeStyles,
	Typography
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import UserContext from "../../../comps/context/UserContext";
import UnstyledLink from "../../../comps/ui/UnstyledLink";

const useStyles = makeStyles(theme => ({
	root: {
		"max-width": theme.breakpoints.width("md"),
		margin: "auto" //possible TODO: make a standard class for centering things
	},
	title: {
		"text-align": "center",
		margin: theme.spacing(2)
	},
	card: {
		display: "flex",
		"align-items": "flex-start",
		"justify-content": "flex-start"
	},
	cardRoot: {
		"margin-top": theme.spacing(1),
		"margin-bottom": theme.spacing(1),
		display: "flex"
	}
}));

const QUERY = gql`
	query {
		organizationsWithPendingCharters {
			id
			name
			url
			charter {
				picture
				mission
			}
		}
	}
`;

const Approvals = () => {
	const classes = useStyles();
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
		<div className={classes.root}>
			<Typography variant={"h3"} className={classes.title}>
				Charter Approvals
			</Typography>
			{data.organizationsWithPendingCharters.map((org, index) => (
				<div key={org.id}>
					<Card className={classes.cardRoot}>
						<UnstyledLink to={"/admin/approvals/" + org.url}>
							<CardActionArea className={classes.card}>
								<CardMedia
									image={org.charter.picture}
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
		</div>
	);
};

export default Approvals;
