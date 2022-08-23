import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";

/** Tabs are [{url: ..., name: ..., component: ...}, ...] **/

export default function Tabbed({ match, history, tabs }) {
	console.log(match);
	const tabUrls = tabs.map(e => e.url);
	const [currTab, setCurrTab] = React.useState(tabUrls.findIndex(tab => window.location.href.includes(tab)));
	const changeTab = (_, newTab) => {
		history.push(match.url + tabUrls[newTab]);
		setCurrTab(newTab);
	};
	return (
		<div>
			<Tabs value={currTab} onChange={changeTab}>
				{tabs.map(e => (
					<Tab label={e.name} />
				))}
			</Tabs>
			<Switch>
				<Route path={match.path} component={() => <Redirect to={"/stuysu/admin/members"} />} exact />
				{tabs.map(e => (
					<Route path={match.path + e.url} component={e.component} exact />
				))}
			</Switch>
		</div>
	);
}
