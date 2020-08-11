import React from "react";
import { CharterFormContext } from "./Charter";
import { gql } from "apollo-boost";
import TextField from "@material-ui/core/TextField";
import TagSelection from "./TagSelection";

const URL_QUERY = gql`
	query Organization($url: String) {
		organization(url: $url) {
			name
		}
	}
`;

const BasicInfoForm = () => {
	const form = React.useContext(CharterFormContext);

	return (
		<div>
			<TextField label={"Activity Name"} />
			<TagSelection />
		</div>
	);
};

export default BasicInfoForm;
