import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

const useStyles = makeStyles({
	flexCenter: {
		display: "flex",
		justifyContent: "center"
	}
});

const FlexCenter = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.flexCenter}>{children}</div>;
};

export default FlexCenter;
