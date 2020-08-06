import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../context/ApolloProvider";

//styles
const useStyles = makeStyles({
	tabName: {
		textAlign: "center"
	},
	charterQuestion: {
		marginBottom: "0.5rem"
	},
	charterAnswer: {
		marginBottom: "1.5rem"
	},
	charterContainer: {
		padding: "1rem"
	}
});

const QUERY = gql`
	query Charter($orgUrl: String) {
		charter(orgUrl: $orgUrl) {
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
	}
`;

const CharterQuestion = ({ question, answer }) => {
	const classes = useStyles();

	return (
		<div>
			<Typography variant={"h6"} className={classes.charterQuestion}>
				{question}
			</Typography>
			<Typography variant={"body1"} className={classes.charterAnswer}>
				{answer}
			</Typography>
		</div>
	);
};

const CharterTab = () => {
	const { orgUrl } = useParams();
	const classes = useStyles();

	const { data, loading, error } = useQuery(QUERY, {
		variables: { orgUrl },
		client
	});

	if (loading) {
		return <p>Loading</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<div>
			<Typography variant={"h5"} className={classes.tabName}>
				Charter
			</Typography>

			<div className={classes.charterContainer}>
				<CharterQuestion
					question={"Mission Statement: "}
					answer={data?.charter?.mission}
				/>

				<CharterQuestion
					question={"What is the purpose of this activity?"}
					answer={data?.charter?.purpose}
				/>

				<CharterQuestion
					question={"How does this activity benefit Stuyvesant?"}
					answer={data?.charter?.benefit}
				/>
			</div>
		</div>
	);
};

export default CharterTab;
