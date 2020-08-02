import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { triggerLoginDialog } from "../auth/LoginDialog";
import AppContext from "../context/AppContext";
import NavAvatar from "./NavAvatar";

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

	const context = React.useContext(AppContext);

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
					<Typography variant="h6" className={classes.title}>
						StuyActivities
					</Typography>

					{context.signedIn ? (
						<NavAvatar />
					) : (
						<Button color="inherit" onClick={triggerLoginDialog}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
