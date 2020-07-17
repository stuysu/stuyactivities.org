import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import AppContext from "./AppContext";

const basicInfo = gql`
	query {
		signedInUser {
			name
			firstName
			lastName
			email
			picture
			grade
		}
	}
`;

const logoutQuery = gql`
	mutation {
		logout
	}
`;

const AppProvider = props => {
	const { loading, data, error, refetch } = useQuery(basicInfo);

	const [performLogout] = useMutation(logoutQuery);

	const logout = async () => {
		await performLogout();
		await refetch();
	};

	let value = {
		signedIn: false,
		refetch
	};

	if (data?.signedInUser) {
		value = {
			signedIn: true,
			refetch,
			logout,
			...data.signedInUser
		};
	}

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppProvider;
