import React from "react";
import { ListItemAvatar, TextField, Avatar, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
const QUERY = gql`
	query Users($keyword: String!) {
		users(keyword: $keyword, limit: 15) {
			id
			name
			email
			grade
			picture
			isFaculty
		}
	}
`;

const classes = {
	smallerText: {
		scale: 0.8
	}
};

const UserSelect = ({ onChange, filter }) => {
	const [keyword, setKeyword] = React.useState("");
	const { data, loading } = useQuery(QUERY, { variables: { keyword } });
	const options = data?.users?.filter(filter || (() => true)) || [];

	return (
		<Autocomplete
			options={options}
			value={null}
			getOptionLabel={_ => ""}
			renderOption={(props, option) => (
				<li {...props}>
					<ListItemAvatar>
						<Avatar src={option?.picture} />
					</ListItemAvatar>
					<span>
						<span>{option?.name}</span>
						<br />
						<Box component="span" sx={classes.smallerText}>
							{option?.email}
							<br />
							{option?.isFaculty ? "Faculty" : `Grade ${option?.grade}`}
						</Box>
					</span>
				</li>
			)}
			onChange={onChange}
			loading={loading}
			filterOptions={f => f}
			renderInput={params => (
				<TextField
					{...params}
					required={true}
					label="Find User"
					variant="outlined"
					value={keyword}
					onChange={ev => setKeyword(ev.target.value)}
				/>
			)}
		/>
	);
};
export default UserSelect;
