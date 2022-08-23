//NO LONGER ACCESSIBLE FROM SITE
//File has not been deleted in order to make re-implementation easier, if we
//choose to re-implement this page similarly in coming years.

import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { OrgContext } from "../index";
import Loading from "../../../comps/ui/Loading";
import layout from "./../../../styles/Layout.module.css";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button } from "@mui/material";

const RESPONSE = gql`
	query ($orgId: Int!) {
		clubFairResponse(orgId: $orgId) {
			id
			isAttending
			meetingDay
			meetingLink
		}
	}
`;

const ALTER_RESPONSE = gql`
	mutation ($orgId: Int!, $isAttending: Boolean!, $meetingLink: String) {
		alterClubFairResponse(orgId: $orgId, isAttending: $isAttending, meetingLink: $meetingLink) {
			id
			organizationId
			isAttending
			meetingDay
			meetingLink
		}
	}
`;

const ClubFair = () => {
	const org = React.useContext(OrgContext);
	const { data, loading } = useQuery(RESPONSE, { variables: { orgId: org.id }, fetchPolicy: "network-only" });
	const [isAttending, setIsAttending] = React.useState(null);

	const [alter] = useMutation(ALTER_RESPONSE, {
		variables: {
			orgId: org.id,
			meetingLink: null
		}
	});

	React.useEffect(() => {
		if (typeof data?.clubFairResponse?.isAttending === "boolean" && typeof isAttending !== "boolean") {
			setIsAttending(data?.clubFairResponse?.isAttending);
		}
	}, [data, isAttending]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className={layout.container}>
			<main className={layout.main}>
				<h2>Clubs & Pubs Fair Sign Up</h2>
				<p style={{ flexGrow: 1 }}>
					The Clubs & Pubs Fair will begin on September 29th and continue for multiple days (excluding the
					weekend). Each day will be devoted to a specific category of clubs (ie. Art, Academic Services,
					Sports, etc.). On their category’s day, club leaders will give a brief 1-2 minute presentation about
					their club through a Zoom webinar to all students. After each club has presented, the Zoom webinar
					will end, and students will be able to go to StuyActivities, find specific clubs they want to learn
					more about, and attend those clubs’ individual Zoom “breakout rooms.” Students will be able to go to
					as many club “rooms” as they like. The entire event will last from 4pm to 6pm each day.
				</p>

				<p>
					Please complete the survey below to sign up to present at the Clubs & Pubs Fair. This form will be
					closed on Tuesday, September 22nd at 11:59pm. By answering yes to the following question, you are
					confirming that leaders from your club will be available to participate on any day of the fair (we
					won’t know which day your club is presenting on until after we review submissions and split clubs
					into different categories).
				</p>
				<div>
					<FormControlLabel
						control={
							<CheckBox
								checked={isAttending ?? data?.clubFairResponse?.isAttending ?? false}
								disabled={true}
								onChange={() => {
									setIsAttending(!Boolean(isAttending ?? data?.clubFairResponse?.isAttending));
								}}
							/>
						}
						label={
							"Yes, at least one leader from my club will be able to present on any of the days of the clubs & pubs fair."
						}
					/>
					<p style={{ color: "grey" }}>It is past the deadline to change your response</p>
				</div>
				<br />
				<Button
					disabled={true}
					variant={"contained"}
					color={"primary"}
					onClick={() => {
						alter({
							variables: {
								orgId: org.id,
								meetingLink: null,
								isAttending
							}
						});
					}}
				>
					Save Response
				</Button>
			</main>
		</div>
	);
};

export default ClubFair;
