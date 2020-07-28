import React from "react";
import { useParams } from "react-router-dom";

const CharterTab = () => {
	const params = useParams();
	const url = params.url;
	// Get the charter fields using a graphql query and display them below

	return <div></div>;
};

export default CharterTab;
