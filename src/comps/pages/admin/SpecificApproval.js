import React from "react";
import {
	makeStyles,
	Typography,
	Card,
	CardContent,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Switch,
	FormControlLabel
} from "@material-ui/core";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/react-hooks";
//import Diff from "diff"
const Diff = require("diff");

const useStyles = makeStyles(theme => ({
	root: {
		"max-width": theme.breakpoints.width("md"),
		margin: "auto" //possible TODO: make a standard class for centering things
	},
	title: {
		"text-align": "center",
		margin: theme.spacing(2)
	},
	flex: {
		display: "flex",
		"align-items": "flex-start",
		"justify-content": "flex-start",
		padding: theme.spacing(1)
	},
	card: {
		"margin-top": theme.spacing(1),
		"margin-bottom": theme.spacing(1)
	},
	grow: {
		width: "100%"
	}
}));

const QUERY = gql`
	query Organization($url: String) {
		organization(url: $url) {
			name
			charter {
				picture
				mission
				purpose
				benefit
				appointmentProcedures
				uniqueness
				meetingSchedule
				meetingDays
				commitmentLevel
				extra
			}
			charterEdits {
				id
				submittingUser {
					name
				}
				picture
				mission
				purpose
				benefit
				appointmentProcedures
				uniqueness
				meetingSchedule
				meetingDays
				commitmentLevel
				extra
				alteredFields
			}
		}
	}
`;
const APPROVE = gql`
	mutation Approve($charterEditID: Int!, $fields: [String]!) {
		approveCharterFields(charterEditId: $charterEditID, fields: $fields) {
			id
		}
	}
`;
const REJECT = gql`
	mutation Reject($charterEditID: Int!, $fields: [String]!) {
		rejectCharterFields(charterEditId: $charterEditID, fields: $fields) {
			id
		}
	}
`;

const DiffComponent = ({ old, next }) => {
	old = old === null ? "" : old;
	next = next === null ? "" : next;
	return (
		<Typography>
			{Diff.diffSentences(old, next).map(part => (
				<span
					style={{
						background: part.added
							? "lightgreen"
							: part.removed
							? "salmon"
							: ""
					}}
				>
					{part.value}
				</span>
			))}
		</Typography>
	);
};

