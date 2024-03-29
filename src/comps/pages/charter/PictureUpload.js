import React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CharterFormContext } from "../../../pages/charter";
import Box from "@mui/material/Box";

const classes = {
	fileInput: {
		display: "none"
	},
	uploadedPic: {
		width: "300px",
		maxWidth: "80vw",
		maxHeight: "30vh",
		objectFit: "contain",
		marginTop: 1
	},
	clearButton: {
		textDecoration: "underline",
		cursor: "pointer"
	}
};

const PictureUpload = () => {
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
			<Typography>Upload a picture for your organization (Highly Recommended)</Typography>

			<Box
				component="input"
				ref={inputRef}
				type={"file"}
				accept="image/*"
				sx={classes.fileInput}
				onChange={handleChange}
			/>

			<Button variant={"outlined"} color={"secondary"} onClick={() => inputRef.current.click()}>
				+ Upload Picture
			</Button>
			{error && <Typography color={"error"}>{error?.message}</Typography>}

			<br />
			{form.picture && (
				<div>
					<Box
						component="img"
						sx={classes.uploadedPic}
						src={URL.createObjectURL(form.picture)}
						alt={"uploaded file"}
					/>
					<Typography
						color={"secondary"}
						onClick={() => form.set({ picture: null })}
						sx={classes.clearButton}
					>
						Clear Uploaded Picture
					</Typography>
				</div>
			)}
		</div>
	);
};

export default PictureUpload;
