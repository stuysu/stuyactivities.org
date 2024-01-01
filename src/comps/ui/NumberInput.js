import { TextField } from "@mui/material";
import React from "react";

const NumberInput = ({ label, value, setValue, fullWidth }) => {
	return (
		<TextField
			inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
			label={label}
			variant="outlined"
			value={value}
			onChange={e => {
				if (!e.target.value.length) {
					console.log("BRUH", e);
					setValue("");
					return;
				}

				let newValue = parseInt(e.target.value);

				if (isNaN(newValue) || newValue < 0) return; // impossible
				console.log("continue", e);

				setValue(newValue);
			}}
			fullWidth={fullWidth}
		/>
	);
};

export default NumberInput;
