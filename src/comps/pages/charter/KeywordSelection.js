import React from "react";
import { CharterFormContext } from "../../../pages/charter";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const KeywordSelection = ({ sx }) => {
	const form = React.useContext(CharterFormContext);
	let value = form?.keywords || [];
	const [keyword, setKeyword] = React.useState("");
	const handleChange = event => {
		// block text inputs past 3 tags
		if (!((form?.keywords || [])?.filter(Boolean).length < 3)) return;

		if (event.nativeEvent.data?.includes(" ") || event.nativeEvent.data?.includes(",")) {
			const [oldKeywordEnd, newKeyword] = event.nativeEvent.data.split(/[, ]/);
			value.push(keyword + oldKeywordEnd);
			form.set({
				keywords: value
			});
			form.errors.keywords = false;
			setKeyword(newKeyword);
			return;
		}

		setKeyword(event.target.value.trim());
	};

	const handleKey = event => {
		if (keyword === "" && event.key === "Backspace") {
			form.set({
				keywords: value.slice(0, -1)
			});
		}
	};

	// conditionally set InputProps so the input can have a fully empty state
	let InputProps = value.length
		? {
				startAdornment: (
					<InputAdornment position="start">
						{value?.map(chip => {
							if (chip) {
								return (
									<Chip
										key={value.indexOf(chip)}
										label={chip}
										color="primary"
										sx={{
											marginRight: "0.5rem",
											marginBottom: "-0.25rem"
										}}
									/>
								);
							}
							return null;
						})}
					</InputAdornment>
				)
		  }
		: {};

	return (
		<div>
			<Box
				sx={{
					width: "100%",
					marginBottom: "1.5rem",
					marginTop: "1.5rem"
				}}
			>
				<TextField
					variant={"outlined"}
					label={"Keywords"}
					fullWidth
					required
					sx={sx}
					value={keyword}
					onChange={handleChange}
					onKeyDown={handleKey}
					helperText={
						form.errors?.keywords
							? form.errors.keywords // specifically display error message
							: "Choose between 1 to 3 keywords relating to your activity. They will not be publicly visible but they will help your activity show up in search results. This can be things like alternate names or acronyms. For example, the Student Union might add 'SU' as a keyword. Separate your entries with the spacebar, enter button, or with commas."
					}
					error={form.errors?.keywords}
					InputProps={InputProps}
				/>
			</Box>
		</div>
	);
};

export default KeywordSelection;
