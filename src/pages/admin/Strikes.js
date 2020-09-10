import React from "react";
import { gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import SearchBox from "../../comps/pages/catalog/filters/SearchBox";
import CatalogListCard from "../../comps/pages/catalog/CatalogListCard";
import { Grid } from "@material-ui/core";
import CatalogCard from "../../comps/pages/catalog/CatalogCard";

const useStyles = makeStyles(() => ({}));

const QUERY = gql`
	query Organizations($keyword: String) {
		organization(keyword: $keyword, limit: 50) {
			id
			name
			strikes
		}
	}
`;

const GIVE = gql`
	mutation createStrike($orgId: Int) {
		createStrike(orgId: $orgId) {
			weight
			reason
		}
	}
`;

const Strikes = () => {
	const classes = useStyles();
	const [keyword, setKeyword] = React.useState("");

	return (
		<div>
			<SearchBox setKeyword={setKeyword} keyword={keyword} />
			<Grid
				container
				alignContent={"flex-start"}
				alignItems={"flex-start"}
			>
				{data?.organizations?.map(org => (
					<CatalogListCard key={org.id} {...org} />
				))}
			</Grid>
		</div>
	);
};

export default Strikes;
