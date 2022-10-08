import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BeforeYouStart = () => {
	return (
		<div>
			<Typography paragraph>
				Before you begin the chartering process, make sure to read through the{" "}
				<Link to={"/rules"}>Clubs & Pubs Rules</Link>, which all Activities must follow.
			</Typography>

			<Typography paragraph>
				Once you’re confident that your Activity abides by all the regulations, log in to your StuyActivities
				account (You've already done that!) and fill out the Chartering form below. Keep in mind that your
				charter will be public, so do your best to provide helpful, substantive responses to the questions, and
				avoid including confusing, inappropriate, or incorrect information.
			</Typography>

			<Typography paragraph>
				Once you’ve submitted your club’s charter, please allow up to two weeks for SU Clubs & Pubs
				Administrators to review your charter. Unless there are any issues with your charter (i.e. lack of
				compliance with the rules or unclear submissions) the SU Admins will approve it. Once your activity is
				approved, it will appear in the StuyActivities Catalog, and you can begin adding members and scheduling
				meetings. If you have any questions or concerns regarding the chartering process, please reach out to us
				at clubpub@stuysu.org. Happy chartering!
			</Typography>
		</div>
	);
};

export default BeforeYouStart;
