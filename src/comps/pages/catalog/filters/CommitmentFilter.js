import React from "react";
import useFilterStyles from "./useFilterStyles";
import arrayToggle from "../../../../utils/arrayToggle";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

export default function CommitmentFilter({ commitmentLevels, setCommitmentLevels }) {
	const classes = useFilterStyles();

	const toggleCommitmentLevel = level => {
		const newLevels = arrayToggle(level, commitmentLevels);
		setCommitmentLevels(newLevels);
	};

	return (
		<div className={classes.tagContainer}>
			<Typography variant={"h6"} style={{ padding: "3px" }}>
				Commitment Level
			</Typography>
			{["Low", "Medium", "High"].map(tag => (
				<Chip
					key={tag}
					label={tag}
					onClick={() => toggleCommitmentLevel(tag)}
					value={tag}
					clickable
					variant={"outlined"}
					size={"small"}
					color={commitmentLevels.includes(tag) ? "secondary" : ""}
					className={classes.tag}
				/>
			))}
		</div>
	);
}
