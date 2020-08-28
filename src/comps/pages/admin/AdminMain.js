import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Tabbed from "../../ui/Tabbed";
import Approvals from "./Approvals";

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(3)
	}
}));

export default function AdminMain({ match, history }) {
	const classes = useStyles();
	const tabs = [
		{ name: "Charter Approvals", url: "/approvals", component: Approvals },
		{ name: "Admin Log", url: "/log", component: () => <p>Admin Log</p> },
		{
			name: "Notify Club Leaders",
			url: "/notify",
			component: () => <p>Notify Club Leaders</p>
		}
	];
	return (
		<div className={classes.root}>
			<Typography variant={"h3"}>Admin Panel</Typography>
			<Tabbed tabs={tabs} match={match} history={history} /> :
		</div>
	);
}
