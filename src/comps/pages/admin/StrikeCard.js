import React from "react";
import {
	// Avatar,
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
	MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { gql, useMutation } from "@apollo/client";
import { cache } from "../../context/ApolloProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const classes = {
	item: {
		width: "100%",
		float: "left"
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
	}
};

const MUTATION = gql`
	mutation createStrike($orgId: Int, $weight: Int!, $reason: String!) {
		createStrike(orgId: $orgId, weight: $weight, reason: $reason) {
			weight
			reason
		}
	}
`;

export default function StrikeCard({ name, id }) {
	const [open, setOpen] = React.useState(false);
	const [reason, setReason] = React.useState("");
	const [weight, setWeight] = React.useState("");

	const [submit, { loading, error }] = useMutation(MUTATION, {
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
			.then(() => setOpen(true))
			.then(() => {
				window.sessionStorage.clear();
				setReason("");
				setWeight("");
			})
			.catch(console.log);
	};

	return (
		<Grid item xs={12}>
			<List>
				<Paper sx={classes.item}>
					<Accordion>
						<AccordionSummary
							expandIcon={<EditIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							sx={classes.actionButton}
						>
							<Typography sx={classes.heading}>{name}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box
								component="form"
								onSubmit={handleSubmit}
								sx={classes.form}
								noValidate
								autoComplete={"off"}
							>
								<TextField
									label="Reason"
									multiline
									variant="outlined"
									sx={classes.textField}
									fullWidth
									value={reason}
									onChange={e => setReason(e.target.value)}
								/>
								<FormControl variant="outlined" sx={classes.select}>
									<InputLabel>Weight</InputLabel>
									<Select
										variant="standard"
										value={weight}
										onChange={e => setWeight(e.target.value)}
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
										sx={classes.submit}
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
										type={"submit"}
										sx={classes.submit}
										disabled={loading}
										onClick={handleSubmit}
									>
										Submit
									</Button>
								)}
							</Box>
						</AccordionDetails>
					</Accordion>
					<Snackbar
						open={open}
						autoHideDuration={3000}
						onClose={() => setOpen(false)}
						anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					>
						<Alert onClose={() => setOpen(false)} severity="success">
							Strike successfully submitted!
						</Alert>
					</Snackbar>
				</Paper>
			</List>
		</Grid>
	);
}
