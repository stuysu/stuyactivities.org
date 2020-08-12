import React from "react";
import { CharterFormContext } from "./Charter";
import TextField from "@material-ui/core/TextField";
import TagSelection from "./TagSelection";
import UrlSelection from "./UrlSelection";
import { makeStyles } from "@material-ui/core/styles";
import PictureUpload from "./PictureUpload";
import CommitmentLevel from "./CommitmentLevel";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
	select: {
		width: "100%",
		marginBottom: "1rem"
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
						helperText={
							form?.errors?.name && (
								<span>{form?.errors?.name}</span>
							)
						}
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
			<br />
			<PictureUpload />
		</>
	);
};

export default BasicInfoForm;
