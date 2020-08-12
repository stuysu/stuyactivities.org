import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { CharterFormContext } from "./Charter";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	commitmentLevel: {
		width: "100%"
	}
});

const CommitmentLevel = ({ className }) => {
	const form = React.useContext(CharterFormContext);
	const classes = useStyles();

	return (
		<div>
			<FormControl
				variant={"outlined"}
				className={classes.commitmentLevel}
			>
				<InputLabel>Commitment Level</InputLabel>
				<Select
					fullWidth
					label={"Commitment Level"}
					variant={"outlined"}
					className={className}
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
