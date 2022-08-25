import React from "react";
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
import { Box } from "@mui/material";

const classes = {
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: 2
	},
	title: {
		flexGrow: 1
	}
};

const NavBar = ({ setDrawerOpen }) => {
	const isMobile = useMediaQuery("(max-width: 800px)");
	const user = React.useContext(UserContext);

	return (
		<Box sx={classes.root}>
			<AppBar position="static" enableColorOnDark>
				<Toolbar>
					<IconButton
						edge="start"
						sx={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={() => setDrawerOpen(true)}
						size="large"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h5" sx={classes.title}>
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
		</Box>
	);
};

export default NavBar;
