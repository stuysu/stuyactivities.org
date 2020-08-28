import React from "react";
import { Route, Switch } from "react-router-dom";
import { Tab, Tabs } from "@material-ui/core";

/** Tabs are [{url: ..., name: ..., component: ...}, ...] **/

export default function Tabbed({ match, history, tabs }) {
	console.log(match);
	const tabUrls = tabs.map(e => e.url);
	const [currTab, setCurrTab] = React.useState(
		tabUrls.findIndex(tab => window.location.href.includes(tab))
	);
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
				<Route
					path={match.path}
					component={() => <div>Please choose a tab</div>}
					exact
				/>
				{tabs.map(e => (
					<Route
						path={match.path + e.url}
						component={e.component}
						exact
					/>
				))}
			</Switch>
		</div>
	);
}
