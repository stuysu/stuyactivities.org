import React from "react";
import { CharterFormContext } from "../../../pages/charter";
import TextField from "@mui/material/TextField";
import KeywordSelection from "./KeywordSelection";
import TagSelection from "./TagSelection";
import UrlSelection from "./UrlSelection";
import makeStyles from "@mui/styles/makeStyles";
import PictureUpload from "./PictureUpload";
import CommitmentLevel from "./CommitmentLevel";
import { Grid } from "@mui/material";

const useStyles = makeStyles({
	select: {
		width: "100%",
		marginBottom: "1rem"
	},
	socials: {
		marginBottom: "0.5rem"
	}
});

const BasicInfoForm = () => {
	const classes = useStyles();
	const form = React.useContext(CharterFormContext);

	return (
		<>
			<Grid container spacing={2}>
				<Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
					<TextField
						variant={"outlined"}
						className={classes.bottomMargin}
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
					<UrlSelection className={classes.bottomMargin} />
				</Grid>
				<Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
					<CommitmentLevel className={classes.select} />
				</Grid>
				<Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
					<TagSelection className={classes.select} />
				</Grid>
			</Grid>

			<KeywordSelection className={classes.keywords} />

			<TextField
				className={classes.socials}
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
