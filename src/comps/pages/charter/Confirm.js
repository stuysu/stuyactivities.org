import React from "react";
import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { CharterFormContext } from "../../../pages/charter";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import capitalizeString from "../../../utils/capitalizeString";

const classes = {
	uploadedPic: {
		width: "300px",
		maxWidth: "80vw",
		maxHeight: "30vh",
		objectFit: "contain",
		marginTop: 1
	}
};

const Confirm = () => {
	const form = React.useContext(CharterFormContext);

	return (
		<div>
			<Typography variant={"h5"}>Confirm your changes:</Typography>
			<br />
			<Typography variant={"h6"}>Basic Info: </Typography>

			<List dense>
				<ListItem>
					<ListItemText primary={"Name"} secondary={form.name} />
				</ListItem>

				<ListItem>
					<ListItemText primary={"Url"} secondary={`https://stuyactivities.org/${form.url}`} />
				</ListItem>

				<ListItem>
					<ListItemText primary={"Commitment Level"} secondary={form.commitmentLevel} />
				</ListItem>

				<ListItem>
					<ListItemText primary={"Tags"} secondary={form?.tags?.map(tag => tag.name).join(", ")} />
				</ListItem>

				<ListItem>
					<ListItemText primary={"Keywords"} secondary={form?.keywords?.join(", ")} />
				</ListItem>

				<ListItem>
					<ListItemText primary={"Socials"} secondary={form?.socials} />
				</ListItem>

				{form.picture && (
					<ListItem>
						<ListItemText
							primary={"Picture"}
							secondary={
								<Box
									component="img"
									sx={classes.uploadedPic}
									src={URL.createObjectURL(form.picture)}
									alt={"uploaded file"}
								/>
							}
						/>
					</ListItem>
				)}
			</List>

			<Typography variant={"h6"}>Charter:</Typography>
			<List dense>
				<ListItem>
					<ListItemText primary={"Mission Statement"} secondary={form.mission} />
				</ListItem>

				<ListItem>
					<ListItemText primary={"Purpose"} secondary={form.purpose} />
				</ListItem>

				<ListItem>
					<ListItemText primary={"Community Benefit"} secondary={form.benefit} />
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Appointment and Impeachment Procedures"}
						secondary={form.appointmentProcedures}
					/>
				</ListItem>

				<ListItem>
					<ListItemText primary={"Uniqueness"} secondary={form.uniqueness} />
				</ListItem>

				<ListItem>
					<ListItemText primary={"Additional Information"} secondary={form.extra} />
				</ListItem>
				<ListItem>
					<ListItemText primary={"Meeting Schedule"} secondary={form.meetingSchedule} />
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Meeting Days"}
						secondary={form.meetingDays?.map(a => capitalizeString(a)).join(", ")}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Interested in participating in the Clubs & Pubs fair?"}
						secondary={form.clubpubParticipant ? "Yes" : "No"}
					/>
				</ListItem>
			</List>

			<Typography variant={"h6"}>Leaders:</Typography>
			<List dense className={classes.root}>
				{form?.leaders?.map((user, index) => {
					return (
						<ListItem key={user.id}>
							<ListItemAvatar>
								<Avatar src={user.picture} />
							</ListItemAvatar>
							<ListItemText
								primary={user.name}
								secondary={
									<span>
										{user.email}
										<br />
										{user.role}
									</span>
								}
							/>
						</ListItem>
					);
				})}
			</List>

			<FormControlLabel
				control={
					<Checkbox
						checked={form?.clubpubParticipant}
						onChange={ev => form.set({ clubpubParticipant: ev.target.checked })}
						color="secondary"
					/>
				}
				label={
					"Are you interested in representing your club in the Clubs & Pubs Fair this September? (This is non-binding, and you may change your answer in the future.)"
				}
			/>

			<br />
			{Boolean(form?.serverError) && (
				<Typography paragraph color={"error"}>
					{form?.serverError?.graphQLErrors?.[0]?.message || form.serverError?.message || "Unknown error"}
				</Typography>
			)}
		</div>
	);
};

export default Confirm;
