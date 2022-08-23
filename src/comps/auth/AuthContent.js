import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import makeStyles from "@mui/styles/makeStyles";
import AuthContext from "./AuthContext";
import Landing from "./subpages/Landing";
import Student from "./subpages/Student";
import Teacher from "./subpages/Teacher";
import Unrecognized from "./subpages/Unrecognized";
import FlexCenter from "../ui/FlexCenter";

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
	},
	backButtonContainer: {
		textAlign: "left",
		marginLeft: "10vw"
	}
}));

const AuthContent = () => {
	const classes = useStyles();

	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<AppBar className={classes.appBar} color={"secondary"}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Login To StuyActivities
					</Typography>
					<IconButton
						edge="end"
						color="inherit"
						onClick={authContext.handleClose}
						aria-label="close"
						size="large"
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<FlexCenter>
				<div className={classes.pageContainer}>
					{authContext.page === "landing" && <Landing />}
					{authContext.page === "student" && <Student />}
					{authContext.page === "teacher" && <Teacher />}
					{authContext.page === "unrecognized" && <Unrecognized />}
				</div>
			</FlexCenter>
		</div>
	);
};

export default AuthContent;
