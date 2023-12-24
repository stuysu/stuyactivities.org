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
	  memberships {
      id
      user {
        id
        name
        firstName
        lastName
        email
        isFaculty
        fourDigitId
      }
      role
      adminPrivileges
    }
	  updates {
      title
      content
    }
	  meetings {
      id
      title
      description
      start
      end
      privacy
      rooms {
        id
        name
        floor
        approvalRequired
      }
    }
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

	return (
		<Box sx={classes.mainDiv}>
			<OrganizationPicker setOrgId={setOrgId} />
		</Box>
	)
}

export default ManageClubs