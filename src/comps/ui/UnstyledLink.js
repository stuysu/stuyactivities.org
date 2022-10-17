import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export default function UnstyledLink(props) {
	return (
		<Box
			component={Link}
			{...props}
			sx={{
				textDecoration: "unset",
				color: "unset"
			}}
		/>
	);
}
