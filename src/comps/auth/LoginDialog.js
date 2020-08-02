import React from "react";
import EventEmitter from "events";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Landing from "./pages/Landing";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Forgot from "./pages/Forgot";

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
		padding: theme.spacing(2)
	},
	backButtonContainer: {
		textAlign: "left",
		marginLeft: "10vw"
	}
}));

const loginDialogEmitter = new EventEmitter();

export const triggerLoginDialog = () => {
	loginDialogEmitter.emit("open");
};

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const LoginDialog = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	// page can be "landing", "student", "teacher", "forgot", "unrecognized"
	const [page, setPage] = React.useState("landing");

	const [
		// authToken,
		setAuthToken
	] = React.useState(null);

	React.useEffect(() => {
		const openDialog = () => {
			if (page !== "unrecognized") {
				setPage("landing");
			}
			setOpen(true);
		};

		loginDialogEmitter.on("open", openDialog);
		return () => loginDialogEmitter.removeListener("open", openDialog);
	});

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar} color={"secondary"}>
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							Login To StuyActivities
						</Typography>
						<IconButton
							edge="end"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

				<div className={classes.pageContainer}>
					{page === "landing" && (
						<Landing setPage={setPage} handleClose={handleClose} />
					)}
					{page === "student" && (
						<Student
							setPage={setPage}
							setAuthToken={setAuthToken}
						/>
					)}
					{page === "teacher" && (
						<Teacher
							setPage={setPage}
							setAuthToken={setAuthToken}
						/>
					)}
					{page === "forgot" && <Forgot setPage={setPage} />}
				</div>
			</Dialog>
		</div>
	);
};

export default LoginDialog;
