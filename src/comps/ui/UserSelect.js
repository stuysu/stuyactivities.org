import React from "react";
import { ListItemAvatar, TextField, Avatar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
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

const useStyles = makeStyles({
	smallerText: {
		scale: 0.8
	}
});

const UserSelect = ({ onChange, filter }) => {
	const classes = useStyles();
	const [keyword, setKeyword] = React.useState("");
	const { data, loading } = useQuery(QUERY, { variables: { keyword } });
	const options = data?.users?.filter(filter || (() => true)) || [];

	return (
		<Autocomplete
			options={options}
			value={null}
			getOptionLabel={_ => ""}
			renderOption={option => (
				<>
					<ListItemAvatar>
						<Avatar src={option?.picture} />
					</ListItemAvatar>
					<span>
						<span>{option?.name}</span>
						<br />
						<span className={classes.smallerText}>
							{option?.email}
							<br />
							{option?.isFaculty ? "Faculty" : `Grade ${option?.grade}`}
						</span>
					</span>
				</>
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
