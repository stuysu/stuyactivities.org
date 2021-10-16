import React from "react";
import UserSelect from "../../comps/ui/UserSelect";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Snackbar,
	Typography,
	TextField
} from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";

const RECORD = gql`
	mutation ($userId: Int!, $oneDollarCount: Int!, $twoDollarCount: Int!) {
		recordBoogramPurchase(userId: $userId, oneDollarCount: $oneDollarCount, twoDollarCount: $twoDollarCount)
	}
`;

export default function Boograms() {
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [args, setArgs] = React.useState({ oneDollarCount: 0, twoDollarCount: 0 });

	const [record, { error }] = useMutation(RECORD, {
		onCompleted() {
			setArgs({ oneDollarCount: 0, twoDollarCount: 0 });
			setSnackbarOpen(true);
		},
		onError() {
			setDialogOpen(true);
		}
	});

	const isValid = ({ userId, oneDollarCount, twoDollarCount }) =>
		userId && (oneDollarCount > 0 || twoDollarCount > 0);

	return (
		<div style={{ width: 1200, maxWidth: "90vw", margin: "auto" }}>
			<div style={{ marginTop: "2.5rem" }}>
				<Typography variant={"h3"} mt={"2pt"}>
					Boogram Sales
				</Typography>
				<br />

				{args.user ? (
					<>
						Purchaser:
						<br />
						<br />
						<div>
							<Typography>{args.user.name}</Typography>
							<Typography color={"textSecondary"} variant={"subtitle2"}>
								{args.user.email}
							</Typography>
							<br />
							<TextField
								label="$1 Candy"
								type="number"
								onChange={ev => setArgs({ ...args, oneDollarCount: Number(ev.target.value) })}
							/>
							<br />
							<TextField
								label="$2 Candy"
								type="number"
								onChange={ev => setArgs({ ...args, twoDollarCount: Number(ev.target.value) })}
							/>
							<br />
							<br />
							<Button
								color="primary"
								disabled={!isValid(args)}
								onClick={() => record({ variables: args })}
							>
								Record
							</Button>
						</div>
					</>
				) : (
					<>
						Select Purchaser:
						<br />
						<br />
						<UserSelect
							onChange={(_ev, user) => {
								setArgs({ user, userId: user.id, ...args });
							}}
						/>
					</>
				)}
				<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
					<DialogTitle>Something went wrong...</DialogTitle>
					<DialogContent>
						<DialogContentText>{error}</DialogContentText>
					</DialogContent>
				</Dialog>
				<Snackbar
					autoHideDuration={1000}
					open={snackbarOpen}
					onClose={() => setSnackbarOpen(false)}
					message={"Success!"}
				/>
			</div>
		</div>
	);
}
