import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CharterFormContext } from "../../../pages/charter";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";

const classes = {
	tagInput: {
		marginBottom: "1rem"
	},
	tagChip: {
		marginRight: 1
	},
	select: {
		width: "100%"
	}
};

const QUERY = gql`
	query {
		tags {
			id
			name
		}
	}
`;

const TagSelection = ({ className }) => {
	const { data } = useQuery(QUERY);
	const charterContext = React.useContext(CharterFormContext);
	const tags = data?.tags || [];
	const tagMap = {};
	const [open, setOpen] = React.useState(false);

	tags.forEach(tag => {
		tagMap[tag.id] = tag;
	});

	React.useEffect(() => {
		if (!Array.isArray(charterContext.tags)) {
			charterContext.set({ tags: [] });
		}
	}, [charterContext]);

	const handleSelect = ev => {
		if (ev.target.value.length <= 3) {
			charterContext.set({ tags: ev.target.value });
			charterContext.setError("tags", false);
		}
		setOpen(false);
	};

	return (
		<div>
			<FormControl variant={"outlined"} required className={className}>
				<InputLabel>Select Tags</InputLabel>
				<Select
					variant={"outlined"}
					sx={classes.select}
					fullWidth
					multiple
					label={"Select Tags"}
					value={charterContext?.tags || []}
					onChange={handleSelect}
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					error={Boolean(charterContext?.errors?.tags)}
					renderValue={selected => {
						return (
							<div>
								{selected.map(tag => {
									return <Chip key={tag.id} sx={classes.tagChip} label={tag?.name} color="primary" />;
								})}
							</div>
						);
					}}
				>
					{tags?.map(tag => (
						<MenuItem key={tag.id} value={tag}>
							{charterContext?.tags?.some(t => t.id === tag.id) ? <b>{tag.name}</b> : tag.name}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>
					{charterContext?.errors?.tags && (
						<span>
							{charterContext?.errors?.tags}
							<br />
						</span>
					)}
					{charterContext?.tags?.length >= 3
						? "3 Tags selected. To select another, you must remove one first"
						: "Select up to 3 tags that best represent your activity"}
				</FormHelperText>
			</FormControl>
		</div>
	);
};

export default TagSelection;
