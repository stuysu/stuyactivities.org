import {
	Accordion,
	AccordionSummary,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import arrayToggle from "../../../../utils/arrayToggle";
import useFilterStyles from "./useFilterStyles";
import { useQuery } from "@apollo/client";
import { client } from "../../../context/ApolloProvider";
import { gql } from "apollo-boost";

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

	const classes = useFilterStyles();

	return (
		<FormControl component="fieldset" className={classes.filterChild}>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<FormLabel component="legend">Tags</FormLabel>
				</AccordionSummary>
				<FormGroup>
					{allTags.map(tag => (
						<FormControlLabel
							key={tag.id}
							control={
								<Checkbox
									checked={tags.includes(tag.name)}
									onChange={() => toggleTag(tag.name)}
									value={tag.name}
								/>
							}
							label={tag.name}
							className={classes.accordionChild}
						/>
					))}
				</FormGroup>
			</Accordion>
		</FormControl>
	);
}
