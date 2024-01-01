import { gql, useQuery, useMutation } from "@apollo/client";
import { Box, Grid, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import OrganizationPicker from "../../comps/ui/OrganizationPicker";
import AdminMeetingCard from "../../comps/pages/admin/AdminMeetingCard";

const classes = {
	mainDiv: {
		width: "1200px",
		maxWidth: "90%",
		margin: "auto"
	}
};

const MUTATION = gql`
	mutation ($meetingId: Int!) {
		adminDeleteMeeting(meetingId: $meetingId)
	}
`;

const QUERY = gql`
	query ($id: Int!) {
		organization: organizationById(id: $id) {
			id
			name
			url
			memberships {
				id
				user {
					id
					name
					firstName
					lastName
					email
					isFaculty
					fourDigitId
				}
				role
				adminPrivileges
			}
			updates {
				title
				content
			}
			meetings {
				id
				title
				description
				start
				end
				privacy
				rooms {
					id
					name
					floor
					approvalRequired
				}
			}
		}
	}
`;

const ManageClubs = () => {
	const [orgId, setOrgId] = useState(0);
	const { data } = useQuery(QUERY, {
		variables: {
			id: orgId
		}
	});

	let [message, setMessage] = useState("");

	const [deleteMeeting] = useMutation(MUTATION, {
		update(cache) {
			cache.reset().then(() => setOrgId(orgId));
		}
	});

	return (
		<Box sx={classes.mainDiv}>
			<OrganizationPicker setOrgId={setOrgId} />
			<Grid container>
				{data?.organization?.meetings?.length > 0 ? (
					data.organization.meetings.map((meeting, i) => (
						<Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
							<AdminMeetingCard
								{...meeting}
								onDelete={async () => {
									try {
										await deleteMeeting({ variables: { meetingId: meeting.id } });
										setMessage("Meeting deleted!");
									} catch (e) {
										setMessage("Failed to delete meeting: " + e.message);
									}
								}}
								key={i}
							/>
						</Grid>
					))
				) : orgId === 0 ? (
					<></>
				) : (
					<Typography>No club meetings found.</Typography>
				)}
			</Grid>

			<Snackbar
				autoHideDuration={1000}
				open={message?.length > 0}
				onClose={() => setMessage("")}
				message={message}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			/>
		</Box>
	);
};

export default ManageClubs;
