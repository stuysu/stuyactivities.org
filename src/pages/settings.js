import React from "react";
import FlexCenter from "../comps/ui/FlexCenter";
import UserContext from "../comps/context/UserContext";
import { Typography, Table, TableHead, TableRow, TableCell, Avatar, TableBody, Switch } from "@material-ui/core";

import { gql, useMutation } from "@apollo/client";

const ALTER_EMAIL_SETTINGS = gql`
	mutation AlterEmailSettings($membershipId: Int!, $meetingNotification: Boolean, $updateNotification: Boolean) {
		alterEmailSettings(
			membershipId: $membershipId
			meetingNotification: $meetingNotification
			updateNotification: $updateNotification
		) {
			id
			role
			organization {
				id
				name
				url
				charter {
					picture {
						thumbnail(width: 80, height: 80)
						tinyThumbnail: thumbnail(width: 40, height: 40)
						url
					}
				}
			}
			adminPrivileges
			meetingNotification
			updateNotification
		}
	}
`;

export default function Settings() {
	const user = React.useContext(UserContext);
	const [mutation] = useMutation(ALTER_EMAIL_SETTINGS, {
		update(cache) {
			//can be done better by editing the cache (esp. with the new membership info)
			//as done in one of the meeting mutations in the admin page (can't remember which)
			cache.reset();
		}
	});
	return (
		<FlexCenter>
			<div style={{ width: "1200px", maxWidth: "calc(100vw - 2rem)", padding: "1rem" }}>
				<Typography variant={"h2"} align={"center"}>
					Email Settings
				</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox"></TableCell>
							<TableCell>
								<Typography>Organization</Typography>
							</TableCell>
							<TableCell align={"right"}>
								<Typography>Meeting Notifications</Typography>
							</TableCell>
							<TableCell align={"right"}>
								<Typography>Post Notifications</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user?.memberships?.map(membership => (
							<TableRow key={membership.id}>
								<TableCell padding="checkbox">
									<Avatar src={membership.organization.charter.picture.thumbnail} />
								</TableCell>
								<TableCell>
									<Typography>{membership.organization.name}</Typography>
								</TableCell>
								<TableCell align={"right"}>
									<Switch
										checked={
											membership.meetingNotification !== null
												? membership.meetingNotification
												: true
										}
										onChange={e =>
											mutation({
												variables: {
													membershipId: membership.id,
													meetingNotification: e.target.checked
												}
											})
										}
									/>
								</TableCell>
								<TableCell align={"right"}>
									<Switch
										checked={
											membership.updateNotification !== null
												? membership.updateNotification
												: true
										}
										onChange={e =>
											mutation({
												variables: {
													membershipId: membership.id,
													updateNotification: e.target.checked
												}
											})
										}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</FlexCenter>
	);
}
