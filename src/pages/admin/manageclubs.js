import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { useState } from "react";
import OrganizationPicker from "../../comps/ui/OrganizationPicker";

const classes = {
	mainDiv: {
		width: "1200px",
		maxWidth: "90%",
		margin: "auto"
	}
};

const QUERY = gql`
query ($id: Int!) {
	organization: organizationById(id: $id) {
	  id
	  name
	  url
	  memberships
	  updates
	  groups
	  meetings
	}
  }
`

const ManageClubs = () => {

	const [orgId, setOrgId] = useState(0)
	const { data, loading } = useQuery(QUERY, {
		variables: {
			id: orgId
		}
	})

	// console.log(data.organization)

	return (
		<Box sx={classes.mainDiv}>
			<OrganizationPicker setOrgId={setOrgId} />
		</Box>
	)
}

export default ManageClubs