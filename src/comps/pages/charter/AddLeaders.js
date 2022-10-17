import React from "react";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import { CharterFormContext } from "../../../pages/charter";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import UserContext from "../../context/UserContext";
import { Close } from "@mui/icons-material";
import UserSelect from "../../ui/UserSelect";

const classes = {
	removeIcon: {
		cursor: "pointer"
	}
};

const AddLeaders = () => {
	const userContext = React.useContext(UserContext);

	const form = React.useContext(CharterFormContext);

	return (
		<div>
			<Typography paragraph>
				Your Activity must have at least one other student leader. You will be automatically added as a student
				leader when you submit the charter. When you charter your role will be "creator" but once your
				organization is approved you will be able to change it.
			</Typography>
			<UserSelect
				filter={user => user.id !== userContext.id && !form?.leaders?.some(leader => leader.id === user.id)}
				onChange={(ev, user) => {
					if (user) {
						let existingLeaders = form?.leaders || [];

						const newLeaders = [...existingLeaders];

						newLeaders.push({
							...user,
							role: user.isFaculty ? "Faculty Advisor" : "Leader"
						});

						form.set({ leaders: newLeaders });
					}
				}}
			/>
			<br />

			<List dense>
				{form?.leaders?.map((user, index) => {
					const changeRole = ev => {
						const leaders = form.leaders.map((leader, i) => {
							if (i === index) {
								leader.role = ev.target.value;
							}
							return leader;
						});
						form.set({ leaders });
					};

					const removeLeader = () => {
						const leaders = form.leaders.filter((leader, i) => i !== index);
						form.set({ leaders });
					};

					return (
						<ListItemButton key={user.id}>
							<ListItemAvatar>
								<Avatar src={user.picture} />
							</ListItemAvatar>
							<Grid container>
								<Grid item xl={8} lg={8} md={6} sm={6} xs={12}>
									<Typography>{user.name}</Typography>
									<Typography color={"textSecondary"} variant={"subtitle2"}>
										{user.email}
									</Typography>
								</Grid>
								<Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
									<TextField
										variant="standard"
										fullWidth
										label={"Role"}
										value={user.role}
										onChange={changeRole}
									/>
								</Grid>
							</Grid>
							<ListItemSecondaryAction>
								<Close sx={classes.removeIcon} onClick={removeLeader} />
							</ListItemSecondaryAction>
						</ListItemButton>
					);
				})}
			</List>
		</div>
	);
};

export default AddLeaders;
