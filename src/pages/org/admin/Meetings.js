import React from "react";
import { Typography } from "@material-ui/core";
import FlexCenter from "../../../comps/ui/FlexCenter";
import Button from "@material-ui/core/Button";

const Meetings = ({ match }) => {
	return (
		<FlexCenter>
			<div>
				<Typography variant={"h4"}>Meetings</Typography>
				<Button variant={"contained"} color={"secondary"}>
					Create Meeting
				</Button>
			</div>
		</FlexCenter>
	);
};

export default Meetings;
