import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../../comps/ui/Loading";
import PromotedClubCard from "../../comps/pages/explore/PromotedClubCard";

const QUERY = gql`
  query GetPromotedClubs {
    promotedClubs: promotedClubs {
      id
      blurb
      organization {
        id
        name
        url
        charter {
          id
          picture {
            url
            thumbnail(width: 80, height: 80)
          }
        }
      }
    }
  }
`

const useStyles = makeStyles({
	newPromotion: {
		margin: "0.5rem 0 1rem"
	},
  deletePromotion: {
    margin: "0.5rem 0 0"
  }
});

const ManagePromotedClubs = () => {
  const {data, loading, refetch} = useQuery(QUERY);
  const classes = useStyles();
  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <div>
      <Typography variant={"h3"}>Add New Featured Club:</Typography>
      <div className={classes.newPromotion}>
      </div>
      <Typography variant={"h3"}>Delete Featured Club:</Typography>
      <div className={classes.deletePromotion}>
        {(data === undefined || data.promotedClubs.length === 0) ? (
          <Typography>No featured clubs currently.</Typography>
        ) : (
          data.promotedClubs.map(promotedClub => (
            <PromotedClubCard {...promotedClub} showDelete={true} refetch={refetch} />
          ))
        )}
      </div>
    </div>
  );
}

export default ManagePromotedClubs;
