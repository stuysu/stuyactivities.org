import { Typography, TextField, Button, Box, Snackbar } from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Alert from "../../comps/ui/Alert";
import Loading from "../../comps/ui/Loading";

const QUERY = gql`
	query {
		settings {
			membershipRequirement
		}
	}
`;

const MUTATION = gql`
	mutation ($membershipRequirement: Int!) {
		alterSettings(membershipRequirement: $membershipRequirement) {
			membershipRequirement
		}
	}
`;

const classes = {
	mainDiv: {
		width: "1200px",
		maxWidth: "90%",
		margin: "auto"
	}
};

const Settings = () => {
	const { data, loading } = useQuery(QUERY);

	let [settings, setSettings] = useState(null);
	let [changed, setChanged] = useState(false);
	let [confirmOpen, setConfirmOpen] = useState(false);
	let [errorMessage, setErrorMessage] = useState("");
	let [successMessage, setSuccessMessage] = useState("");

	const [save] = useMutation(MUTATION, {
		onCompleted() {
			setChanged(false);
		}
	});

	if (data && settings === null) {
		setSettings(data.settings);
	}

	const saveSettings = async () => {
		if (isNaN(settings.membershipRequirement) || settings.membershipRequirement < 0) {
			setErrorMessage("Membership Requirement must be a number greater than zero!");
			return;
		}

		let variables = { membershipRequirement: settings.membershipRequirement };

		try {
			await save({ variables });
			setSuccessMessage("Settings updated!");
		} catch (e) {
			setErrorMessage("Failed to update settings: " + e.message);
		}
	};

	return (
		<Box sx={classes.mainDiv}>
			<Typography variant={"h3"}>StuyActivities Settings:</Typography>
			{loading ? (
				<Loading />
			) : (
				<TextField
					inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
					label="Minimum Club Membership"
					variant="outlined"
					value={settings === null ? "" : settings.membershipRequirement}
					onChange={e => {
						if (!e.target.value.length) {
							setSettings({ ...settings, membershipRequirement: "" });
							setChanged(false);
							return;
						}

						let newValue = parseInt(e.target.value);

						if (isNaN(newValue) || newValue < 0) return; // impossible

						setSettings({ ...settings, membershipRequirement: newValue });
						setChanged(true);
					}}
				/>
			)}

			<br />
			<Button
				variant={"contained"}
				color={"primary"}
				onClick={() => setConfirmOpen(true)}
				disabled={!changed}
				sx={{ marginTop: "50px" }}
			>
				Save
			</Button>
			<Alert
				title="Are you sure you want to update these settings?"
				description={`This will automatically lock or unlock clubs${
					settings?.membershipRequirement <= 1 ? "" : ", and send ALL affected club leaders an email"
				}.`}
				affirmative="OK"
				negative="Cancel"
				affirmativeCallback={saveSettings}
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

export default Settings;
