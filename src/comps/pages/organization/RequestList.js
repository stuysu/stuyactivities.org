import {
	Avatar,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	Typography
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const RequestList = ({ requests, reject, approve }) => {
	return (
		<List>
			{requests?.map(request => (
				<ListItem>
					<ListItemAvatar>
						<Avatar src={request.user.picture} />
					</ListItemAvatar>
					<Grid container alignItems={"center"}>
						<Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
							<Typography>{request.user.name}</Typography>
							<Typography color={"textSecondary"} variant={"subtitle2"}>
								{request.user.email}
							</Typography>
						</Grid>
						<Grid item xl={8} lg={8} md={6} sm={6} xs={12}>
							<Typography>
								Desired Role: "{request.role}" {request.adminPrivileges ? "(wants admin)" : ""}
							</Typography>
							<Typography>
								Message: "{request.userApproval ? request.userMessage : request.adminMessage}"
							</Typography>
						</Grid>
					</Grid>
					<ListItemSecondaryAction>
						{request.userApproval ? (
							<IconButton onClick={() => approve(request)}>
								<CheckIcon />
							</IconButton>
						) : (
							""
						)}
						<IconButton onClick={() => reject(request)}>
							<CloseIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	);
};
export default RequestList;
