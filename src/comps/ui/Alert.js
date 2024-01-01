import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

const dummy = () => 0; // dummy function as default value
const Alert = ({
	title,
	description,
	affirmative = "",
	negative = "",
	affirmativeCallback = dummy,
	open = false,
	setOpen = dummy
}) => {
	/**
	 * A basic alert modal.
	 * @constructor
	 * @param {string} title - The title of the modal.
	 * @param {string} description - The description of the modal.
	 * @param {string} affirmative - The string for the affirmative option (e.g. "OK"). When clicked, calls affirmativeCallback. If empty, not displayed.
	 * @param {string} negative - The string for the negative option (e.g. "Cancel"). If empty, not displayed.
	 * @param {function} affirmativeCallback - The function to call when affirmative action button is clicked. Not needed if affirmative is empty.
	 * @param {boolean} open - Whether the modal is active and displayed, stored in React state.
	 * @param {boolean} setOpen - The React state edit function, used to close the modal.
	 */
	return (
		<Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{negative.length > 0 ? <Button onClick={() => setOpen(false)}>{negative}</Button> : <></>}
				{affirmative.length > 0 ? (
					<Button
						onClick={() => {
							setOpen(false);
							affirmativeCallback();
						}}
					>
						{affirmative}
					</Button>
				) : (
					<></>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default Alert;
