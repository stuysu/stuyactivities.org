import React from "react";
import { Link } from "@mui/material";

const EmailLink = ({ email }) => (
	<Link color="secondary" href={`mailto:${email}`}>
		{email}
	</Link>
);

export default EmailLink;
