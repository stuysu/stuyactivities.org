import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "./AuthContext";
import Landing from "./subpages/Landing";
import Student from "./subpages/Student";
import Teacher from "./subpages/Teacher";
import Unrecognized from "./subpages/Unrecognized";
import FlexCenter from "../ui/FlexCenter";

const classes = {
	appBar: {
		position: "relative",
		boxShadow: "none"
	},
	title: {
		marginLeft: 2,
		flex: 1
	},
	pageContainer: {
		textAlign: "center",
		padding: 3,
		width: "700px",
		maxWidth: "90vw"
	},
	backButtonContainer: {
		textAlign: "left",
		marginLeft: "10vw"
	}
};

const AuthContent = () => {
	const authContext = React.useContext(AuthContext);

	return (
		<div>
			<AppBar sx={classes.appBar} color={"secondary"} enableColorOnDark>
				<Toolbar>
					<Typography variant="h6" sx={classes.title}>
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
				<Box sx={classes.pageContainer}>
					{authContext.page === "landing" && <Landing />}
					{authContext.page === "student" && <Student />}
					{authContext.page === "teacher" && <Teacher />}
					{authContext.page === "unrecognized" && <Unrecognized />}
				</Box>
			</FlexCenter>
		</div>
	);
};

export default AuthContent;
