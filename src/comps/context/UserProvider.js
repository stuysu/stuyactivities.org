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
						picture {
							thumbnail(width: 80, height: 80)
							tinyThumbnail: thumbnail(width: 40, height: 40)
							url
						}
					}
				}
				adminPrivileges
				meetingNotification
				updateNotification
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
		window.localStorage.clear();
		window.location.reload();
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
