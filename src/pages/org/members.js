import React from "react";
import { gql, useQuery } from "@apollo/client";
import { OrgContext } from "./index";
import { Typography } from "@material-ui/core";
import UserContext from "../../comps/context/UserContext";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const getQuery = signedIn => {
	return gql`
		query ($orgId: Int!){
			organizationById(id: $orgId) {
				memberships(orgId: $orgId){
					role
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

	if (data?.organizationById?.memberships) {
		data.organizationById.memberships.sort((a, _) => (a.adminPrivileges ? 1 : -1));
	}

	return (
		<div>
			<Typography style={{ textAlign: "center" }} variant={"h2"}>
				{data?.organizationById.memberships.length} Members
			</Typography>

			{data?.organizationById.memberships.map(membership => {
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
