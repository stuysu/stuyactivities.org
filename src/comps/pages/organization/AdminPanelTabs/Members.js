import React from "react";
import {
	Button,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	}
}));

const QUERY = gql`
	query Memberships($url: String!) {
		memberships(orgUrl: $url) {
			user {
				name
				email
			}
			role
			adminPrivileges
		}
	}
`;

export default function Members({ match }) {
	const classes = useStyles();
	const { data } = useQuery(QUERY, {
		variables: { url: match.params.orgUrl }
	});
	return (
		<TableContainer component={Paper} className={classes.margin}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Admin?</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.memberships?.map(membership => (
						<TableRow>
							<TableCell>{membership.user.name}</TableCell>
							<TableCell>{membership.user.email}</TableCell>
							<TableCell>{membership.role}</TableCell>
							<TableCell>
								{membership.adminPrivileges ? "Yes" : "No"}
							</TableCell>
							<TableCell>
								<Button color="primary">
									Promote to Admin
								</Button>
								<Button color="primary">Change Role</Button>
								<Button color="primary">Remove</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
