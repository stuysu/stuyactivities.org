import { FormControl, TextField } from "@mui/material";
import React from "react";
import filterStyles from "./filterStyles";

export default function SearchBox({ setKeyword, keyword }) {
	const classes = filterStyles();

	return (
		<FormControl variant="standard" sx={classes.filterChild}>
			<TextField
				name="keyword"
				label="Search"
				variant="outlined"
				fullWidth={true}
				value={keyword}
				onChange={ev => setKeyword(ev.target.value)}
			/>
		</FormControl>
	);
}
