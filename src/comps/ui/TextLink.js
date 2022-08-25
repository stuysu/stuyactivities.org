import React from "react";
import { Link } from "react-router-dom";

const TextLink = ({ to, children, color = "primary", target }) => {
	return (
		<Link
			to={to}
			target={target}
			sx={{
				textDecoration: "none",
				// TODO: verify that `theme.palette[color]?.main` resolves to this
				color: color,
				"&:hover": {
					textDecoration: "underline"
				}
			}}
		>
			{children}
		</Link>
	);
};

export default TextLink;
