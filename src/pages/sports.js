import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import BackButton from "../comps/ui/BackButton";

const useStyles = makeStyles(theme => ({

}));

const Sports = () => {
	const classes = useStyles();
	
	return (
		<div>
			<BackButton to={"/"} label={"Back To Home"} />
			<Typography>Sports Page</Typography>
		</div>
	);
};

export default Sports;