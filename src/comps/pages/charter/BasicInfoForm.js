import React from "react";
import { CharterFormContext } from "../../../pages/charter";
import TextField from "@mui/material/TextField";
import KeywordSelection from "./KeywordSelection";
import TagSelection from "./TagSelection";
import UrlSelection from "./UrlSelection";
import PictureUpload from "./PictureUpload";
import CommitmentLevel from "./CommitmentLevel";
import { Grid } from "@mui/material";

const classes = {
	select: {
		width: "100%",
		marginBottom: "1rem"
	},
	socials: {
		marginBottom: "0.5rem"
	}
};

const BasicInfoForm = () => {
	const form = React.useContext(CharterFormContext);

	// TODO: determine proper definition for bottomMargin
	return (
		<>
			<Grid container spacing={2}>
				<Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
					<TextField
						variant={"outlined"}
						sx={classes.bottomMargin}
						label={"Activity Name"}
						value={form?.name || ""}
						onChange={ev => {
							form.set({ name: ev.target.value });
							form.setError("name", false);
						}}
						error={Boolean(form?.errors?.name)}
						required
						helperText={form?.errors?.name && <span>{form?.errors?.name}</span>}
						fullWidth
					/>
				</Grid>

				<Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
					<UrlSelection sx={classes.bottomMargin} />
				</Grid>
				<Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
					<CommitmentLevel sx={classes.select} />
				</Grid>
				<Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
					<TagSelection sx={classes.select} />
				</Grid>
			</Grid>

			<KeywordSelection sx={classes.keywords} />

			<TextField
				sx={classes.socials}
				variant={"outlined"}
				label={"Socials (optional)"}
				value={form?.socials || ""}
				onChange={ev => {
					form.set({ socials: ev.target.value });
				}}
				helperText={"This is a good place to put a link to a website or a social media handle."}
				fullWidth
			/>

			<PictureUpload />
		</>
	);
};

export default BasicInfoForm;
