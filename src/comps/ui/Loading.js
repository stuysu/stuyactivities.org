import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(props => ({
	loaderParent: {
		width: "100%",
		height: props => (props.fullscreen ? "100vh" : "100%"),
		display: "flex",
		position: props => (props.fullscreen ? "fixed" : "relative"),
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center"
	}
}));

const Loading = ({fullscreen}) => {
	const classes = useStyles({fullscreen});

	return (
		<div className={classes.loaderParent}>
			<CircularProgress className={classes.loader}/>
		</div>
	);
};

export default Loading;
