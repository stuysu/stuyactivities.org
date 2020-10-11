import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { CharterFormContext } from "../../../pages/charter";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
	tagInput: {
		marginBottom: "1rem"
	},
	tagChip: {
		marginRight: theme.spacing(1)
	},
	select: {
		width: "100%"
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

const TagSelection = ({ className }) => {
	const classes = useStyles();
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
					className={classes.select}
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
									return (
										<Chip
											key={tag.id}
											className={classes.tagChip}
											label={tag?.name}
											color="primary"
										/>
									);
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
