import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	link: {
		textDecoration: "none",
		color: ({ color }) => (color ? theme.palette[color]?.main : "unset"),
		"&:hover": {
			textDecoration: "underline"
		}
	}
}));

const TextLink = ({ to, children, color = "primary", target }) => {
	const classes = useStyles({ color });

	return (
		<Link to={to} target={target} className={classes.link}>
			{children}
		</Link>
	);
};

export default TextLink;
