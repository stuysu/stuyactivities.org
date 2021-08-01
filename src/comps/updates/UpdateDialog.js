import React from "react";
import Dialog from "@material-ui/core/Dialog";
import UpdateCard from "./UpdateCard";

const UpdateDialog = ({ open, setOpen }) => {
	return (
		<div>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<UpdateCard limit={false}></UpdateCard>
			</Dialog>
		</div>
	);
};

export default UpdateDialog;
