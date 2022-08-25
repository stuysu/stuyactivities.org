import React from "react";
import arrayToggle from "../../../../utils/arrayToggle";
import filterStyles from "./filterStyles";
import { useQuery } from "@apollo/client";
import { client } from "../../../context/ApolloProvider";
import { gql } from "@apollo/client";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const QUERY = gql`
	query {
		tags {
			id
			name
		}
	}
`;

export default function TagsFilter({ tags, setTags }) {
	const { data } = useQuery(QUERY, { client });

	const allTags = data?.tags || [];

	const toggleTag = tag => {
		const newTags = arrayToggle(tag, tags);
		setTags(newTags);
	};

	const classes = filterStyles();

	return (
		<Box sx={classes.tagContainer}>
			<Typography variant={"h6"} style={{ padding: "3px" }}>
				Tags
			</Typography>
			{allTags.map(tag => (
				<Chip
					key={tag.id}
					label={tag.name}
					onClick={() => toggleTag(tag.id)}
					value={tag.id}
					clickable
					variant={"outlined"}
					size={"small"}
					color={tags.includes(tag.id) ? "secondary" : "default"}
					sx={classes.tag}
				/>
			))}
		</Box>
	);
}
