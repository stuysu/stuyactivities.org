import React from "react";
import Button from "@mui/material/Button";
import UnstyledLink from "./UnstyledLink";
import { ArrowBackIos } from "@mui/icons-material";

const classes = {
	arrow: {
		maxWidth: "18px"
	},
	// manually override the edges to maintain parity to the original button border color
	buttonBorder: {
		borderColor: "transparency.borderDarker",
		"&:hover": { borderColor: "transparency.borderDarker" }
	}
};

const BackButton = ({ sx = [], to, label, arrow = true, variant = "outlined" }) => {
	return (
		<UnstyledLink to={to}>
			<Button variant={variant} sx={[classes.buttonBorder, ...(Array.isArray(sx) ? sx : [sx])]} color="button">
				{arrow && <ArrowBackIos sx={classes.arrow} />} &nbsp; {label}
			</Button>
		</UnstyledLink>
	);
};

export default BackButton;
