import React from "react";
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

const useStyles = makeStyles(theme => ({
	item: {
		width: "100%",
		float: "left"
	},
	avatar: {
		marginRight: "18px",
		width: theme.spacing(6),
		height: theme.spacing(6),
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
}));

export const StrikeFormContext = React.createContext({});

export default function StrikeCard({ name, charter }) {
	const classes = useStyles();
	const [weight, setWeight] = React.useState('');

	const handleChange = (event) => {
		setWeight(event.target.value);
	};

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
							<Typography className={classes.heading}>{name}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<form action="POST" className={classes.form} noValidate autoComplete={"off"}>
								<TextField
									label="Reason"
									multiline
									variant="outlined"
									className={classes.textField}
									fullWidth
								/>
								<FormControl variant="outlined" className={classes.select}>
									<InputLabel>Weight</InputLabel>
									<Select
										value={weight}
										onChange={handleChange}
										label="Weight"
									>
										<MenuItem value={0}>0</MenuItem>
										<MenuItem value={1}>1</MenuItem>
										<MenuItem value={2}>2</MenuItem>
										<MenuItem value={3}>3</MenuItem>
									</Select>
								</FormControl>
								<Button variant="contained" color="primary" className={classes.submit}>
									Submit
								</Button>
							</form>
						</AccordionDetails>
					</Accordion>
				</Paper>
			</List>
		</Grid>
	);
}
