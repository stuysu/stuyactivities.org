import React from "react";
import {useParams} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {gql, useQuery} from "@apollo/client";
import {client} from "../../comps/context/ApolloProvider";
import capitalizeString from "../../utils/capitalizeString";
import {OrgContext} from "./index";
import Linkify from "linkifyjs/react";
import Link from "@material-ui/core/Link";

import normalize from "normalize-url";

//styles
const useStyles = makeStyles(theme => ({
	tabName: {
		textAlign: "center"
		// color: theme.palette.secondary.main
	},
	charterQuestion: {
		paddingBottom: "0.5rem",
		paddingTop: "0.5rem",
		position: "sticky",
		top: 0,
		background: theme.palette.background.default,
		width: "100%",
		color: theme.palette.primary.main
	},
	charterAnswer: {
		marginBottom: "1.5rem"
	},
	charterContainer: {
		padding: "1rem"
	}
}));

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

const CharterQuestion = ({question, answer}) => {
	const classes = useStyles();

	const org = React.useContext(OrgContext);

	return (
		<div>
			<Typography variant={"h5"} className={classes.charterQuestion}>
				{question}
			</Typography>
			<Typography variant={"body1"} className={classes.charterAnswer}>
				{!org.active && !answer && <span style={{color: "grey"}}>This response is pending approval</span>}
				<Linkify
					options={{
						tagName: "span",
						defaultProtocol: "http",
						format: function (value, type) {
							if (type === "email") {
								return (
									<Link href={`mailto:${value}`} target={"_blank"} color={"primary"}>
										{value}
									</Link>
								);
							}

							if (type === "url") {
								return (
									<Link href={normalize(value)} target={"_blank"} color={"secondary"}>
										{value}
									</Link>
								);
							}
							return <span>{value}</span>;
						}
					}}
				>
					{answer}
				</Linkify>
			</Typography>
		</div>
	);
};

const Charter = () => {
	const {orgUrl} = useParams();
	const classes = useStyles();

	const {data, loading, error} = useQuery(QUERY, {
		variables: {orgUrl},
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
			<Typography variant={"h2"} className={classes.tabName}>
				Charter
			</Typography>

			<div className={classes.charterContainer}>
				<CharterQuestion question={"Mission Statement: "} answer={data?.charter?.mission}/>

				<CharterQuestion
					question={"What days does this organization meet?"}
					answer={capitalizeString(data?.charter?.meetingDays?.join(", "), true)}
				/>

				<CharterQuestion question={"What is the meeting schedule?"} answer={data?.charter?.meetingSchedule}/>

				<CharterQuestion question={"What is the purpose of this activity?"} answer={data?.charter?.purpose}/>

				<CharterQuestion
					question={"How does this activity benefit Stuyvesant?"}
					answer={data?.charter?.benefit}
				/>

				<CharterQuestion
					question={"How does this activity appoint leaders?"}
					answer={data?.charter?.appointmentProcedures}
				/>

				<CharterQuestion question={"What makes this activity unique?"} answer={data?.charter?.uniqueness}/>

				{Boolean(data?.charter?.extra) && (
					<CharterQuestion question={"Anything else?"} answer={data?.charter?.extra}/>
				)}
			</div>
		</div>
	);
};

export default Charter;
