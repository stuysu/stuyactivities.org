import React from "react";
import { CharterFormContext } from "../Charter";
import { gql } from "apollo-boost";

const URL_QUERY = gql`
	query Organization($url: String) {
		organization(url: $url) {
			name
		}
	}
`;

const BasicInfoForm = () => {
	const form = React.useContext(CharterFormContext);

	return <div></div>;
};

export default BasicInfoForm;
