import React from "react";
import TextField from "@mui/material/TextField";
import { CharterFormContext } from "../../../pages/charter";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	textField: {
		marginBottom: theme.spacing(2)
	}
}));

const SmartCharterQuestion = ({
	name,
	maxWords,
	minWords,
	minChars,
	maxChars,
	className,
	multiline,
	fullWidth,
	required,
	onBlur,
	rows,
	label,
	helperText
}) => {
	const classes = useStyles();
	const form = React.useContext(CharterFormContext);

	const onFocusOut = () => {
		let isValid = true;
		if (minChars) {
			if (form[name]?.length < minChars) {
				isValid = false;
			}
		}

		if (minWords) {
			if (form[name]?.split(" ").filter(Boolean).length < minWords) {
				isValid = false;
			}
		}

		form.setError(name, isValid ? false : "Requirements not met");

		if (onBlur) {
			onBlur();
		}
	};

	const onChange = ev => {
		let value = ev.target.value;
		if (maxChars) {
			value = value.substr(0, maxChars);
		}

		if (maxWords) {
			let words = value.split(" ");
			words = words.filter((val, index) => Boolean(val) || index === words.length - 1).slice(0, maxWords);
			value = words.join(" ");
		}

		form.setError(name, false);
		form.set({ [name]: value });
	};

	let wordsReq = "";

	if (minWords && maxWords) {
		wordsReq = `Must be between ${minWords} and ${maxWords} words.`;
	} else if (minWords) {
		wordsReq = `Must be at least ${minWords} words.`;
	} else if (maxWords) {
		wordsReq = `Can be at most ${maxWords} words.`;
	}

	let charsReq = "";

	if (minChars && maxChars) {
		charsReq = `Must be between ${minChars} and ${maxChars} characters.`;
	} else if (minChars) {
		charsReq = `Must be at least ${minChars} characters.`;
	} else if (maxChars) {
		charsReq = `Can be at most ${maxChars} characters`;
	}

	return (
		<div className={className}>
			<TextField
				onBlur={onFocusOut}
				label={label}
				required={required ?? true}
				error={Boolean(form.errors[name])}
				fullWidth={fullWidth ?? true}
				helperText={
					<>
						{Boolean(helperText) && (
							<>
								{helperText}
								<br />
							</>
						)}
						{Boolean(wordsReq) && (
							<>
								{wordsReq} Currently {form[name]?.split(" ").filter(Boolean).length || 0} words
								<br />
							</>
						)}
						{Boolean(charsReq) && (
							<>
								{charsReq} Currently {form[name]?.length || 0} characters.
							</>
						)}
					</>
				}
				variant={"outlined"}
				value={form[name] || ""}
				onChange={onChange}
				multiline={multiline}
				rows={rows}
				className={classes.textField}
			/>
		</div>
	);
};

export default SmartCharterQuestion;
