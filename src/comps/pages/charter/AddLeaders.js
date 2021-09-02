import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CharterFormContext } from "../../../pages/charter";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import UserContext from "../../context/UserContext";
import { Close } from "@material-ui/icons";
import UserSelect from "../../ui/UserSelect";

const useStyles = makeStyles({
	removeIcon: {
		cursor: "pointer"
	}
});

const AddLeaders = () => {
	const classes = useStyles();
	const userContext = React.useContext(UserContext);

	const form = React.useContext(CharterFormContext);

	return (
		<div>
			<Typography paragraph>
				Your Activity must have at least one other student leader. Your Activity must also have a Faculty
				Advisor which must be added by October. When you charter your role will be "creator" but once your
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

			<List dense className={classes.root}>
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
						<ListItem key={user.id} button>
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
									<TextField fullWidth label={"Role"} value={user.role} onChange={changeRole} />
								</Grid>
							</Grid>
							<ListItemSecondaryAction>
								<Close className={classes.removeIcon} onClick={removeLeader} />
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};

export default AddLeaders;
