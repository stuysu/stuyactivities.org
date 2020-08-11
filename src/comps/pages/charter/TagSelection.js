import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { CharterFormContext } from "./Charter";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import arrayToggle from "../../../utils/arrayToggle";
import Chip from "@material-ui/core/Chip";
import { Typography } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
	tagInput: {
		marginBottom: "1rem"
	},
	tagChip: {
		marginRight: theme.spacing(1)
	}
}));

const QUERY = gql`
	query {
		tags {
			id
			name
		}
	}
`;

const TagSelection = () => {
	const classes = useStyles();
	const { data } = useQuery(QUERY);
	const charterContext = React.useContext(CharterFormContext);
	const tags = data?.tags || [];
	const tagMap = {};

	tags.forEach(tag => {
		tagMap[tag.id] = tag;
	});

	React.useEffect(() => {
		if (!Array.isArray(charterContext.tags)) {
			charterContext.set({ tags: [] });
		}
	}, [charterContext]);

	const handleSelect = ev => {
		if (charterContext?.tags?.length < 3) {
			const newTag = Number(ev.target.value);
			const newTags = arrayToggle(newTag, charterContext.tags);
			charterContext.set({ tags: newTags });
		}
	};

	const removeTag = tagId => {
		const newTags = arrayToggle(tagId, charterContext.tags);
		charterContext.set({ tags: newTags });
	};

	return (
		<div>
			<FormControl className={classes.tagInput}>
				<InputLabel>Select Tags</InputLabel>
				<Select
					native
					value={""}
					onChange={handleSelect}
					disabled={charterContext?.tags?.length >= 3}
				>
					<option aria-label="None" value="" disabled />
					{tags
						.filter(tag => !charterContext.tags.includes(tag.id))
						.map(tag => {
							return (
								<option key={tag.id} value={tag.id}>
									{tag.name}
								</option>
							);
						})}
				</Select>
				<FormHelperText>
					{charterContext?.tags?.length >= 3
						? "3 Tags selected. To select another, you must remove one first"
						: "Select up to 3 tags that best represent your activity"}
				</FormHelperText>
			</FormControl>

			<br />
			{charterContext?.tags?.map(tag => {
				return (
					<Chip
						key={tag}
						className={classes.tagChip}
						label={tagMap[tag]?.name}
						onDelete={() => removeTag(tag)}
						color="primary"
					/>
				);
			})}
		</div>
	);
};

export default TagSelection;
