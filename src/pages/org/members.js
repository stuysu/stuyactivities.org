import React from "react";
import { gql, useQuery } from "@apollo/client";
import { OrgContext } from "./index";
import { Typography } from "@mui/material";
import UserContext from "../../comps/context/UserContext";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const getQuery = signedIn => {
	return gql`
		query ($orgId: Int!){
			organizationById(id: $orgId) {
				memberships {
					role
					adminPrivileges
					user {
						name
						picture
						${signedIn ? "email" : ""}
					}
				}
			}
		}
	`;
};

const Members = () => {
	const org = React.useContext(OrgContext);
	const user = React.useContext(UserContext);

	const { data } = useQuery(getQuery(user.signedIn), {
		variables: {
			orgId: org.id
		}
	});

	let sortedMemberships = [...(data?.organizationById?.memberships || [])];
	sortedMemberships.sort((a, b) => (a.adminPrivileges && !b.adminPrivileges ? -1 : 1));

	return (
		<div>
			<Typography style={{ textAlign: "center" }} variant={"h2"}>
				{sortedMemberships.length} Members
			</Typography>

			{sortedMemberships.map(membership => {
				return (
					<ListItem key={membership.user.id} button>
						<ListItemAvatar>
							<Avatar src={membership.user.picture} />
						</ListItemAvatar>
						<span>
							<Typography>{membership.user.name}</Typography>
							<Typography color={"textSecondary"} variant={"subtitle2"}>
								{membership.role}
							</Typography>
							<Typography color={"textSecondary"} variant={"subtitle2"}>
								{membership.user.email}
							</Typography>
						</span>
					</ListItem>
				);
			})}
		</div>
	);
};

export default Members;
