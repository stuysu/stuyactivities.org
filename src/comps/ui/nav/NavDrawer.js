import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Logo from "./../../../img/logo512.png";
import UserContext from "../../context/UserContext";
import {
	AccountBox,
	AddCircleOutlined,
	Archive,
	EmojiFlags,
	EmojiSymbols,
	Explore,
	Feeback,
	Gavel,
	Home,
	Info,
	LockOpen,
	PowerSettingsNew
} from "@material-ui/icons";
import { Avatar, Typography } from "@material-ui/core";
import UnstyledLink from "../UnstyledLink";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { triggerLoginDialog } from "../../auth/AuthDialog";

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

const gradeLabels = {
	9: "Freshman",
	10: "Sophomore",
	11: "Junior",
	12: "Senior",
	13: "Alumni"
};

const NavDrawer = ({ drawerOpen, setDrawerOpen }) => {
	const user = useContext(UserContext);
	const location = useLocation();
	const classes = useStyles();

	React.useEffect(() => {
		// Close the drawer if the user uses it to navigate
		setDrawerOpen(false);
	}, [location, setDrawerOpen]);

	return (
		<Drawer anchor={"left"} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
			<div className={classes.avatarContainer}>
				{user.signedIn ? (
					<div>
						<Avatar src={user.picture} className={classes.avatar} />
						<Typography variant={"h5"}>{user?.name}</Typography>
						<Typography variant={"body2"}>{user?.email}</Typography>
						{Boolean(user?.fourDigitId) && (
							<Typography variant={"body2"}>Four Digit ID: {user?.fourDigitId}</Typography>
						)}
						<Typography variant={"body2"}>
							{user?.isFaculty ? "Faculty" : gradeLabels[user?.grade]}
						</Typography>
					</div>
				) : (
					<div>
						<img src={Logo} className={classes.avatar} alt={"Student Union Logo"} />
						<Typography variant={"h6"}>StuyActivities</Typography>
					</div>
				)}
			</div>
			<List className={classes.list}>
				{user.signedIn ? (
					<ListItem button onClick={() => user.logout()}>
						<ListItemIcon>
							<PowerSettingsNew />
						</ListItemIcon>
						<ListItemText primary={"Sign Out"} />
					</ListItem>
				) : (
					<ListItem button onClick={() => triggerLoginDialog()}>
						<ListItemIcon>
							<LockOpen />
						</ListItemIcon>
						<ListItemText primary={"Sign In"} />
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

				<ListSubheader disableSticky>Discover</ListSubheader>
				<UnstyledLink to={"/explore"}>
					<ListItem button>
						<ListItemIcon>
							<Explore />
						</ListItemIcon>
						<ListItemText primary={"Explore"} />
					</ListItem>
				</UnstyledLink>
				<UnstyledLink to={"/catalog"}>
					<ListItem button>
						<ListItemIcon>
							<EmojiSymbols />
						</ListItemIcon>
						<ListItemText primary={"Catalog"} />
					</ListItem>
				</UnstyledLink>

				{user.signedIn && (
					<>
						<UnstyledLink to={"/clubpubfair"}>
							<ListItem button>
								<ListItemIcon>
									<EmojiFlags />
								</ListItemIcon>
								<ListItemText primary={"Clubs & Pubs Fair"} />
							</ListItem>
						</UnstyledLink>
					</>
				)}

				<ListItem
					button
					onClick={() =>
						window.open(
							"https://docs.google.com/spreadsheets/d/1zXnAbnR3uq0a1bJxKKefP1xShE6ovyJX2k9bl_qkEco/edit?usp=sharing"
						)
					}
				>
					<ListItemIcon>
						<Archive />
					</ListItemIcon>
					<ListItemText primary={"Archive"} />
				</ListItem>
				{user.signedIn && (
					<>
						<ListSubheader disableSticky>My Activities</ListSubheader>
						{user.memberships?.map(membership => (
							<UnstyledLink key={membership.id} to={`/${membership?.organization?.url}`}>
								<ListItem button>
									<ListItemAvatar>
										<Avatar
											alt={membership?.organization?.name}
											src={membership?.organization?.charter?.picture}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={membership?.organization?.name}
										secondary={membership?.role}
									/>
								</ListItem>
							</UnstyledLink>
						))}
						<UnstyledLink to={"/charter"}>
							<ListItem button>
								<ListItemIcon>
									<AddCircleOutlined />
								</ListItemIcon>
								<ListItemText primary={"Create New Activity"} />
							</ListItem>
						</UnstyledLink>
					</>
				)}

				<ListSubheader disableSticky>Info</ListSubheader>
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

				<UnstyledLink to={"/feedback"}>
					<ListItem button>
						<ListItemIcon>
							<Feedback />
						</ListItemIcon>
						<ListItemText primary={"Feedback"} />
					</ListItem>
				</UnstyledLink>

				{user?.adminRoles !== undefined || {} ? (
					<UnstyledLink to={"/admin"}>
						<ListItem button>
							<ListItemIcon>
								<AccountBox />
							</ListItemIcon>
							<ListItemText primary={"Admin Panel"} />
						</ListItem>
					</UnstyledLink>
				) : (
					<></>
				)}
			</List>
		</Drawer>
	);
};
export default NavDrawer;
