import React from "react";
import UserContext from "./context/UserContext";

function CurrentUser() {
	const user = React.useContext(UserContext);

	if (!user.signedIn) {
		return <p>not signed in</p>;
	}

	return <div>Hi there {user.firstName}!</div>;
}

export default CurrentUser;
