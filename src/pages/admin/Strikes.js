import React from "react";
import { gql } from "@apollo/client";
import SearchBox from "../../comps/pages/catalog/filters/SearchBox";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import StrikeCard from "../../comps/pages/admin/StrikeCard";
import { client } from "../../comps/context/ApolloProvider";
import UserContext from "../../comps/context/UserContext";

const QUERY = gql`
	query Organizations($keyword: String) {
		organizations(keyword: $keyword, limit: 50) {
			id
			name
			url
			active
			tags {
				name
			}
			charter {
				picture
				mission
				commitmentLevel
			}
		}
	}
`;

const Strikes = () => {
	const [keyword, setKeyword] = React.useState("");

	const {
		error,
		data
		// refetch
	} = useQuery(QUERY, {
		variables: { keyword },
		client
	});

	const user = React.useContext(UserContext);

	if (!user?.adminRoles?.map(e => e.role).includes("strikes")) {
		return <p>You do not have the proper admin role to access this page!</p>;
	}
	if (error) return <p>There was an error loading this page</p>;

	return (
		<div>
			<SearchBox setKeyword={setKeyword} keyword={keyword} />
			<Grid container alignContent={"flex-start"} alignItems={"flex-start"}>
				{data?.organizations?.map(org => (
					<StrikeCard key={org.id} {...org} />
				))}
			</Grid>
		</div>
	);
};

export default Strikes;
