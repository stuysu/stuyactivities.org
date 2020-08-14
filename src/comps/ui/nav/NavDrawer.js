import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SULogo from "./../../../img/su-logo512.png";
import UserContext from "../../context/UserContext";
import {
	Archive,
	ArtTrack,
	EmojiSymbols,
	Gavel,
	Home,
	Info,
	PowerSettingsNew
} from "@material-ui/icons";
import { Avatar, Typography } from "@material-ui/core";
import UnstyledLink from "../UnstyledLink";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles(theme => ({
	list: {
		width: 250
	},
	avatar: {
		width: "100px",
		height: "100px"
	},
	avatarContainer: {
		padding: "1rem"
	},
	ul: {
		backgroundColor: "inherit",
		paddingLeft: 0
	}
}));

const NavDrawer = ({ drawerOpen, setDrawerOpen }) => {
	const user = useContext(UserContext);
	const location = useLocation();
	const classes = useStyles();

	React.useEffect(() => {
		// Close the drawer if the user uses it to navigate
		setDrawerOpen(false);
	}, [location, setDrawerOpen]);

	return (
		<Drawer
			anchor={"left"}
			open={drawerOpen}
			onClose={() => setDrawerOpen(false)}
		>
			<div className={classes.avatarContainer}>
				{user.signedIn ? (
					<div>
						<Avatar src={user.picture} className={classes.avatar} />
						<Typography variant={"h6"}>{user?.name}</Typography>
						<Typography variant={"body2"}>{user?.email}</Typography>
					</div>
				) : (
					<div>
						<img
							src={SULogo}
							className={classes.avatar}
							alt={"Student Union Logo"}
						/>
						<Typography variant={"h6"}>StuyActivities</Typography>
					</div>
				)}
			</div>
			<List className={classes.list}>
				{user.signedIn && (
					<ListItem button>
						<ListItemIcon>
							<PowerSettingsNew />
						</ListItemIcon>
						<ListItemText primary={"Sign Out"} />
					</ListItem>
				)}

				<UnstyledLink to={"/"}>
					<ListItem button>
						<ListItemIcon>
							<Home />
						</ListItemIcon>
						<ListItemText primary={"Home"} />
					</ListItem>
				</UnstyledLink>

				<ListSubheader>Explore</ListSubheader>
				<UnstyledLink to={"/catalog"}>
					<ListItem button>
						<ListItemIcon>
							<EmojiSymbols />
						</ListItemIcon>
						<ListItemText primary={"Catalog"} />
					</ListItem>
				</UnstyledLink>

				<ListItem
					button
					onClick={() => window.open("https://stuyactivities.org")}
				>
					<ListItemIcon>
						<Archive />
					</ListItemIcon>
					<ListItemText primary={"Archive"} />
				</ListItem>
				{user.signedIn && user.memberships?.length > 0 && (
					<>
						<ListSubheader>My Activities</ListSubheader>
						{user.memberships?.map(membership => (
							<UnstyledLink
								to={`/${membership?.organization?.url}`}
							>
								<ListItem button>
									<ListItemAvatar>
										<Avatar
											alt={membership?.organization?.name}
											src={
												membership?.organization
													?.charter?.picture
											}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={membership?.organization?.name}
										secondary={membership?.role}
									/>
								</ListItem>
							</UnstyledLink>
						))}
					</>
				)}

				<ListSubheader>Info</ListSubheader>
				<UnstyledLink to={"/about"}>
					<ListItem button>
						<ListItemIcon>
							<Info />
						</ListItemIcon>
						<ListItemText primary={"About"} />
					</ListItem>
				</UnstyledLink>

				<UnstyledLink to={"/rules"}>
					<ListItem button>
						<ListItemIcon>
							<Gavel />
						</ListItemIcon>
						<ListItemText primary={"Rules"} />
					</ListItem>
				</UnstyledLink>
			</List>
		</Drawer>
	);
};
export default NavDrawer;
