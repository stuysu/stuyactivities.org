import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import UnstyledLink from "./UnstyledLink";

const useStyles = makeStyles({
	arrow: {
		maxWidth: "18px"
	}
});

const BackButton = ({ className, to, label, arrow = true, variant = "outlined", color }) => {
	const classes = useStyles();

	return (
		<UnstyledLink to={to}>
			<Button variant={variant} className={className} color={color}>
				{arrow && <ArrowBackIos className={classes.arrow} />} &nbsp; {label}
			</Button>
		</UnstyledLink>
	);
};

export default BackButton;
