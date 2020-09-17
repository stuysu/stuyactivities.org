import React from "react";
import {
	Grid,
	makeStyles,
	Typography,
	TextField,
	Button,
	InputAdornment
} from "@material-ui/core";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { gql, useMutation } from "@apollo/client";
import { CalendarToday, Schedule } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
		boxSizing: "border-box"
	},
	titleText: {
		textAlign: "center",
		marginBottom: theme.spacing(2)
	},
	titleInput: {
		fontSize: "2em"
	},
	marginBottom: {
		marginBottom: theme.spacing(1)
	},
	marginBottomBig: {
		marginBottom: theme.spacing(2)
	}
}));

const CREATE_MUTATION = gql`
	mutation CreateMeeting(
		$orgUrl: String
		$title: String!
		$description: String!
		$start: DateTime!
		$end: DateTime!
	) {
		createMeeting(
			orgUrl: $orgUrl
			title: $title
			description: $description
			start: $start
			end: $end
		) {
			id
		}
	}
`;

const Meetings = ({ match }) => {
	const classes = useStyles();
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");

	const today = new Date();
	const [date, setDate] = React.useState(
		`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
			2,
			"0"
		)}-${today.getDate()}`
	);
	const [startTime, setStartTime] = React.useState("15:00");
	const [endTime, setEndTime] = React.useState("17:00");

	const [createMutation] = useMutation(CREATE_MUTATION);
	const create = () => {
		createMutation({
			variables: {
				orgUrl: match.params.orgUrl,
				title,
				description: description || "",
				start: new Date(`${date} ${startTime}`),
				end: new Date(`${date} ${endTime}`)
			}
		});

		setTitle("");
		setDescription("");
		setDate(
			`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
				2,
				"0"
			)}-${today.getDate()}`
		);
		setStartTime("15:00");
		setEndTime("17:00");
	};
	return (
		<div className={classes.margin}>
			<Grid container>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
					<Typography variant={"h4"} className={classes.titleText}>
						New Meeting
					</Typography>
					<TextField
						className={classes.marginBottomBig}
						fullWidth
						variant="outlined"
						label="Title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
							<TextField
								fullWidth
								label={"Date"}
								type="date"
								value={date}
								onChange={e => setDate(e.target.value)}
								variant={"outlined"}
								InputLabelProps={{ shrink: true }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<CalendarToday />
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
							<TextField
								fullWidth
								label={"Start Time"}
								type="time"
								value={startTime}
								onChange={e => setStartTime(e.target.value)}
								variant={"outlined"}
								InputLabelProps={{ shrink: true }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Schedule />
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
							<TextField
								fullWidth
								label={"End Time"}
								type="time"
								value={endTime}
								onChange={e => setEndTime(e.target.value)}
								variant={"outlined"}
								InputLabelProps={{ shrink: true }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Schedule />
										</InputAdornment>
									)
								}}
							/>
						</Grid>
					</Grid>
					<Typography variant={"h6"} className={classes.marginBottom}>
						Description
					</Typography>
					<SimpleMDE
						value={description}
						onChange={value => setDescription(value)}
					/>
					<Button
						onClick={create}
						color={"primary"}
						variant="contained"
					>
						Create
					</Button>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
					<Typography variant={"h4"} className={classes.titleText}>
						Existing Meetings
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default Meetings;
