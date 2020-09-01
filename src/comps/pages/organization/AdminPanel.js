import React from "react";

import Members from "./AdminPanelTabs/Members";
import Requests from "./AdminPanelTabs/Requests";

import Tabbed from "../../ui/Tabbed";
import Meetings from "./AdminPanelTabs/Meetings";
import EditCharter from "./AdminPanelTabs/EditCharter";

export default function AdminPanel({ match, history }) {
	const tabs = [
		{ name: "Members", url: "/members", component: Members },
		{ name: "Membership Requests", url: "/requests", component: Requests }
		// {
		// 	name: "Meetings",
		// 	url: "/meetings",
		// 	component: Meetings
		// },
		// {
		// 	name: "Edit Charter",
		// 	url: "/editCharter",
		// 	component: () => <EditCharter />
		// }
		// { name: "Strikes", url: "/strikes", component: () => <p>Strikes</p> }
	];
	return <Tabbed match={match} history={history} tabs={tabs} />;
}

/*
export default function AdminPanel({match, history}) {
	const [currTab, setCurrTab] = React.useState(TABS.findIndex(tab => window.location.href.includes(tab)))
	const changeTab = (_, newTab) => {
		history.push(match.url + TABS[newTab])
		setCurrTab(newTab)
	}
	return (
		<div>
			<Tabs value={currTab} onChange={changeTab}>
				<Tab label="Members"/>
				<Tab label="Membership Requests"/>
				<Tab label="Meetings"/>
				<Tab label="Edit Charter"/>
				<Tab label="Strikes"/>
			</Tabs>
			<Switch>
				<Route
					path={match.path}
					component={() => <div>Please choose a tab</div>}
					exact
				/>
				<Route
					path={match.path + "/members"}
					component={Members}
					exact
				/>
				<Route
					path={match.path + "/requests"}
					component={Requests}
					exact
				/>
				<Route
					path={match.path + "/meetings"}
					component={() => <div>Meetings</div>}
					exact
				/>
				<Route
					path={match.path + "/editCharter"}
					component={() => <div>Charter Edits</div>}
					exact
				/>
				<Route
					path={match.path + "/strikes"}
					component={() => <div>Strikes tab</div>}
					exact
				/>
			</Switch>
		</div>
	)
}
*/
