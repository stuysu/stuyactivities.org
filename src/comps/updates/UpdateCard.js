import React, { useState } from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
	TextField,
	Button,
	Grid,
	Card,
	ListItemSecondaryAction,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions
} from "@material-ui/core";
import Carousel from "react-multi-carousel";

import { makeStyles } from "@material-ui/core/styles";
import LinkPreview from "./LinkPreview";
import moment from "moment-timezone";
import UnstyledLink from "../ui/UnstyledLink";
import MarkdownRenderer from "../ui/MarkdownRenderer";
import UpdateDeleteButton from "./UpdateDeleteButton";
import { gql, useMutation, useQuery } from "@apollo/client";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import DeleteIcon from "@material-ui/icons/Delete";

const ASK_QUESTION = gql`
	mutation CreateUpdateQuestion($updateId: Int!, $question: String!) {
		createUpdateQuestion(updateId: $updateId, question: $question) {
			id
		}
	}
`;

const ANSWER_QUESTION = gql`
	mutation AnswerUpdateQuestion($updateQuestionId: Int!, $answer: String!, $private: Boolean!) {
		answerUpdateQuestion(updateQuestionId: $updateQuestionId, answer: $answer, private: $private) {
			id
		}
	}
`;

const DELETE_QUESTION = gql`
	mutation DeleteUpdateQuestion($updateQuestionId: Int!) {
		deleteUpdateQuestion(updateQuestionId: $updateQuestionId)
	}
`;

const useStyles = makeStyles(theme => ({
	cardContent: {
		padding: "0 1rem",
		overflowWrap: "anywhere"
	},
	card: {
		width: "100%"
	},
	ignoreLimit: {
		cursor: "pointer",
		"&:hover": {
			textDecoration: "underline"
		}
	},
	rightAlignedText: {
		textAlign: "right",
		marginRight: theme.spacing(2)
	},
	noPadding: {
		padding: 0
	},
	topBottomMargin: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

const responsive = {
	desktop: {
		breakpoint: { max: 4000, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
};

const UpdateCard = ({
	id,
	organization,
	title,
	content,
	pictures,
	links,
	createdAt,
	limit = true,
	showDelete = false,
	questions,
	refetchFunc = () => {}
}) => {
	const classes = useStyles();

	const [ignoreLimit, setIgnoreLimit] = useState(false);
	let shortContent = content;

	let limited = false;

	if (!ignoreLimit && limit && typeof content === "string" && content.length > 500) {
		shortContent = content.substr(0, 500) + "...";
		limited = true;
	}

	const [question, setQuestion] = useState("");
	const [ask] = useMutation(ASK_QUESTION, {
		update(cache) {
			cache.reset();
			setQuestion("");
		}
	});

	return (
		<Card>
			<List>
				<ListItem>
					<UnstyledLink to={`/${organization.url}`}>
						<ListItemAvatar>
							<Avatar alt={organization?.name} src={organization?.charter?.picture} />
						</ListItemAvatar>
					</UnstyledLink>
					<UnstyledLink to={`/${organization.url}`}>
						<ListItemText
							primary={organization?.name}
							secondary={moment(createdAt).format("dddd, MMMM Do YYYY, h:mm a")}
						/>
					</UnstyledLink>
				</ListItem>
				{showDelete && (
					<ListItemSecondaryAction>
						<UpdateDeleteButton updateId={id} />
					</ListItemSecondaryAction>
				)}
			</List>
			<div className={classes.cardContent}>
				<Typography variant={"h5"}>{title}</Typography>
				<MarkdownRenderer>{shortContent}</MarkdownRenderer>

				{limited && !ignoreLimit && (
					<Typography color={"primary"} className={classes.ignoreLimit} onClick={() => setIgnoreLimit(true)}>
						Keep Reading
					</Typography>
				)}
				{Boolean(pictures.length) && (
					<Carousel responsive={responsive} className={classes.picCarousel}>
						{pictures.map(pic => (
							<div
								style={{
									position: "relative"
								}}
								key={pic.id}
							>
								<img
									src={pic.defaultUrl}
									alt={"Upload"}
									style={{
										objectFit: "contain",
										width: "100%",
										height: "300px"
									}}
								/>
								<Typography variant={"subtitle2"} align={"center"} color={"secondary"}>
									{pic.description}
								</Typography>
							</div>
						))}
					</Carousel>
				)}
				{links?.length > 0 && links.map(link => <LinkPreview {...link} key={link.id} />)}
				{Boolean(questions?.length) && (
					<List>
						{questions.map((question, i) => (
							<Question question={question} organization={organization} keyy={i * 2} />
						))}
					</List>
				)}
				<Grid container alignItems={"center"} className={classes.topBottomMargin}>
					<Grid item xs={10}>
						<TextField
							fullWidth
							variant="outlined"
							label="Ask a Question"
							value={question}
							onChange={e => setQuestion(e.target.value)}
						/>
					</Grid>
					<Grid item xs={2}>
						<Button
							style={{ float: "right" }}
							variant="contained"
							color="primary"
							onClick={() => ask({ variables: { question, updateId: id } })}
						>
							Ask
						</Button>
					</Grid>
				</Grid>
			</div>
		</Card>
	);
};

const Question = ({ question, organization, keyy }) => {
	const classes = useStyles();
	const [answer, setAnswer] = React.useState();
	const [open, setOpen] = React.useState(false);
	const [answerMutation] = useMutation(ANSWER_QUESTION, {
		update(cache) {
			cache.reset();
		},
		onComplete() {
			setOpen(false);
		}
	});
	const [del] = useMutation(DELETE_QUESTION, {
		update(cache) {
			cache.reset();
		}
	});

	return (
		<>
			<ListItem className={classes.noPadding} key={keyy}>
				<ListItemAvatar>
					<Avatar alt={question.submittingUser.name} src={question.submittingUser.picture} />
				</ListItemAvatar>
				<ListItemText primary={question.question} secondary={question.submittingUser.name} />
				{organization?.membership?.adminPrivileges && (
					<ListItemSecondaryAction>
						<IconButton onClick={() => setOpen(true)}>
							<QuestionAnswerIcon />
						</IconButton>
						<IconButton onClick={() => del({ variables: { updateQuestionId: question.id } })}>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				)}
			</ListItem>
			{question.answer && (
				<ListItem className={classes.noPadding} key={keyy + 1}>
					<ListItemText
						className={classes.rightAlignedText}
						primary={question.answer}
						secondary={organization?.name}
					/>
					<ListItemAvatar>
						<Avatar alt={organization?.name} src={organization?.charter?.picture} />
					</ListItemAvatar>
				</ListItem>
			)}
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Answer {question.submittingUser.name}'s question</DialogTitle>
				<DialogContent>
					<DialogContentText>Question: "{question.question}"</DialogContentText>
					<TextField
						autoFocus
						fullWidth
						label="Answer"
						value={answer}
						onChange={e => setAnswer(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button
						onClick={() =>
							answerMutation({ variables: { updateQuestionId: question.id, answer, private: true } })
						}
					>
						Answer Privately
					</Button>
					<Button
						onClick={() =>
							answerMutation({ variables: { updateQuestionId: question.id, answer, private: false } })
						}
					>
						Answer Publicly
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default UpdateCard;
