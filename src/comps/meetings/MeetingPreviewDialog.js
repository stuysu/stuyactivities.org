import React, { useEffect, useState } from "react";
import EventEmitter from "events";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DynamicMeetingPreview from "./DynamicMeetingPreview";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import makeStyles from "@mui/styles/makeStyles";
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
			<AppBar color={"secondary"} className={classes.appBar} enableColorOnDark>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Meeting Preview:{" "}
					</Typography>
					<IconButton edge="end" color="inherit" onClick={closeDialog} aria-label="close" size="large">
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
