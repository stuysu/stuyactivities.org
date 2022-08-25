import React from "react";
import filterStyles from "./filterStyles";
import arrayToggle from "../../../../utils/arrayToggle";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CommitmentFilter({ commitmentLevels, setCommitmentLevels }) {
	const classes = filterStyles();

	const toggleCommitmentLevel = level => {
		const newLevels = arrayToggle(level, commitmentLevels);
		setCommitmentLevels(newLevels);
	};

	return (
		<Box sx={classes.tagContainer}>
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
					color={commitmentLevels.includes(tag) ? "secondary" : "default"}
					sx={classes.tag}
				/>
			))}
		</Box>
	);
}
