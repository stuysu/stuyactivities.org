import React from "react";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
	mutation ($promotionId: Int!) {
		deletePromotedClub(promotedClubId: $promotionId)
	}
`;

const PromotedClubDeleteButton = ({ promotionId, refetch }) => {
	const [deletePromotion] = useMutation(MUTATION, {
		variables: { promotionId },
		update(cache) {
			cache.reset();
			refetch();
		}
	});

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleDelete = () => {
		setAnchorEl(null);
		if (window.confirm("Are you sure you want to delete this promotion? This is irreversible.")) {
			deletePromotion().catch(er => alert("There was an issue: " + er.message));
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton onClick={ev => setAnchorEl(ev.target)} size="large">
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

export default PromotedClubDeleteButton;
