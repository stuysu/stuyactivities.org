import React from "react";
import AppContext from "./context/AppContext";

function CurrentUser() {
	const context = React.useContext(AppContext);

	if (!context.signedIn) {
		return <p>not signed in</p>;
	}

	return <div>Hi there {context.firstName}!</div>;
}

export default CurrentUser;
