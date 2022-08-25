import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import UnstyledLink from "../ui/UnstyledLink";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ButtonLink from "../ui/ButtonLink";

const classes = {
	fixedSizeList: {
		height: 250,
		borderWidth: 1,
		borderColor: "transparency.border",
		borderStyle: "solid",
		borderRadius: "10px",
		overflow: "auto",
		width: "95%"
	},
	noMembershipsMessage: {
		textAlign: "center",
		padding: "1rem"
	}
};

const UserMemberships = () => {
	const user = useContext(UserContext);

	return (
		<div>
			<Typography variant={"h3"} color={"primary"}>
				My Memberships:
			</Typography>

			<List sx={classes.fixedSizeList}>
				{user.memberships?.map(membership => (
					<UnstyledLink key={membership.id} to={`/${membership?.organization?.url}`}>
						<ListItemButton>
							<ListItemAvatar>
								<Avatar
									alt={membership?.organization?.name}
									src={membership?.organization?.charter?.picture?.thumbnail}
								/>
							</ListItemAvatar>
							<ListItemText primary={membership?.organization?.name} secondary={membership?.role} />
						</ListItemButton>
					</UnstyledLink>
				))}

				{!user.memberships.length && (
					<Box sx={classes.noMembershipsMessage}>
						<Typography paragraph color={"secondary"}>
							You're not a member of any clubs. Check out the catalog to find clubs you might like.
						</Typography>

						<ButtonLink to={"/catalog"} variant={"contained"} color={"secondary"}>
							Catalog
						</ButtonLink>
					</Box>
				)}
			</List>
		</div>
	);
};

export default UserMemberships;
