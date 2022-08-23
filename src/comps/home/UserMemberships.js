import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import UnstyledLink from "../ui/UnstyledLink";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Avatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import ButtonLink from "../ui/ButtonLink";

const useStyles = makeStyles({
	fixedSizeList: {
		height: 250,
		border: "1px solid rgba(0, 0, 0, 0.1)",
		borderRadius: "10px",
		overflow: "auto",
		width: "95%"
	},
	noMembershipsMessage: {
		textAlign: "center",
		padding: "1rem"
	}
});

const UserMemberships = () => {
	const classes = useStyles();
	const user = useContext(UserContext);

	return (
		<div>
			<Typography variant={"h3"} color={"primary"}>
				My Memberships:
			</Typography>

			<List className={classes.fixedSizeList}>
				{user.memberships?.map(membership => (
					<UnstyledLink key={membership.id} to={`/${membership?.organization?.url}`}>
						<ListItem button>
							<ListItemAvatar>
								<Avatar
									alt={membership?.organization?.name}
									src={membership?.organization?.charter?.picture?.thumbnail}
								/>
							</ListItemAvatar>
							<ListItemText primary={membership?.organization?.name} secondary={membership?.role} />
						</ListItem>
					</UnstyledLink>
				))}

				{!user.memberships.length && (
					<div className={classes.noMembershipsMessage}>
						<Typography paragraph color={"secondary"}>
							You're not a member of any clubs. Check out the catalog to find clubs you might like.
						</Typography>

						<ButtonLink to={"/catalog"} variant={"contained"} color={"secondary"}>
							Catalog
						</ButtonLink>
					</div>
				)}
			</List>
		</div>
	);
};

export default UserMemberships;
