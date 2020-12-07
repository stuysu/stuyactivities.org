import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import UserContext from "./UserContext";

const basicInfo = gql`
	query {
		authenticatedUser {
			id
			name
			firstName
			lastName
			email
			picture
			grade
			fourDigitId
			isFaculty
			memberships {
				id
				role
				organization {
					id
					name
					url
					charter {
						picture
					}
				}
				adminPrivileges
			}
			adminRoles {
				id
				role
			}
		}
	}
`;

const logoutQuery = gql`
	mutation {
		logout
	}
`;

const UserProvider = props => {
	const {
		// loading,
		// error,
		data,
		refetch
	} = useQuery(basicInfo);

	const [performLogout] = useMutation(logoutQuery);

	const logout = async () => {
		await performLogout();
		await refetch();
	};

	let value = {
		signedIn: false,
		refetch
	};

	if (data?.authenticatedUser) {
		value = {
			signedIn: true,
			refetch,
			logout,
			...data.authenticatedUser
		};
	}

	return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
