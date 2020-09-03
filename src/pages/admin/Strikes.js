import React from "react";
import { gql } from "@apollo/client";
import {makeStyles} from "@material-ui/core/styles";
import {Helmet} from "react-helmet";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles( () => ({

}));

const QUERY = gql`
	query Organization($url: String) {
		organization(url: $url) {
			id
			name
			strikes
		}
	}
`;

const Strikes = () => {
	const classes = useStyles();

	return(
		<Autocomplete
			id="combo-box-demo"
			options={top100Films}
			getOptionLabel={(option) => option.title}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
		/>
	);
};

export default Strikes;