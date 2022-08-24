import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";

const RouteTabs = ({ tabs }) => {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
	const location = useLocation();
	const history = useHistory();

	React.useEffect(() => {
		const isCorrectIndex = location.pathname.startsWith(tabs[selectedTabIndex]?.path);

		if (!isCorrectIndex) {
			const correctIndex = tabs.findIndex(tab => location.pathname.startsWith(tab.path));
			setSelectedTabIndex(~correctIndex ? correctIndex : 0);
		}
	}, [location.pathname, selectedTabIndex, tabs]);

	return (
		<div>
			<Tabs
				indicatorColor="primary"
				textColor="inherit"
				value={selectedTabIndex}
				scrollButtons
				variant={"scrollable"}
				allowScrollButtonsMobile
			>
				{tabs.map((tab, index) => (
					<Tab
						key={tab.path}
						label={tab.label}
						value={index}
						icon={tab.icon}
						onClick={() => {
							setSelectedTabIndex(index);
							history.push(tab.path);
						}}
					/>
				))}
			</Tabs>
		</div>
	);
};

export default RouteTabs;
