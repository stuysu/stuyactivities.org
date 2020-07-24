import React from "react";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import TextField from "@material-ui/core/TextField";
import { CharterFormContext } from "../Charter";
import { useQuery } from "@apollo/client";
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
