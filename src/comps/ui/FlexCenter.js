import React from "react";
import Box from "@mui/material/Box";

const classes = {
	flexCenter: {
		display: "flex",
		justifyContent: "center"
	}
};

const FlexCenter = ({ children }) => {
	return <Box sx={classes.flexCenter}>{children}</Box>;
};

export default FlexCenter;
