import React from "react";

import {
	TopAppBar,
	TopAppBarRow,
	TopAppBarSection,
	TopAppBarNavigationIcon,
	TopAppBarTitle,
	TopAppBarFixedAdjust
} from "@rmwc/top-app-bar";
import "@rmwc/top-app-bar/styles";

const AppBar = () => {
	return (
		<div>
			<TopAppBar>
				<TopAppBarRow>
					<TopAppBarSection>
						<TopAppBarNavigationIcon icon="menu" />
						<TopAppBarTitle>StuyActivities</TopAppBarTitle>
					</TopAppBarSection>
					<TopAppBarSection alignEnd className={"desktop-only"}>
						<span>Login</span>
					</TopAppBarSection>
				</TopAppBarRow>
			</TopAppBar>
			<TopAppBarFixedAdjust />
		</div>
	);
};

export default AppBar;
