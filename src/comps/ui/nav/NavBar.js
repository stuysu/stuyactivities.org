import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { triggerLoginDialog } from "../../auth/AuthDialog";
import UserContext from "../../context/UserContext";
import NavAvatar from "./NavAvatar";
import UnstyledLink from "../UnstyledLink";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BugReport } from "@mui/icons-material";
import { triggerReportDialog } from "../../help/ReportDialog";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const NavBar = ({ setDrawerOpen }) => {
	const classes = useStyles();
	const isMobile = useMediaQuery("(max-width: 800px)");
	const user = React.useContext(UserContext);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={() => setDrawerOpen(true)}
						size="large"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h5" className={classes.title}>
						<UnstyledLink to={"/"}>StuyActivities</UnstyledLink>
					</Typography>
					<div>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu"
							onClick={() => triggerReportDialog()}
							size="large"
						>
							<BugReport />
						</IconButton>

						{!isMobile && (
							<>
								{user.signedIn ? (
									<NavAvatar />
								) : (
									<Button color="inherit" onClick={triggerLoginDialog}>
										Sign In
									</Button>
								)}
							</>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
