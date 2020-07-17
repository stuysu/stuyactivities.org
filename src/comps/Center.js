import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
	flexCenter: {
		display: "flex",
		justifyContent: "center"
	}
});

const Center = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.flexCenter}>{children}</div>;
};

export default Center;
