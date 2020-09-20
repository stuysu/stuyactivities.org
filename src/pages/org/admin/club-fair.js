import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { OrgContext } from "../index";
import Loading from "../../../comps/ui/Loading";
import layout from "./../../../styles/Layout.module.css";
import Switch from "@material-ui/core/Switch";

const RESPONSE = gql`
	query($orgId: Int!) {
		clubFairResponse(orgId: $orgId) {
			id
			isAttending
			meetingDay
			meetingLink
		}
	}
`;

const ALTER_RESPONSE = gql`
	mutation($orgId: Int!, $isAttending: Boolean!, $meetingLink: String) {
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

	const [alter, { loading: loadingAltered }] = useMutation(ALTER_RESPONSE, {
		variables: {
			orgId: org.id,
			meetingLink: null
		}
	});

	if (loading) {
		return <Loading />;
	}

	return (
		<div className={layout.container}>
			<main className={layout.main}>
				<h2>Your club has not submitted the availability form.</h2>
				<div style={{ display: "flex" }}>
					<p style={{ flexGrow: 1 }}>Can your club be at the club fair?</p>
					<Switch
						checked={data?.clubFairResponse?.isAttending}
						onChange={() => {
							alter({
								variables: {
									orgId: org.id,
									isAttending: !data?.clubFairResponse?.isAttending,
									meetingLink: null
								}
							});
						}}
						disabled={loadingAltered}
						inputProps={{ "aria-label": "secondary checkbox" }}
					/>
				</div>
			</main>
		</div>
	);
};

export default ClubFair;
