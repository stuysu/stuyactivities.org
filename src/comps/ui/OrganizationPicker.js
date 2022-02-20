import React from 'react';
import { Typography, TextField }from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query FindOrganization($keyword: String!){
    organizations(keyword: $keyword, limit: 15){
      id
      name
    }
  }
`

const OrganizationPicker = ({ setOrgId }) => {
  const [orgName, setOrgName] = React.useState("");
  const [keyword, setKeyword] = React.useState("");
  const {data, loading} = useQuery(QUERY, {
    variables: {keyword}
  });
  const options = data === undefined ? [] : data.organizations;
  return (
    <div>
      <Typography variant={"h5"}>Currently Selected Club: </Typography>
      <div>
        {orgName === "" ? <Autocomplete
            options={options}
            value={null}
            getOptionLabel={_ => ""}
            renderOption={option => <span>{option.name}</span>}
            onChange={(ev, newvalue) => {
              setOrgName(newvalue.name);
              setOrgId(newvalue.id);
            }}
            loading={loading}
            filterOptions={f => f}
            renderInput={params => (
              <TextField
                {...params}
                required = {true}
                label = "Find Organization"
                variant = "outlined"
                value = {keyword}
                onChange = {ev => setKeyword(ev.target.value)}
              />
            )}
        /> : 
        <Typography variant={"h5"}>{orgName}</Typography>}
      </div>
    </div>
  );
}

export default OrganizationPicker;
