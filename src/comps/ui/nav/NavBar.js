import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { triggerLoginDialog } from "../../auth/AuthDialog";
import UserContext from "../../context/UserContext";
import NavAvatar from "./NavAvatar";
import UnstyledLink from "../UnstyledLink";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { BugReport } from "@material-ui/icons";
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
