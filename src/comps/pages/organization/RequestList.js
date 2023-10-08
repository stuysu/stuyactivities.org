import React, { useState } from "react";
import {
	Avatar,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	Typography,
	CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const RequestList = ({ requests, reject, approve }) => {
  const [isLoading, setLoading] = useState(false);

  const approveHandle = async (request) => {
    setLoading(true);
    try {
      await approve(request);
    } finally {
      setLoading(false);
    }
  };

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
						{isLoading ? ( <CircularProgress size="large"/> ) : ( <>
					{request.userApproval && (
						<IconButton
							onClick={() => approveHandle(request)}
							size="large">
						<CheckIcon/>
						</IconButton>
					)}
					<IconButton onClick={() => reject(request)} size="large">
					<CloseIcon/>
					</IconButton>
              </>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
export default RequestList;