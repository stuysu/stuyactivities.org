import React from "react";
import UserContext from "../../context/UserContext";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Help } from "@material-ui/icons";

const useStyles = makeStyles({
	menu: {
		marginTop: "30px"
	}
});

const NavAvatar = () => {
	const classes = useStyles();

	const user = React.useContext(UserContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const random = Math.floor(Math.random() * 1000);

	const menuId = `avatar-menu-${random}`;

	return (
		<div>
			<IconButton
				aria-label="account of current user"
				aria-controls={menuId}
				aria-haspopup="true"
				color="inherit"
				onClick={handleMenu}
			>
				<Help />
			</IconButton>

			<Menu
				id={menuId}
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				className={classes.menu}
			>
				<MenuItem onClick={handleClose}>My Account</MenuItem>
				<MenuItem onClick={user.logout}>Log Out</MenuItem>
			</Menu>
		</div>
	);
};

export default NavAvatar;
