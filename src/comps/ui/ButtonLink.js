import { Button } from "@material-ui/core";
import React from "react";
import UnstyledLink from "./UnstyledLink";

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
