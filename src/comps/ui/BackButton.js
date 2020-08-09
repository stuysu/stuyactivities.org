import React from "react";
import Button from "@material-ui/core/Button";
import UnstyledLink from "./UnstyledLink";

const BackButton = ({
	className,
	to,
	label,
	arrow = true,
	variant = "outlined",
	color
}) => {
	return (
		<UnstyledLink to={to}>
			<Button variant={variant} className={className} color={color}>
				{arrow && <span>&lt;-</span>} &nbsp; {label}
			</Button>
		</UnstyledLink>
	);
};

export default BackButton;
