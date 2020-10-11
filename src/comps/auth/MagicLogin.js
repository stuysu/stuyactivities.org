import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FlexCenter from "../ui/FlexCenter";
import Button from "@material-ui/core/Button";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import {client} from "../context/ApolloProvider";

const useStyles = makeStyles({
	formFieldContainer: {
		width: "400px",
		maxWidth: "90vw",
		padding: "1rem",
		marginBottom: "0.5rem"
	},
	inputField: {
		marginBottom: "1rem"
	},
	forgotPass: {
		cursor: "pointer",
		textDecoration: "underline"
	},
	resendText: {
		marginTop: "0.5rem",
		marginBottom: "1.5rem",
		textDecoration: "underline",
		cursor: "pointer"
	}
});

const MUTATION = gql`
	mutation RequestToken($email: String!) {
		requestLoginToken(email: $email)
	}
`;

export default function MagicLogin() {
	const classes = useStyles();
	const [email, setEmail] = React.useState("");
	const [success, setSuccess] = React.useState(false);
	const [requestToken, {error, loading}] = useMutation(MUTATION, {
		client
	});

	const handleSubmit = async () => {
		if (!email) {
			return;
		}

		try {
			await requestToken({variables: {email}});
			setSuccess(true);
		} catch (er) {
		}
	};

	return (
		<FlexCenter>
			{success ? (
				<div>
					<Typography>
						An email has been sent to <b>{email}</b>!
					</Typography>

					<Typography className={classes.resendText} onClick={() => setSuccess(false)}>
						Click here to resend the email
					</Typography>
				</div>
			) : (
				<div className={classes.formFieldContainer}>
					<TextField
						variant={"outlined"}
						value={email}
						label={"Email Address"}
						onChange={ev => setEmail(ev.target.value)}
						fullWidth
						placeholder={"email@schools.nyc.gov"}
						className={classes.inputField}
						required
					/>

					<FlexCenter>
						<Button
							onClick={handleSubmit}
							variant={"contained"}
							color={"secondary"}
							fullWidth
							disabled={loading}
						>
							<span role={"img"} aria-label={"sparkles"}>
								&#10024;
							</span>
							&nbsp; Send Magic Sign In Link &nbsp;
							<span role={"img"} aria-label={"sparkles"}>
								&#10024;
							</span>
						</Button>
					</FlexCenter>
					{error && (
						<Typography color={"error"} display={"block"}>
							{error?.graphQLErrors?.[0]?.message || error?.message || "Unknown error"}
						</Typography>
					)}
				</div>
			)}
		</FlexCenter>
	);
}
