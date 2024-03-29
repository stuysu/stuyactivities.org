import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../comps/context/ApolloProvider";
import capitalizeString from "../../utils/capitalizeString";
import { OrgContext } from "./index";
import LinkifyText from "../../comps/ui/LinkifyText";
import Box from "@mui/material/Box";

const classes = {
	tabName: {
		textAlign: "center"
	},
	charterQuestion: {
		paddingBottom: "0.5rem",
		paddingTop: "0.5rem",
		position: "sticky",
		top: 0,
		backgroundColor: "background.default",
		width: "100%",
		color: "primary.main"
	},
	charterAnswer: {
		marginBottom: "1.5rem"
	},
	charterContainer: {
		padding: "1rem"
	}
};

const QUERY = gql`
	query Charter($orgUrl: String) {
		charter(orgUrl: $orgUrl) {
			picture {
				url
			}
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
	const org = React.useContext(OrgContext);

	return (
		<div>
			<Typography variant={"h5"} sx={classes.charterQuestion}>
				{question}
			</Typography>
			<Typography variant={"body1"} sx={classes.charterAnswer}>
				{!org.active && !answer && <span style={{ color: "grey" }}>This response is pending approval</span>}
				<LinkifyText>{answer}</LinkifyText>
			</Typography>
		</div>
	);
};

const Charter = () => {
	const { orgUrl } = useParams();

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
			<Typography variant={"h2"} sx={classes.tabName}>
				Charter
			</Typography>

			<Box sx={classes.charterContainer}>
				<CharterQuestion question={"Mission Statement: "} answer={data?.charter?.mission} />

				<CharterQuestion
					question={"What days does this organization meet?"}
					answer={capitalizeString(data?.charter?.meetingDays?.join(", "), true)}
				/>

				<CharterQuestion question={"What is the meeting schedule?"} answer={data?.charter?.meetingSchedule} />

				<CharterQuestion question={"What is the purpose of this activity?"} answer={data?.charter?.purpose} />

				<CharterQuestion
					question={"How does this activity benefit Stuyvesant?"}
					answer={data?.charter?.benefit}
				/>

				<CharterQuestion
					question={"How does this activity appoint leaders?"}
					answer={data?.charter?.appointmentProcedures}
				/>

				<CharterQuestion question={"What makes this activity unique?"} answer={data?.charter?.uniqueness} />

				{Boolean(data?.charter?.extra) && (
					<CharterQuestion question={"Anything else?"} answer={data?.charter?.extra} />
				)}
			</Box>
		</div>
	);
};

export default Charter;
