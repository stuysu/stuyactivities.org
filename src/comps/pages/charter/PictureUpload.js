import React from "react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CharterFormContext } from "../../../pages/Charter";

const useStyles = makeStyles(theme => ({
	fileInput: {
		display: "none"
	},
	uploadedPic: {
		width: "300px",
		maxWidth: "80vw",
		maxHeight: "30vh",
		objectFit: "contain",
		marginTop: theme.spacing(1)
	},
	clearButton: {
		textDecoration: "underline",
		cursor: "pointer"
	}
}));

const PictureUpload = () => {
	const classes = useStyles();
	const form = React.useContext(CharterFormContext);
	const inputRef = React.createRef();
	const [error, setError] = React.useState(null);

	const handleChange = ev => {
		const file = ev.target.files[0];

		// 5 Megabytes
		const maxSize = 1000 * 1000 * 5;

		if (!file.type.startsWith("image/")) {
			setError(new Error("You can only upload image files."));
		} else if (file.size > maxSize) {
			setError(new Error("The uploaded picture must be less than 5MB."));
		} else {
			setError(null);
			form.set({ picture: file });
		}
	};

	return (
		<div>
			<Typography>
				Upload a picture for your organization (optional)
			</Typography>

			<input
				ref={inputRef}
				type={"file"}
				accept="image/*"
				className={classes.fileInput}
				onChange={handleChange}
			/>

			<Button
				variant={"outlined"}
				color={"secondary"}
				onClick={() => inputRef.current.click()}
			>
				+ Upload Picture
			</Button>
			{error && <Typography color={"error"}>{error?.message}</Typography>}

			<br />
			{form.picture && (
				<div>
					<img
						className={classes.uploadedPic}
						src={URL.createObjectURL(form.picture)}
						alt={"uploaded file"}
					/>
					<Typography
						color={"secondary"}
						onClick={() => form.set({ picture: null })}
						className={classes.clearButton}
					>
						Clear Uploaded Picture
					</Typography>
				</div>
			)}
		</div>
	);
};

export default PictureUpload;
