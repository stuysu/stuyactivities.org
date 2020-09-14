import React from "react";
import {gql, useMutation} from "@apollo/client";
import SearchBox from "../../comps/pages/catalog/filters/SearchBox";
import { Grid } from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import StrikeCard, {StrikeFormContext} from "../../comps/pages/admin/StrikeCard";
import {client} from "../../comps/context/ApolloProvider";

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

const MUTATION = gql`
	mutation createStrike(
		$orgId: Int
		$weight: Int!
		$reason: String!
	) {
		createStrike(
			orgId: $orgId
			weight: $weight
			reason: $reason
		)
	}
`;

const Strikes = () => {
	const form = React.useContext(StrikeFormContext);
	const [keyword, setKeyword] = React.useState("");

	const {
		error,
		data
		// refetch
	} = useQuery(QUERY, {
		variables: {keyword},
		client
	});

	const [submit] = useMutation(MUTATION, {
		variables: {

		}
	});

	if (error) return <p>There was an error loading this page</p>;

	return (
		<div>
			<SearchBox setKeyword={setKeyword} keyword={keyword} />
			<Grid
				container
				alignContent={"flex-start"}
				alignItems={"flex-start"}
			>
				{data?.organizations?.map(org => (
					<StrikeCard key={org.id} {...org} />
				))}
			</Grid>
		</div>
	);
};

export default Strikes;
