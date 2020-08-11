import React from "react";
import {
	Typography,
	Card,
	CardContent,
	makeStyles,
	TextField,
	Button
} from "@material-ui/core";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

const ADDCOMMENT = gql`
	mutation AddComment($orgId: Int!, $message: String!) {
		createCharterApprovalMessage(orgId: $orgId, message: $message) {
			message
		}
	}
`;

const useStyles = makeStyles(theme => ({
	card: {
		"margin-top": theme.spacing(1),
		"margin-bottom": theme.spacing(1)
	},
	button: {
		float: "right",
		margin: theme.spacing(1)
	}
}));

export default function Comments({ orgId, comments, changeComments }) {
	const classes = useStyles();
	const [message, setmessage] = React.useState("");
	const [addComment] = useMutation(ADDCOMMENT);
	const submitComment = () => {
		addComment({ variables: { orgId, message } });
		setmessage("");
		changeComments();
	};
	return (
		<div>
			<Typography variant={"h4"}>Comments</Typography>
			<Card className={classes.card}>
				<CardContent>
					<TextField
						label={"Add a comment..."}
						value={message}
						onChange={e => setmessage(e.target.value)}
						fullWidth
					/>
					<Button
						color={"primary"}
						onClick={submitComment}
						className={classes.button}
					>
						Submit
					</Button>
				</CardContent>
			</Card>
			{//First map reverses---can't use .reverse() because comments is read-only
			comments
				.map((_, i) => comments[comments.length - 1 - i])
				.map(comment => (
					<Card className={classes.card}>
						<CardContent>
							<Typography variant={"h6"}>
								{comment.user.name}{" "}
								{comment.auto
									? "(automatically generated)"
									: ""}
							</Typography>
							<Typography>{comment.message}</Typography>
						</CardContent>
					</Card>
				))}
		</div>
	);
}
