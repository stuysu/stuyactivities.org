import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import EmailBodyEditor from "../../comps/pages/admin/EmailBodyEditor";
import Button from "@material-ui/core/Button";
import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
	mutation ($subject: String!, $body: String!) {
		emailClubLeaders(subject: $subject, body: $body)
	}
`;

const EmailClubLeaders = () => {
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [send, { loading }] = useMutation(MUTATION, { variables: { body, subject } });

	const sendEmail = async () => {
		const confirmation = window.confirm("Are you sure you want to send the email as-is?");
		if (!confirmation) {
			return;
		}

		try {
			await send();
			alert("The email was successfully sent");
		} catch (e) {
			alert("There was an error sending the email: " + e.message);
		}
	};

	return (
		<div style={{ width: 1200, maxWidth: "90vw", margin: "auto" }}>
			<div style={{ marginTop: "2.5rem" }}>
				<TextField
					variant={"outlined"}
					color={"primary"}
					onChange={ev => setSubject(ev.target.value)}
					value={subject}
					label={"Email Subject"}
					fullWidth
				/>
				<EmailBodyEditor value={body} setValue={val => setBody(val)} />
				<br />
				<Button variant={"contained"} color={"secondary"} onClick={sendEmail} disabled={loading}>
					Send Email
				</Button>
			</div>
		</div>
	);
};

export default EmailClubLeaders;
