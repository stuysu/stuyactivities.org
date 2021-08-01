import { gql, useQuery } from "@apollo/client";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import React from "react";
import UserContext from "../../comps/context/UserContext";
import { OrgContext } from "./index";

const getQuery = signedIn => {
	return gql`
		query ($orgId: Int!){
			memberships(orgId: $orgId){
				role
				user {
					name
					picture
					${signedIn ? "email" : ""}
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

	return (
		<div>
			<Typography style={{ textAlign: "center" }} variant={"h2"}>
				{data?.memberships.length} Members
			</Typography>

			{data?.memberships.map(membership => {
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
