import React from 'react';
import { Typography }from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query FindOrganization($keyword: String!){
    organizations(keyword: $keyword){
      id
      name
    }
  }
`

const OrganizationPicker = (orgId, setOrgId) => {
  const{orgName, setOrgName} = React.useState("");
  const findOrganization = (keyword) => {
    const {data, loading} = useQuery(QUERY);
    updatePicker();
  };
  return (
    <div>
      <div>
        <Typography variant={"h5"}>Currently Selected Club: </Typography>
        {orgId === 0 ? (
          <Typography>No organization selected.</Typography>
        ) : (
          <Typography>{orgName}</Typography>
        )}
      </div>
    </div>
  );
}

export default OrganizationPicker;
