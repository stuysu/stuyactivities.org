import React from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { gql, useMutation } from "@apollo/client";
import { cache } from "../../context/ApolloProvider";

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
	const [message, setMessage] = React.useState("");
	const [addComment] = useMutation(ADDCOMMENT);
	const submitComment = () => {
		cache
			.reset()
			.then(() => addComment({ variables: { orgId, message } }))
			.then(() => {
				setMessage("");
				window.sessionStorage.clear();
				changeComments();
			})
			.catch(console.log);
	};
	return (
		<div>
			<Typography variant={"h4"}>Comments</Typography>
			<Card className={classes.card}>
				<CardContent>
					<TextField
						label={"Add a comment..."}
						value={message}
						onChange={e => setMessage(e.target.value)}
						fullWidth
					/>
					<Button color={"primary"} onClick={submitComment} className={classes.button}>
						Submit
					</Button>
				</CardContent>
			</Card>
			{
				//First map reverses---can't use .reverse() because comments is read-only
				comments
					.map((_, i) => comments[comments.length - 1 - i])
					.map(comment => (
						<Card className={classes.card}>
							<CardContent>
								<Typography variant={"h6"}>
									{comment.user.name} {comment.auto ? "(automatically generated)" : ""}
								</Typography>
								<Typography>{comment.message}</Typography>
							</CardContent>
						</Card>
					))
			}
		</div>
	);
}
