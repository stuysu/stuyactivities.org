import React from "react";
import { Typography, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
	query FindOrganization($keyword: String!) {
		organizations(keyword: $keyword, limit: 15) {
			id
			name
		}
	}
`;

const OrganizationPicker = ({ setOrgId }) => {
	const [keyword, setKeyword] = React.useState("");
	console.log(keyword);
	const { data, loading } = useQuery(QUERY, {
		variables: { keyword }
	});
	const options = data === undefined ? [] : data.organizations;
	return (
		<div>
			<Typography variant={"h5"}>Currently Selected Club: </Typography>
			<Autocomplete
				inputValue={keyword}
				onInputChange={(ev, newValue) => {
					if (newValue) setKeyword(newValue);
				}}
				options={options}
				getOptionLabel={_ => ""}
				renderOption={(props, option) => (
					<li {...props}>
						<span>{option.name}</span>
					</li>
				)}
				onChange={(ev, newvalue) => {
					setKeyword(newvalue.name);
					setOrgId(newvalue.id);
				}}
				loading={loading}
				filterOptions={f => f}
				renderInput={params => (
					<TextField {...params} required={true} label="Find Organization" variant="outlined" />
				)}
			/>
		</div>
	);
};

export default OrganizationPicker;
