import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CharterFormContext } from "../../../pages/charter";

const classes = {
	commitmentLevel: {
		width: "100%"
	}
};

const CommitmentLevel = ({ sx }) => {
	const form = React.useContext(CharterFormContext);

	return (
		<div>
			<FormControl variant={"outlined"} sx={classes.commitmentLevel} required>
				<InputLabel>Commitment Level</InputLabel>
				<Select
					fullWidth
					label={"Commitment Level"}
					variant={"outlined"}
					sx={sx}
					required
					value={form?.commitmentLevel || ""}
					onChange={ev => {
						form.set({ commitmentLevel: ev.target.value });
					}}
					error={Boolean(form?.errors?.commitmentLevel)}
				>
					<MenuItem value={"low"}>Low</MenuItem>
					<MenuItem value={"medium"}>Medium</MenuItem>
					<MenuItem value={"high"}>High</MenuItem>
				</Select>
				<FormHelperText>
					{form?.errors?.commitmentLevel && (
						<span>
							{form?.errors?.commitmentLevel}
							<br />
						</span>
					)}
					Low: &lt;= 3 meetings a month
					<br />
					Medium: 4-8 meetings a month
					<br />
					High: 9+ Meetings a month
				</FormHelperText>
			</FormControl>
		</div>
	);
};

export default CommitmentLevel;
