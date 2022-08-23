import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	link: {
		textDecoration: "unset",
		color: "unset"
	}
});

export default function UnstyledLink(props) {
	const classes = useStyles();
	return <Link {...props} className={classes.link} />;
}
