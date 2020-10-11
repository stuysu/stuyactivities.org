import React from "react";
import UnstyledLink from "./UnstyledLink";
import { Link } from "@material-ui/core";

const TextLink = ({ to, children, color, target }) => {
	return (
		<UnstyledLink to={to} target={target}>
			<Link color={color}>{children}</Link>
		</UnstyledLink>
	);
};

export default TextLink;
