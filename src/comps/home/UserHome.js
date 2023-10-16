import React, { useContext } from "react";
import layout from "./../../styles/Layout.module.css";
import UserContext from "../context/UserContext";
import Grid from "@mui/material/Grid";
import UserMemberships from "./UserMemberships";
import UserMeetings from "./UserMeetings";
import { Typography } from "@mui/material";
import UserUpdates from "./UserUpdates";
import Typewriter from 'typewriter-effect'

const classes = {
	greeting: {
		margin: "2rem"
	}
};

// A personalized home page for users
// Show meetings from clubs they're in, posts from those clubs, and relevant links
const UserHome = () => {
	const user = useContext(UserContext);

	return (
		<div className={layout.container}> 

	<Typography variant={"h1"} sx={classes.greeting}>

		<Typewriter
			onInit={(typewriter) => {
				typewriter
					.typeString(`Welcome back, ${user.firstName}! 👋`)	
				.start();
			}}
		/>
		</Typography>

			<Grid container spacing={5}>
				<Grid item xs={12} sm={5} md={4} lg={4} xl={4}>
					<UserMemberships />
				</Grid>
				<Grid item xs={12} sm={7} md={8} lg={8} xl={8}>
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
