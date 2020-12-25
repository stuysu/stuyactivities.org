import React, { useEffect, useState } from "react";
import EventEmitter from "events";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DynamicMeetingPreview from "./DynamicMeetingPreview";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import FlexCenter from "../ui/FlexCenter";

const previewEmitter = new EventEmitter();

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const triggerMeetingDialog = meetingId => previewEmitter.emit("open", meetingId);

const useStyles = makeStyles(theme => ({
	appBar: {
		position: "relative",
		boxShadow: "none"
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	pageContainer: {
		textAlign: "center",
		padding: theme.spacing(3),
		width: "700px",
		maxWidth: "90vw"
	}
}));

const MeetingPreviewDialog = () => {
	const [open, setOpen] = useState(false);
	const [meetingId, setMeetingId] = useState(null);
	const isMobile = useMediaQuery("(max-width: 800px)");
	const classes = useStyles();

	const closeDialog = () => {
		setOpen(false);
		setMeetingId(null);
	};

	useEffect(() => {
		const callback = meetingId => {
			setOpen(true);
			setMeetingId(meetingId);
		};

		previewEmitter.on("open", callback);

		return () => previewEmitter.removeListener("open", callback);
	});

	return (
		<Dialog fullScreen={isMobile} open={open} onClose={closeDialog} TransitionComponent={Transition}>
			<AppBar color={"secondary"} className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Meeting Preview:{" "}
					</Typography>
					<IconButton edge="end" color="inherit" onClick={closeDialog} aria-label="close">
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<FlexCenter>
				<div className={classes.pageContainer}>
					<DynamicMeetingPreview meetingId={meetingId} closeDialog={closeDialog} />
				</div>
			</FlexCenter>
		</Dialog>
	);
};

export default MeetingPreviewDialog;
