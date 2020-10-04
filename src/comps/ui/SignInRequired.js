import React from "react";

import accessBlocked from "./../../img/vectors/ginger-cat-access-blocked.svg";
import FlexCenter from "./FlexCenter";
import { Button, Typography } from "@material-ui/core";
import { triggerLoginDialog } from "../auth/AuthDialog";

const SignInRequired = () => {
	return (
		<FlexCenter>
			<div>
				<img
					src={accessBlocked}
					alt={"Cat in front of a computer"}
					style={{ width: "400px", maxWidth: "80vw" }}
				/>
				<Typography paragraph style={{ textAlign: "center" }}>
					You need to be signed in to access this page.
				</Typography>
				<FlexCenter>
					<Button color={"secondary"} variant={"contained"} onClick={() => triggerLoginDialog()}>
						Sign In
					</Button>
				</FlexCenter>
			</div>{" "}
		</FlexCenter>
	);
};

export default SignInRequired;
