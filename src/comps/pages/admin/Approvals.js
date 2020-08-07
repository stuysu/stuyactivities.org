import React from "react";
import {
	makeStyles,
	Typography,
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
	Button,
	CardActions
} from "@material-ui/core";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

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
	const { loading, error, data } = useQuery(QUERY);
	console.log(error);
	if (error)
		return <p>There was an error fetching the charters: {error.message}</p>;
	if (loading || !data) return <p>Loading</p>;
	console.log(error, data);
	return (
		<div className={classes.root}>
			<Typography variant={"h3"} className={classes.title}>
				Charter Approvals
			</Typography>
			{data.organizationsWithPendingCharters.map((org, index) => (
				<div>
					<Card className={classes.cardRoot}>
						<CardActionArea
							className={classes.card}
							href={"/admin/approvals/" + org.url}
						>
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
								<Typography variant={"h5"}>
									{org.name}
								</Typography>
								<Typography variant={"body1"}>
									{org.charter.mission}
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button
								href={"/admin/approvals/" + org.url}
								color="primary"
							>
								View
							</Button>
						</CardActions>
					</Card>
				</div>
			))}
		</div>
	);
};

export default Approvals;