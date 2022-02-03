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
import { gql, useQuery, useMutation } from "@apollo/client";

const ITEMS = gql`
	query {
		saleItems {
			id
			item
			price
		}
	}
`;

const RECORD = gql`
	mutation ($userId: Int!, $purchases: [Int!]!, $counts: [Int!]!) {
		recordSales(userId: $userId, purchases: $purchases, counts: $counts)
	}
`;

export default function Boograms() {
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const {
		// loading,
		// error,
		data
	} = useQuery(ITEMS);

	const empty = data
		? {
				//array from 0 to N
				purchases: Array.from({ length: data.saleItems.length }, (_, i) => i + 1),
				counts: new Array(data.saleItems.length).fill(0)
		  }
		: null;

	const [args, setArgs] = React.useState(empty);

	if (data && args === null) {
		setArgs(empty);
	}

	const setCount = (i, count) => {
		let newCounts = args.counts.slice();
		newCounts[i] = count;
		setArgs({ ...args, counts: newCounts });
	};

	const [record, { error }] = useMutation(RECORD, {
		onCompleted() {
			setArgs(empty);
			setSnackbarOpen(true);
		},
		onError(err) {
			setDialogOpen(true);
		}
	});

	const isValid = ({ userId, counts }) => userId && counts.some(c => c > 0);

	return (
		<div style={{ width: 1200, maxWidth: "90vw", margin: "auto" }}>
			<div style={{ marginTop: "2.5rem" }}>
				<Typography variant={"h3"} mt={"2pt"}>
					Boogram Sales
				</Typography>
				<br />
				{args?.user ? (
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
							{data?.saleItems.map(item => (
								<>
									<TextField
										label={`${item.item} - $${item.price}`}
										type="number"
										onChange={ev => setCount(item.id, Number(ev.target.value))}
									/>
									<br />
								</>
							))}
							<br />
							<Button
								color="primary"
								disabled={!isValid(args)}
								onClick={() => record({ variables: shrink(args) })}
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
						<DialogContentText>{error?.message}</DialogContentText>
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
