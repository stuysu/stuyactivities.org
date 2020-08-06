import React from "react";
import AppContext from "../../context/AppContext";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
	menu: {
		marginTop: "30px"
	}
});

const NavAvatar = () => {
	const classes = useStyles();

	const context = React.useContext(AppContext);
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
				{context.picture ? (
					<Avatar alt={context.name} src={context.picture} />
				) : (
					<Avatar>
						{context.firstName[0] + context.lastName[0]}
					</Avatar>
				)}
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
				<MenuItem onClick={context.logout}>Log Out</MenuItem>
			</Menu>
		</div>
	);
};

export default NavAvatar;
