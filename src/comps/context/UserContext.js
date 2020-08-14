import React from "react";

const UserContext = React.createContext({
	signedIn: false,
	id: null,
	name: "",
	firstName: "",
	lastName: "",
	email: "",
	picture: "",
	grade: null,
	memberships: []
});

export default UserContext;
