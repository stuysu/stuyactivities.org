import React from "react";
import { gql, useQuery } from "@apollo/client";
import { OrgContext } from "../index";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import styles from "./../../../Globals.module.css";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import capitalizeString from "../../../utils/capitalizeString";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	orgAvatar: {
		width: "200px",
		height: "200px"
	},
	card: {
		borderTop: props => {
			if (props.status === "pending") {
				return `1rem solid lightgrey`;
			}

			if (props.status === "approved") {
				return `1rem solid green`;
			}

			if (props.status === "rejected") {
				return `1rem solid red`;
			}
		}
	},
	status: {
		color: props => {
			if (props.status === "pending") {
				return `grey`;
			}

			if (props.status === "approved") {
				return `green`;
			}

			if (props.status === "rejected") {
				return `red`;
			}
		}
	}
});

const QUERY = gql`
	query($orgId: Int!) {
		charter(orgId: $orgId) {
			mission
			picture
			purpose
			benefit
			appointmentProcedures
			uniqueness
			meetingSchedule
			meetingDays
			commitmentLevel
			extra
			keywords
			updatedAt
		}
		charterEdits(orgId: $orgId) {
			alteredFields
			mission
			picture
			purpose
			benefit
			appointmentProcedures
			uniqueness
			meetingSchedule
			meetingDays
			commitmentLevel
			extra
			createdAt
			keywords
			submittingUser {
				name
				email
			}
			status
			reviewer {
				name
				email
			}
		}
	}
`;

const CharterEditCard = ({ edit }) => {
	const classes = useStyles({ status: edit.status });

	return (
		<Card className={classes.card}>
			<div className={styles.contentContainer}>
				<h3>Changes proposed by {edit?.submittingUser?.name}</h3>
				{edit.reviewer && (
					<h3>Reviewed by {edit?.submittingUser?.name}</h3>
				)}

				<h3>
					Status:{" "}
					<span className={classes.status}>{edit.status}</span>
				</h3>
				<List>
					{edit?.alteredFields?.map(field => {
						const label = field
							.split(/(?=[A-Z])/)
							.map(str => capitalizeString(str))
							.join(" ");

						let secondary = edit[field];

						if (field === "picture") {
							secondary = (
								<Avatar
									className={classes.orgAvatar}
									src={edit["picture"]}
								/>
							);
						}

						if (field === "commitmentLevel") {
							secondary = capitalizeString(secondary);
						}

						if (field === "meetingDays" || field === "keywords") {
							secondary = capitalizeString(
								secondary.join(", "),
								true
							);
						}

						return (
							<ListItem alignItems="flex-start">
								<ListItemText
									primary={label}
									secondary={secondary}
								/>
							</ListItem>
						);
					})}
				</List>
			</div>
		</Card>
	);
};

const CharterEdits = () => {
	const org = React.useContext(OrgContext);
	const { data } = useQuery(QUERY, { variables: { orgId: org.id } });

	const proposedChanges = {};

	if (data) {
		data.charterEdits.forEach(edit => {
			if (edit.status === "pending") {
				edit.alteredFields.forEach(field => {
					proposedChanges[field] = {
						submittingUser: edit.submittingUser,
						value: edit[field]
					};
				});
			}
		});
	}

	return (
		<div>
			<Typography variant={"h4"} style={{ textAlign: "center" }}>
				Charter Edits
			</Typography>
			<br />
			{data?.charterEdits?.map(edit => (
				<CharterEditCard edit={edit} />
			))}
		</div>
	);
};

export default CharterEdits;
