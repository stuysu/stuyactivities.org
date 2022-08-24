import { FormControl, TextField } from "@mui/material";
import React from "react";
import useFilterStyles from "./useFilterStyles";

export default function SearchBox({ setKeyword, keyword }) {
	const classes = useFilterStyles();

	return (
		<FormControl variant="standard" className={classes.filterChild}>
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
