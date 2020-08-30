import React from "react";
import {
	Grid,
	Typography,
	makeStyles,
	TextField,
	Button
} from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	},
	spaced: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

const MUTATION = gql`
	mutation createMembershipRequest($orgUrl: String, $message: String) {
		createMembershipRequest(orgUrl: $orgUrl, message: $message) {
			id
		}
	}
`;

export default function RequestToJoin({ match, history }) {
	const classes = useStyles();
	const [message, setMessage] = React.useState("");
	const [requestMutation] = useMutation(MUTATION, {
		onCompleted() {
			history.push(match.url);
		}
	});
	return (
		<Grid
			className={classes.margin}
			container
			style={{ "justify-content": "center" }}
		>
			<Grid item xl={6} lg={6} md={8} sm={12} xs={12}>
				<Typography variant={"h4"} style={{ "text-align": "center" }}>
					Join this club
				</Typography>
				<TextField
					fullWidth
					label={"Message to admins (optional)"}
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>
				<Button
					color="primary"
					onClick={() =>
						requestMutation({
							variables: { orgUrl: match.params.orgUrl, message }
						})
					}
					variant="contained"
					className={classes.spaced}
				>
					Request
				</Button>
			</Grid>
		</Grid>
	);
}
