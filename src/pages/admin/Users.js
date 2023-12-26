import { Box, Button, Checkbox, FormControlLabel, FormGroup, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Alert from "../../comps/ui/Alert";
import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
	mutation ($email: String!, $isFaculty: Boolean!) {
		createUser(email: $email, isFaculty: $isFaculty) {
			email
		}
	}
`;

const Users = () => {
	const [email, setEmail] = useState("");
	const [isFaculty, setIsFaculty] = useState(false);
	let [successMessage, setSuccessMessage] = useState("");

	const [save] = useMutation(MUTATION, {
		onCompleted() {
			setEmail("");
			setIsFaculty(false);
		}
	});

	let [confirmOpen, setConfirmOpen] = useState(false);
	let [errorMessage, setErrorMessage] = useState("");
	return (
		<Box
			sx={{
				width: "1200px",
				maxWidth: "90%",
				margin: "auto"
			}}
		>
			<Typography variant="h3"> Add a user:</Typography>
			<br />
			<FormGroup>
				<TextField
					label="New User Email"
					type="email"
					id="emailInput"
					required
					value={email}
					onChange={e => setEmail(e.target.value.toLowerCase())}
				/>
				<FormControlLabel
					required
					control={<Checkbox value={isFaculty} onClick={() => setIsFaculty(!isFaculty)} />}
					label="Faculty member"
				/>
			</FormGroup>

			<br />
			<Button
				variant="contained"
				onClick={() => {
					if (!email.match(/[a-zA-Z0-9.]+@stuy(su)?.(edu|org)/)) {
						setErrorMessage("Invalid email. Please only enter stuy.edu or stuysu.org email addresses.");
					} else {
						console.log(email, isFaculty);
						setConfirmOpen(true);
					}
				}}
			>
				{" "}
				Register{" "}
			</Button>
			<Alert
				title={`Are you sure you want to register ${email}?`}
				description={`${email} will be registered as a ${isFaculty ? "faculty member" : "student"}.`}
				affirmative="Yes"
				negative="No"
				affirmativeCallback={async () => {
					try {
						await save({ variables: { email, isFaculty } });
						setSuccessMessage("User added!");
					} catch (e) {
						setErrorMessage("Failed to add user: " + e.message);
					}
				}}
				open={confirmOpen}
				setOpen={setConfirmOpen}
			/>
			<Alert
				title="Error"
				description={errorMessage}
				negative="Ok"
				open={errorMessage?.length > 0}
				setOpen={setErrorMessage}
			/>
			<Snackbar
				autoHideDuration={1000}
				open={successMessage?.length > 0}
				onClose={() => setSuccessMessage("")}
				message={successMessage}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			/>
		</Box>
	);
};

export default Users;
