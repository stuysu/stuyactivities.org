import React from "react";
import { Typography } from "@material-ui/core";
import { CharterFormContext } from "./Charter";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import capitalizeString from "../../../utils/capitalizeString";

const useStyles = makeStyles(theme => ({
	uploadedPic: {
		width: "300px",
		maxWidth: "80vw",
		maxHeight: "30vh",
		objectFit: "contain",
		marginTop: theme.spacing(1)
	}
}));

const Confirm = () => {
	const classes = useStyles();
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
					<ListItemText
						primary={"Url"}
						secondary={`https://stuyactivities.org/${form.url}`}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Commitment Level"}
						secondary={form.commitmentLevel}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Tags"}
						secondary={form?.tags?.map(tag => tag.name).join(", ")}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Keywords"}
						secondary={form?.keywords?.join(", ")}
					/>
				</ListItem>

				{form.picture && (
					<ListItem>
						<ListItemText
							primary={"Picture"}
							secondary={
								<img
									className={classes.uploadedPic}
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
					<ListItemText
						primary={"Mission Statement"}
						secondary={form.mission}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Purpose"}
						secondary={form.purpose}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Community Benefit"}
						secondary={form.benefit}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Appointment Procedures"}
						secondary={form.appointmentProcedures}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Uniqueness"}
						secondary={form.uniqueness}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Additional Information"}
						secondary={form.extra}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={"Meeting Schedule"}
						secondary={form.meetingSchedule}
					/>
				</ListItem>

				<ListItem>
					<ListItemText
						primary={"Meeting Days"}
						secondary={form.meetingDays
							?.map(a => capitalizeString(a))
							.join(", ")}
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
			<br />
			{Boolean(form?.serverError) && (
				<Typography paragraph color={"error"}>
					{form?.serverError?.graphQLErrors?.[0]?.message ||
						form.serverError?.message ||
						"Unknown error"}
				</Typography>
			)}
		</div>
	);
};

export default Confirm;
