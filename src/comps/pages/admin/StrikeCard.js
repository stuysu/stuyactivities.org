import React, { useState } from "react";
import {
	Avatar,
	Grid,
	List,
	Paper,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	makeStyles
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { gql, useMutation } from "@apollo/client";
import { cache } from "../../context/ApolloProvider";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({
	item: {
		width: "100%",
		float: "left"
	},
	avatar: {
		marginRight: "18px",
		width: theme.spacing(6),
		height: theme.spacing(6)
	},
	actionButton: {
		paddingRight: "20px"
	},
	heading: {
		fontSize: "1.6rem"
	},
	form: {
		width: "100%"
	},
	select: {
		marginTop: "8px",
		width: "6rem"
	},
	submit: {
		marginTop: "8px",
		marginLeft: "8px",
		height: "56px",
		width: "auto"
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
}));

const MUTATION = gql`
	mutation createStrike($orgId: Int, $weight: Int!, $reason: String!) {
		createStrike(orgId: $orgId, weight: $weight, reason: $reason)
	}
`;

export default function StrikeCard({ name, id, charter }) {
	const classes = useStyles();
	const [openModal, setOpenModal] = React.useState(false);
	const [reason, setReason] = React.useState("");
	const [weight, setWeight] = React.useState("");

	const [submit, { data, loading, error }] = useMutation(MUTATION, {
		variables: {
			orgId: id,
			weight: weight,
			reason: reason
		}
	});

	if (error) {
		return <p>There was an error submitting this strike.</p>;
	}

	const handleSubmit = evt => {
		evt.preventDefault();
		cache
			.reset()
			.then(() => submit())
			.then(() => {
				window.sessionStorage.clear();
			})
			.catch(console.log);
	};

	const submitModal = (
		<div className={classes.paper}>
			<Typography>
				Are you sure you want to submit this strike?
			</Typography>
			<Button variant={"contained"} onClick={setOpenModal(false)}>
				Cancel
			</Button>
			<Button variant={"contained"} type={"submit"} color={"primary"}>
				Submit
			</Button>
		</div>
	);

	return (
		<Grid item xs={12}>
			<List>
				<Paper className={classes.item}>
					<Accordion>
						<AccordionSummary
							expandIcon={<EditIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							className={classes.actionButton}
						>
							<Avatar
								src={charter.picture}
								className={classes.avatar}
							/>
							<Typography className={classes.heading}>
								{name}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<form
								onSubmit={handleSubmit}
								className={classes.form}
								noValidate
								autoComplete={"off"}
							>
								<TextField
									label="Reason"
									multiline
									variant="outlined"
									className={classes.textField}
									fullWidth
									value={reason}
									onChange={e => setReason(e.target.value)}
								/>
								<FormControl
									variant="outlined"
									className={classes.select}
								>
									<InputLabel>Weight</InputLabel>
									<Select
										value={weight}
										onChange={e =>
											setWeight(e.target.value)
										}
										label="Weight"
									>
										<MenuItem value={0}>0</MenuItem>
										<MenuItem value={1}>1</MenuItem>
										<MenuItem value={2}>2</MenuItem>
										<MenuItem value={3}>3</MenuItem>
									</Select>
								</FormControl>
								{reason === "" || weight === "" ? (
									<Button
										variant="contained"
										color="primary"
										className={classes.submit}
										type={"submit"}
										value={"submit"}
										disabled
									>
										Submit
									</Button>
								) : (
									<Button
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={loading}
										onClick={setOpenModal(true)}
									>
										Submit
									</Button>
								)}
								<Modal
									open={openModal}
									onClose={setOpenModal(false)}
									className={classes.modal}
								>
									{submitModal}
								</Modal>
							</form>
						</AccordionDetails>
					</Accordion>
				</Paper>
			</List>
		</Grid>
	);
}
