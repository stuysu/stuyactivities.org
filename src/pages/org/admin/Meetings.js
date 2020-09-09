import React from "react";
import { Typography } from "@material-ui/core";
import underConstruction from "./../../../img/vectors/kingdom-under-construction.svg";

const Meetings = ({ match }) => {
	return (
		<div style={{ padding: "1rem", textAlign: "center" }}>
			<Typography variant={"h4"}>Meetings</Typography>
			<br />
			<img
				src={underConstruction}
				style={{ width: "300px", maxWidth: "70vw" }}
				alt={"This part of the page is under construction"}
			/>
			<p>
				We're currently working on this page but we expect to have it up
				sometime this week.
			</p>
		</div>
	);
};

export default Meetings;
