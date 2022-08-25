import React from "react";
import UnstyledLink from "./UnstyledLink";
import { Button } from "@mui/material";

const ButtonLink = ({ to, children, color, variant, sx }) => {
	return (
		<UnstyledLink to={to}>
			<Button color={color} variant={variant} sx={sx}>
				{children}
			</Button>
		</UnstyledLink>
	);
};

export default ButtonLink;
