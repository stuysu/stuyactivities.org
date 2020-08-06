import React from "react";
import Button from "@material-ui/core/Button";
import UnstyledLink from "./UnstyledLink";

const BackButton = ({ className, to, label }) => {
	return (
		<UnstyledLink to={to}>
			<Button variant={"outlined"} className={className}>
				&lt;- {label}
			</Button>
		</UnstyledLink>
	);
};

export default BackButton;
