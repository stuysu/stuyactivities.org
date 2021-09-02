import React from "react";
import { Avatar, Box, Card, Grid, List, ListItem, ListItemAvatar, Typography } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { OrgContext } from "./index";

const GROUP_QUERY = gql`
	query ($orgId: Int!) {
		org: organizationById(id: $orgId) {
			groups {
				name
				memberships {
					user {
						id
						name
						picture
					}
				}
			}
		}
	}
`;

const Groups = () => {
	const org = React.useContext(OrgContext);

	const { data } = useQuery(GROUP_QUERY, {
		variables: {
			orgId: org.id
		}
	});

	console.log(data);

	return (
		<>
			<Typography style={{ textAlign: "center" }} variant={"h2"}>
				Groups
			</Typography>
			<List>
				{data?.org?.groups?.length ? (
					data.org.groups.map(group => (
						<Box mt={1} p={1}>
							<Card>
								<Box p={1}>
									<ListItem key={group.id} fullWidth>
										<Grid container xl={12} lg={12} md={12} sm={12} xs={12} direction="column">
											<Typography variant="h5">{group.name}</Typography>
											<List>
												{group.memberships.length > 0 ? (
													group.memberships.map(membership => (
														<ListItem button>
															<ListItemAvatar>
																<Avatar src={membership.user.picture} />
															</ListItemAvatar>
															<span>
																<Typography>{membership.user.name}</Typography>
																<Typography
																	color={"textSecondary"}
																	variant={"subtitle2"}
																>
																	{membership.user.email}
																</Typography>
															</span>
														</ListItem>
													))
												) : (
													<Typography color={"textSecondary"}>
														This group has no members yet.
													</Typography>
												)}
											</List>
										</Grid>
									</ListItem>
								</Box>
							</Card>
						</Box>
					))
				) : (
					<Typography color={"textSecondary"}>This club has no groups yet.</Typography>
				)}
			</List>
		</>
	);
};

export default Groups;
