import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./ui/Navigation";
import LoginDialog from "./auth/LoginDialog";
import AppContext from "./context/AppContext";
import Catalog from "./pages/organizations/Catalog";
import Charter from "./pages/organizations/Charter";
import OrgsRouter from "./pages/OrgsRouter";

const Content = () => {
	const context = React.useContext(AppContext);

	return (
		<div>
			<Navigation />

			{/*Only have the login dialog present if the user is not signed in*/}

			{!context.signedIn && <LoginDialog />}
			<Switch>
				<Route path={"/"} component={Home} exact />
				<Route path={"/organizations"} component={OrgsRouter} />
			</Switch>
		</div>
	);
};

export default Content;
