import { Typography, TextField, Button, Box } from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
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

const ManageSettings = () => {
	const { data, loading } = useQuery(QUERY);

	let [settings, setSettings] = useState(null);
	let [changed, setChanged] = useState(false);

	const [save] = useMutation(MUTATION, {
		onCompleted() {
			setChanged(false);
		}
	});

	if (data && settings === null) {
		setSettings(data.settings);
	}

	const saveSettings = async () => {
		const confirmation = window.confirm("Are you sure you want to update these settings?");
		if (!confirmation) {
			return;
		}

		if (isNaN(settings.membershipRequirement)) {
			alert("Error: Invalid Membership Requirements");
			return;
		}

		let variables = { membershipRequirement: settings.membershipRequirement };

		try {
			await save({ variables });
			alert("Settings updated!");
		} catch (e) {
			alert("Error updating settings: " + e.message);
		}
	};

	return (
		<Box sx={classes.mainDiv}>
			<Typography variant={"h3"}>StuyActivities Settings:</Typography>
			{loading ? (
				<Loading />
			) : (
				<TextField
					label="Member Requirement"
					variant="outlined"
					value={settings === null ? "" : settings.membershipRequirement}
					onChange={e => {
						if (!e.target.value.length) {
							setSettings({ ...settings, membershipRequirement: "" });
							setChanged(false);
							return;
						}

						let newValue = parseInt(e.target.value);

						if (isNaN(newValue)) return;

						setSettings({ ...settings, membershipRequirement: parseInt(e.target.value) });
						setChanged(true);
					}}
				/>
			)}

			<br />
			<Button
				variant={"contained"}
				color={"primary"}
				onClick={saveSettings}
				disabled={!changed}
				sx={{ marginTop: "50px" }}
			>
				Save
			</Button>
		</Box>
	);
};

export default ManageSettings;
