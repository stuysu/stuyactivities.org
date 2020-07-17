import React from "react";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";

const Home = () => {
	return (
		<div>
			<Typography h1>Welcome home!</Typography>
			<Helmet>
				<title>Home | StuyActivities</title>
			</Helmet>
		</div>
	);
};

export default Home;
