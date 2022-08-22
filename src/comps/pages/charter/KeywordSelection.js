import React from "react";
import { CharterFormContext } from "../../../pages/charter";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const KeywordSelection = ({ className }) => {
	const form = React.useContext(CharterFormContext);
	let value = form?.keywords || [];
	const [keyword, setKeyword] = React.useState("");
	const handleChange = event => {
		// block text inputs past 3 tags
		if ((form?.keywords || [])?.filter(Boolean).length < 3) {
			setKeyword(event.target.value.trim());
		}
	};

	const handleKey = event => {
		if (keyword === "" && event.key === "Backspace") {
			form.set({
				keywords: value.slice(0, -1)
			});
		} else {
			if (["Enter", "Tab", " ", ","].includes(event.key)) {
				if (keyword && (form?.keywords || [])?.filter(Boolean).length < 3) {
					if ((form?.keywords || [])?.indexOf(keyword) === -1) {
						value.push(keyword);
						form.set({
							keywords: value
						});
						// manually reset error state since error state doesn't rescan until "Next" button is clicked
						form.errors.keywords = false;
					}
					setKeyword("");
					event.preventDefault();
				}

				// unconditionally block all separator inputs except for tab (jumping)
				if (event.key !== "Tab") {
					event.preventDefault();
				}
			}
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
									<Box
										sx={{
											marginRight: "0.5rem",
											marginBottom: "-0.25rem"
										}}
									>
										<Chip key={value.indexOf(chip)} label={chip} color="primary" />
									</Box>
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
					className={className}
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
