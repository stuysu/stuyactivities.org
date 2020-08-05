import React from "react";
import { useParams } from "react-router-dom";

const CharterTab = () => {
	const { url } = useParams();

	// Get the charter fields using a graphql query and display them below

	return <div>{url}</div>;
};

export default CharterTab;
