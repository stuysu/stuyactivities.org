import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FlexCenter from "../ui/FlexCenter";
import { triggerReportDialog } from "./ReportDialog";
import fixingBugs from "./../../img/vectors/fixing-bugs.svg";
import TextField from "@mui/material/TextField";
import UserContext from "../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_KEY } from "../../constants";
import Button from "@mui/material/Button";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
const classes = {
	appBar: {
		position: "relative",
		boxShadow: "none"
	},
	title: {
		marginLeft: 2,
		flex: 1
	},
	pageContainer: {
		padding: 3,
		width: "700px",
		maxWidth: "90vw"
	},
	backButtonContainer: {
		textAlign: "left",
		marginLeft: "10vw"
	},
	vector: {
		width: "80%",
		maxWidth: "250px"
	},
	vectorContainer: {
		textAlign: "center"
	},
	textField: {
		margin: "0.6rem 0"
	},
	submitButton: {
		margin: "1rem 0"
	}
};

const MUTATION = gql`
	mutation ($title: String!, $description: String!, $email: String!, $captchaToken: String!, $path: String!) {
		createHelpRequest(
			email: $email
			title: $title
			description: $description
			captchaToken: $captchaToken
			path: $path
		) {
			id
			title
			description
			captchaToken
			path
			createdAt
		}
	}
`;

const ReportContent = () => {
	const user = useContext(UserContext);
	const location = useLocation();
	const [email, setEmail] = useState(user?.email || "");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [captchaToken, setCaptchaToken] = useState("");
	const [submit, { data, error, loading }] = useMutation(MUTATION, {
		variables: {
			email,
			title,
			description,
			captchaToken,
			path: location.pathname
		}
	});

	const onSubmit = () => {
		submit().catch(() => {});
	};

	return (
		<div>
			<AppBar sx={classes.appBar} color={"secondary"} enableColorOnDark>
				<Toolbar>
					<Typography variant="h6" sx={classes.title}>
						Report an issue or ask for help
					</Typography>
					<IconButton
						edge="end"
						color="inherit"
						onClick={() => triggerReportDialog(false)}
						aria-label="close"
						size="large"
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<FlexCenter>
				<div sx={classes.pageContainer}>
					<div sx={classes.vectorContainer}>
						<Box component="img" src={fixingBugs} alt={"Someone fixing bugs"} sx={classes.vector} />
					</div>

					{data ? (
						<>
							<Typography align={"center"} paragraph color={"secondary"}>
								Your request has been submitted. We'll be in touch!
							</Typography>
						</>
					) : (
						<>
							<TextField
								label={"Your Email"}
								value={email}
								onChange={ev => setEmail(ev.target.value)}
								variant={"outlined"}
								disabled={user.signedIn}
								fullWidth
								sx={classes.textField}
								helperText={"We'll contact you at this email if we need to"}
							/>

							<TextField
								label={"What's wrong?"}
								placeholder={"e.g. Charter submit button isn't working"}
								value={title}
								onChange={ev => setTitle(ev.target.value)}
								variant={"outlined"}
								fullWidth
								helperText={"Try to summarize the issue in a sentence or less"}
								sx={classes.textField}
							/>

							<TextField
								label={"Provide some more information"}
								placeholder={
									"e.g. I'm submitting the charter for StuySU and when I hit the submit button, the page goes blank. I'm using Safari on a MacBook Air running macOS 10.15."
								}
								value={description}
								variant={"outlined"}
								multiline
								rows={5}
								helperText={
									"The more information you can provide the better. Things to include might be what browser you're using as well as the device and what actions you took leading up to the issue."
								}
								fullWidth
								onChange={ev => setDescription(ev.target.value)}
								sx={classes.textField}
							/>

							<ReCAPTCHA sitekey={CAPTCHA_KEY} onChange={setCaptchaToken} />

							{error && (
								<Typography variant={"error"} paragraph color={"primary"}>
									{error?.message}
								</Typography>
							)}
							<Button
								variant={"contained"}
								color={"secondary"}
								sx={classes.submitButton}
								disabled={!captchaToken || loading}
								onClick={onSubmit}
							>
								Submit
							</Button>
						</>
					)}
				</div>
			</FlexCenter>
		</div>
	);
};

export default ReportContent;
