import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const TextLink = ({ to, children, color = "primary", target }) => {
	return (
		<Box
			component={Link}
			to={to}
			target={target}
			sx={{
				textDecoration: "none",
				color: color + ".main",
				"&:hover": {
					textDecoration: "underline"
				}
			}}
		>
			{children}
		</Box>
	);
};

export default TextLink;
