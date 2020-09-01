import React from "react";

import Members from "./AdminPanelTabs/Members";
import Requests from "./AdminPanelTabs/Requests";

import { Tab, Tabs } from "@material-ui/core";
import {
	generatePath,
	Redirect,
	Route,
	Switch,
	useLocation
} from "react-router-dom";

export default function AdminRouter({ match, history }) {
	const actualMatch = generatePath(match.path, match.params);
	const location = useLocation();

	const tabs = [
		{
			path: actualMatch + "/members",
			label: "Members"
		},
		{
			path: actualMatch + "/requests",
			label: "Member Requests"
		}
	];

	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

	React.useEffect(() => {
		const isCorrectIndex = location.pathname.startsWith(
			tabs[selectedTabIndex]?.path
		);

		if (!isCorrectIndex) {
			const correctIndex = tabs.findIndex(tab =>
				location.pathname.startsWith(tab.path)
			);

			setSelectedTabIndex(correctIndex !== -1 ? correctIndex : 0);
		}
	}, [location, selectedTabIndex, tabs]);

	return (
		<div>
			<Tabs value={selectedTabIndex}>
				{tabs.map((tab, index) => (
					<Tab
						key={tab.path}
						label={tab.label}
						onClick={() => {
							setSelectedTabIndex(index);
							history.push(tab.path);
						}}
					/>
				))}
			</Tabs>

			<Switch>
				<Route path={match.path + "/members"} component={Members} />
				<Route path={match.path + "/requests"} component={Requests} />
				<Route path={match.path}>
					<Redirect to={actualMatch + "/members"} />
				</Route>
			</Switch>
		</div>
	);
}