const SpecificApproval = props => {
	const classes = useStyles();

	const [data, setData] = React.useState({});
	const [dialogOptions, setDialogOptions] = React.useState({
		open: false,
		user: "",
		changeTo: "",
		change: "",
		action: "reject"
	});
	const [showDifference, setShowDifference] = React.useState(false);
	const [skip, setSkip] = React.useState(false);

	const [approveQuery] = useMutation(APPROVE);
	const [rejectQuery] = useMutation(REJECT);

	const { data: fetchData, error, loading } = useQuery(QUERY, {
		variables: { url: props.match.params.url },
		skip
	});
	React.useEffect(() => {
		if (!loading && fetchData?.organization) {
			if (fetchData.organization.charter.meetingDays) {
				fetchData.organization.charter.meetingDays = fetchData.organization.charter.meetingDays.join(
					", "
				);
			}
			fetchData.organization.charterEdits = fetchData.organization.charterEdits.map(
				edit => {
					if (edit.alteredFields.includes("meetingDays")) {
						return {
							...edit,
							meetingDays: edit.meetingDays.join(", ")
						};
					}
					return edit;
				}
			);
			setData(fetchData);
			setSkip(true);
		}
	}, [loading, fetchData]);
	if (error) return <p>There was an error fetching data</p>;
	if (loading || !data?.organization) return <p>Loading</p>;

	const individualPopup = (id, changeTo, action) => {
		setDialogOptions({
			id,
			open: true,
			user: data.organization.charterEdits.find(e => e.id === id)
				.submittingUser.name,
			changeTo,
			change: data.organization.charterEdits.find(e => e.id === id)[
				changeTo
			],
			action
		});
	};
	const closePopup = () => {
		setDialogOptions({ ...dialogOptions, open: false });
	};
	const approveallPopup = id => {
		setDialogOptions({
			id,
			open: true,
			user: data.organization.charterEdits.find(e => e.id === id)
				.submittingUser.name,
			changeTo: "",
			change: "",
			action: "approve all"
		});
	};
	const performAction = (id, user, changeTo, action) => {
		const charterEditIndex = data.organization.charterEdits.findIndex(
			e => e.id === id
		);
		if (action === "approve all") {
			approveQuery({
				variables: {
					charterEditID: id,
					fields:
						data.organization.charterEdits[charterEditIndex]
							.alteredFields
				}
			});
			data.organization.charterEdits.splice(charterEditIndex, 1);
		} else {
			if (action === "approve") {
				approveQuery({
					variables: { charterEditID: id, fields: [changeTo] }
				});
			} else {
				rejectQuery({
					variables: { charterEditID: id, fields: [changeTo] }
				});
			}
			delete data.organization.charterEdits[charterEditIndex][changeTo];
			data.organization.charterEdits[
				charterEditIndex
			].alteredFields.splice(
				data.organization.charterEdits[
					charterEditIndex
				].alteredFields.indexOf(changeTo),
				1
			);
			if (
				data.organization.charterEdits[charterEditIndex].alteredFields
					.length < 1
			) {
				data.organization.charterEdits.splice(charterEditIndex, 1);
			}
		}
		setData(data);
		setDialogOptions({ ...dialogOptions, open: false });
	};
	//TODO: FIND CHARTER EDITS BY ID AND NOT USERNAME!!!!!!!!!!!
	return (
		<div className={classes.root}>
			<Typography variant={"h3"} className={classes.title}>
				Charter Changes for {data.organization.name}
			</Typography>
			{Object.keys(data.organization.charterEdits).length === 0 ? (
				<div>
					<Typography>
						You've dealt with all of the changes!
					</Typography>
					<Button href="/admin/approvals" color="primary">
						Back
					</Button>
				</div>
			) : (
				<FormControlLabel
					control={
						<Switch
							checked={showDifference}
							onChange={e => setShowDifference(e.target.checked)}
							color="primary"
						/>
					}
					label="Show Differences"
				/>
			)}
			{data.organization.charterEdits.map(edit => (
				<div>
					<Card className={classes.card}>
						<CardContent>
							<div className={classes.flex}>
								<Typography
									variant={"h5"}
									className={classes.grow}
								>
									Changes by {edit.submittingUser.name}
								</Typography>
								<Button
									onClick={() => approveallPopup(edit.id)}
									style={{ "white-space": "nowrap" }}
									color="primary"
								>
									Approve All
								</Button>
							</div>
							{edit.alteredFields.map(field => (
								<div className={classes.flex}>
									<div className={classes.grow}>
										<Typography variant={"h6"}>
											Change to {field}:
										</Typography>
										{showDifference ? (
											<DiffComponent
												old={
													data.organization.charter[
														field
													]
												}
												next={edit[field]}
											/>
										) : (
											<Typography>
												{edit[field]}
											</Typography>
										)}
									</div>
									<div>
										<Button
											onClick={() =>
												individualPopup(
													edit.id,
													field,
													"reject"
												)
											}
											color="primary"
										>
											Reject
										</Button>
										<br />
										<Button
											onClick={() =>
												individualPopup(
													edit.id,
													field,
													"approve"
												)
											}
											color="primary"
										>
											Approve
										</Button>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			))}
			<Dialog open={dialogOptions.open} fullWidth={true} maxWidth={"md"}>
				{dialogOptions.action === "approve all" ? (
					<DialogTitle>
						Are you sure you want to approve all of{" "}
						{dialogOptions.user}'s changes?
					</DialogTitle>
				) : (
					<div>
						<DialogTitle>
							Are you sure you want to {dialogOptions.action}{" "}
							{dialogOptions.user}'s change to{" "}
							{dialogOptions.changeTo}?
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Proposed change: {dialogOptions.change}
							</DialogContentText>
						</DialogContent>
					</div>
				)}
				<DialogActions>
					<Button onClick={closePopup} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() =>
							performAction(
								dialogOptions.id,
								dialogOptions.user,
								dialogOptions.changeTo,
								dialogOptions.action
							)
						}
						color="primary"
					>
						{dialogOptions.action}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SpecificApproval;
