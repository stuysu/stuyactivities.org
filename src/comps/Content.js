import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./ui/Navigation";

const Content = () => {
	return (
		<div>
			<Navigation />
			<Switch>
				<Route path={"/"} component={Home} exact />
			</Switch>
		</div>
	);
};

export default Content;
