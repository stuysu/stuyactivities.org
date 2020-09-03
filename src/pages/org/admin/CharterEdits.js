import React from "react";
import { gql, useQuery } from "@apollo/client";
import { OrgContext } from "../index";

const QUERY = gql`
	query($id: Int!) {
		organization(id: $id) {
			charter {
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
				alteredFields
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
	}
`;

const CharterEdits = () => {
	const org = React.useContext(OrgContext);
	const { data } = useQuery(QUERY, { variables: { id: org.id } });

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default CharterEdits;
