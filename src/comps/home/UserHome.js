import React, { useContext } from "react";
import layout from "./../../styles/Layout.module.css";
import UserContext from "../context/UserContext";
import Grid from "@material-ui/core/Grid";
import UserMemberships from "./UserMemberships";
import UserMeetings from "./UserMeetings";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserUpdates from "./UserUpdates";
import CommunityBuildingNotification from "./CommunityBuildingNotification";

const useStyles = makeStyles({
	greeting: {
		margin: "2rem"
	}
});

// A personalized home page for users
// Show meetings from clubs they're in, posts from those clubs, and relevant links
const UserHome = () => {
	const classes = useStyles();
	const user = useContext(UserContext);

	return (
		<div className={layout.container}>
			<Typography variant={"h1"} className={classes.greeting}>
				Welcome back, {user.firstName}
			</Typography>

			<Grid container spacing={5}>
				<Grid item xs={0} sm={0} md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
					<CommunityBuildingNotification grade={user.grade} />
				</Grid>
				<Grid item xs={0} sm={0} md={2} lg={2} xl={2}></Grid>
				<Grid
					item
					xs={12}
					// sm={5} md={4} lg={4} xl={4}
				>
					<UserMemberships />
				</Grid>
				<Grid
					item
					xs={12}
					// sm={7} md={8} lg={8} xl={8}
				>
					<UserMeetings />
				</Grid>

				<Grid item xs={12}>
					<UserUpdates />
				</Grid>
			</Grid>
		</div>
	);
};

export default UserHome;
