import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { gql, useQuery } from "@apollo/client";
import Loading from "../ui/Loading";
import { Typography, useMediaQuery } from "@material-ui/core";
import UpdateCard from "../updates/UpdateCard";
import Masonry from "react-masonry-css";

const QUERY = gql`
	query($userId: Int!) {
		updates: userUpdates(userId: $userId) {
			id
			title
			content
			createdAt
			links {
				id
				title
				url
				description
				siteName
				image
			}
			pictures {
				id
				defaultUrl
				height
				width
				publicId
			}
			organization {
				id
				name
				url
				charter {
					picture
				}
			}
		}
	}
`;

const UserUpdates = () => {
	const user = useContext(UserContext);
	const isMobile = useMediaQuery("(max-width: 900px)");

	const { data, loading } = useQuery(QUERY, { variables: { userId: user.id } });

	if (loading) {
		return <Loading />;
	}

	return (
		<div>
			<Typography variant={"h4"}>Posts</Typography>
			<Masonry
				breakpointCols={isMobile ? 1 : 2}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{data.updates.map(update => (
					<UpdateCard {...update} />
				))}
			</Masonry>
		</div>
	);
};

export default UserUpdates;
