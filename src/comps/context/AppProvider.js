import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import AppContext from "./AppContext";

const basicInfo = gql`
	query {
		signedInUser {
			firstName
			lastName
			email
		}
	}
`;
const AppProvider = props => {
	const { loading, data, error, refetch } = useQuery(basicInfo);

	let value = {
		signedIn: false,
		refetch,
	};

	console.log(data);

	if (data?.signedInUser) {
		const { firstName, lastName, email } = data.signedInUser;

		value = {
			signedIn: true,
			firstName,
			lastName,
			email,
			refetch,
		};
	}

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppProvider;
