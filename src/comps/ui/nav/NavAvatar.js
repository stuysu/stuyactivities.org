import React from "react";
import UserContext from "../../context/UserContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const classes = {
	menu: {
		marginTop: "30px"
	}
};

const NavAvatar = () => {
	const user = React.useContext(UserContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	// const handleMenu = event => {
	// 	setAnchorEl(event.currentTarget);
	// };

	const handleClose = () => {
		setAnchorEl(null);
	};

	const random = Math.floor(Math.random() * 1000);

	const menuId = `avatar-menu-${random}`;

	return (
		<div>
			<Menu id={menuId} anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} sx={classes.menu}>
				<MenuItem onClick={handleClose}>My Account</MenuItem>
				<MenuItem onClick={user.logout}>Log Out</MenuItem>
			</Menu>
		</div>
	);
};

export default NavAvatar;
