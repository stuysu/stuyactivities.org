import React from "react";
import UnstyledLink from "./UnstyledLink";
import { Button } from "@mui/material";

const ButtonLink = ({ to, children, color, variant, className }) => {
	return (
		<UnstyledLink to={to}>
			<Button color={color} variant={variant} className={className}>
				{children}
			</Button>
		</UnstyledLink>
	);
};

export default ButtonLink;
