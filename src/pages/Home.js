import React from "react";
import { Helmet } from "react-helmet";
import UnauthenticatedLanding from "../comps/home/UnauthenticatedLanding";
import UserContext from "../comps/context/UserContext";
import UserHome from "../comps/home/UserHome";

const Home = () => {
	const user = React.useContext(UserContext);

	return (
		<div>
			<Helmet>
				<title>Home | StuyActivities</title>
			</Helmet>

			{user.signedIn ? <UserHome /> : <UnauthenticatedLanding />}
		</div>
	);
};

export default Home;
