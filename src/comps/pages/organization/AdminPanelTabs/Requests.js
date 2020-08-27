import React from "react";
import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Button} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	}
}))

const QUERY = gql`
	query MembershipRequests($url: String!){
		membershipRequests (orgUrl: $url) {
			user {
				name
				email
			}
			role
			adminPrivileges
			userMessage
			adminMessage
			userApproval
			adminApproval
		}
	}
`

export default function Members({match}) {
	const classes = useStyles()
	const {data} = useQuery(QUERY, {variables: {url: match.params.orgUrl}})
	return (
		<TableContainer component={Paper} className={classes.margin}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Type</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Requested Role</TableCell>
						<TableCell>Requested Admin?</TableCell>
						<TableCell>Request Message</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.membershipRequests?.map(request =>
						<TableRow>
							<TableCell>
								{request.userApproval ? "Incoming" : "Outgoing"
								/* assumes if both adminApproval and userApproval are set it is removed. If userApproval is false, then adminApproval must be true */}
							</TableCell>
							<TableCell>{request.user.name}</TableCell>
							<TableCell>{request.user.email}</TableCell>
							<TableCell>{request.role}</TableCell>
							<TableCell>{request.adminPrivileges ? "Yes" : "No"}</TableCell>
							<TableCell>{request.userApproval ? request.userMessage : request.adminMessage}</TableCell>
							<TableCell>
								{request.userApproval ? <Button color="primary">Approve</Button> : ""}
								<Button color="primary">Remove</Button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
