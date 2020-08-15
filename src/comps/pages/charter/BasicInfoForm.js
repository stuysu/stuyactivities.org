import React from "react";
import { CharterFormContext } from "./Charter";
import TextField from "@material-ui/core/TextField";
import TagSelection from "./TagSelection";
import UrlSelection from "./UrlSelection";
import { makeStyles } from "@material-ui/core/styles";
import PictureUpload from "./PictureUpload";
import CommitmentLevel from "./CommitmentLevel";
import { Chip, Grid } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import arrayToggle from "../../../utils/arrayToggle";

const useStyles = makeStyles({
	select: {
		width: "100%",
		marginBottom: "1rem"
	},
	keywords: {
		marginBottom: "2.5rem",
		marginTop: "1.5rem"
	},
	chip: {
		marginRight: "0.5rem",
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

			<ChipInput
				fullWidth={true}
				value={form?.keywords || []}
				label={"Keywords"}
				required
				helperText={
					"Choose between 1 to 3 keywords relating to your activity. They will not be publicly visible but they will help your activity show up in search results. This can be things like alternate names or acronyms. For example, the Student Union might add 'SU' as a keyword. Separate your entries with the spacebar, enter button, or with commas."
				}
				onAdd={chip => {
					if (
						chip &&
						(form?.keywords || [])?.filter(Boolean).length < 3
					) {
						form.set({
							keywords: arrayToggle(chip, form.keywords || [])
						});
					}
				}}
				onDelete={chip =>
					form.set({ keywords: arrayToggle(chip, form.keywords) })
				}
				chipRenderer={chip => {
					if (chip.value) {
						return (
							<Chip
								key={chip.value}
								label={chip.value}
								color="primary"
								className={classes.chip}
							/>
						);
					}
					return null;
				}}
				error={form.errors?.keywords}
				// allowDuplicates={false}
				variant={"outlined"}
				newChipKeys={["Enter", "Tab", " ", ","]}
				className={classes.keywords}
			/>

			<PictureUpload />
		</>
	);
};

export default BasicInfoForm;
