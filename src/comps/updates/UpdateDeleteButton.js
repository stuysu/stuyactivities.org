import React, { useContext } from "react";
import { IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { gql, useMutation } from "@apollo/client";
import { OrgContext } from "../../pages/org";

const MUTATION = gql`
	mutation ($updateId: Int!) {
		deleteUpdate(updateId: $updateId)
	}
`;

const UpdateDeleteButton = ({ updateId }) => {
	const org = useContext(OrgContext);
	const [deleteUpdate] = useMutation(MUTATION, {
		variables: { updateId },
		update: cache => {
			cache.reset().then(() => org && org.refetch());
		}
	});

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleDelete = () => {
		setAnchorEl(null);
		if (window.confirm("Are you sure you want to delete this update? This is irreversible.")) {
			deleteUpdate().catch(er => alert("There was an issue: " + er.message));
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton onClick={ev => setAnchorEl(ev.target)}>
				<MenuIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				transformOrigin={"center top"}
			>
				<MenuItem onClick={handleDelete}>Delete</MenuItem>
			</Menu>
		</div>
	);
};

export default UpdateDeleteButton;
