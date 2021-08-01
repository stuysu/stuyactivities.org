import { gql, useQuery } from "@apollo/client";
import { Typography, useMediaQuery } from "@material-ui/core";
import React, { useContext } from "react";
import Masonry from "react-masonry-css";
import { client } from "../context/ApolloProvider";
import UserContext from "../context/UserContext";
import Loading from "../ui/Loading";
import UpdateCard from "../updates/UpdateCard";

const QUERY = gql`
	query ($userId: Int!) {
		updates: userUpdates(userId: $userId) {
			id
			title
			content
			createdAt
			organization {
				id
				name
				url
				charter {
					picture {
						thumbnail(width: 40, height: 40)
					}
				}
			}
		}
	}
`;

const UserUpdates = () => {
	const user = useContext(UserContext);
	const isMobile = useMediaQuery("(max-width: 900px)");

	const { data, loading } = useQuery(QUERY, { variables: { userId: user.id }, client });

	if (loading) {
		return <Loading />;
	}

	return (
		<div
			style={{
				marginTop: "2rem"
			}}
		>
			<Typography variant={"h3"} color={"primary"}>
				Posts
			</Typography>
			<br />

			<Masonry
				breakpointCols={isMobile ? 1 : 2}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{data.updates.map(update => (
					<UpdateCard {...update} key={update.id} />
				))}
			</Masonry>
			{!data.updates.length && (
				<Typography paragraph>None of your organizations have posted any updates yet.</Typography>
			)}
		</div>
	);
};

export default UserUpdates;
