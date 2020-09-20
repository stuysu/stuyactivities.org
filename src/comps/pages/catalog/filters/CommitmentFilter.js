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
import useFilterStyles from "./useFilterStyles";
import arrayToggle from "../../../../utils/arrayToggle";

export default function CommitmentFilter({ commitmentLevels, setCommitmentLevels }) {
	const classes = useFilterStyles();

	const toggleCommitmentLevel = level => {
		const newLevels = arrayToggle(level, commitmentLevels);
		setCommitmentLevels(newLevels);
	};

	return (
		<FormControl component="fieldset" className={classes.filterChild}>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<FormLabel component="legend">Commitment Level</FormLabel>
				</AccordionSummary>
				<FormGroup>
					{["Low", "Medium", "High"].map(level => (
						<FormControlLabel
							key={level}
							control={
								<Checkbox
									checked={commitmentLevels.includes(level)}
									onChange={() => toggleCommitmentLevel(level)}
									value={level}
								/>
							}
							label={level}
							className={classes.accordionChild}
						/>
					))}
				</FormGroup>
			</Accordion>
		</FormControl>
	);
}
