import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { OrgContext } from "../index";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import { Avatar, Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import capitalizeString from "../../../utils/capitalizeString";
import Typography from "@material-ui/core/Typography";
import { CharterFormContext } from "../../charter";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import SmartCharterQuestion from "../../../comps/pages/charter/SmartCharterQuestion";
import TextField from "@material-ui/core/TextField";
import arrayToggle from "../../../utils/arrayToggle";
import { cache } from "../../../comps/context/ApolloProvider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Linkify from "linkifyjs/react";
import Link from "@material-ui/core/Link";

// THIS FILE IS UNCOMFORTABLY HUGE
// TODO WHEN WE HAVE MORE TIME: EXPORT CODE INTO SEPARATE COMPONENTS

const QUERY = gql`
	query($orgId: Int!) {
		charter(orgId: $orgId) {
			mission
			picture
			purpose
			benefit
			appointmentProcedures
			uniqueness
			meetingSchedule
			meetingDays
			commitmentLevel
			extra
			keywords
			updatedAt
		}
		charterEdits(orgId: $orgId) {
			alteredFields
			mission
			picture
			purpose
			benefit
			appointmentProcedures
			uniqueness
			meetingSchedule
			meetingDays
			commitmentLevel
			extra
			createdAt
			keywords
			submittingUser {
				name
				email
			}
			status
			reviewer {
				name
				email
			}
		}
	}
`;

const SAVE_MUTATION = gql`
	mutation(
		$orgId: Int!
		$mission: String
		$purpose: String
		$benefit: String
		$appointmentProcedures: String
		$uniqueness: String
		$meetingSchedule: String
		$meetingDays: [String!]
		$commitmentLevel: String
		$keywords: [String!]
		$extra: String
		$picture: Upload
	) {
		alterCharter(
			orgId: $orgId
			force: true
			charter: {
				mission: $mission
				purpose: $purpose
				benefit: $benefit
				appointmentProcedures: $appointmentProcedures
				uniqueness: $uniqueness
				meetingSchedule: $meetingSchedule
				meetingDays: $meetingDays
				commitmentLevel: $commitmentLevel
				keywords: $keywords
				extra: $extra
				picture: $picture
			}
		) {
			id
		}
	}
`;

const SaveButton = ({ disabled }) => {
	const org = React.useContext(OrgContext);

	const form = React.useContext(CharterFormContext);
	const orgId = org.id;

	const [submit, { loading }] = useMutation(SAVE_MUTATION);

	const onClick = () => {
		const variables = { orgId };

		form.editing.forEach(field => {
			variables[field] = form[field];
		});

		submit({ variables })
			.then(() => cache.reset())
			.then(() => {
				form.set({ editing: [] });
				// org.refetch();
			})
			.catch(console.error);
	};

	return (
		<Button onClick={onClick} color={"primary"} variant={"contained"} disabled={disabled || loading}>
			Save Changes
		</Button>
	);
};

class CharterEditForm extends React.Component {
	constructor(props) {
		super(props);
		this.setState = this.setState.bind(this);
		this.setError = (field, value) => {
			this.setState(state => {
				if (state.errors[field] === value) {
					return null;
				}

				return { errors: { ...state.errors, [field]: value } };
			});
		};

		this.state = {
			set: this.setState,
			setError: this.setError,
			errors: {},
			editing: []
		};

		this.picRef = React.createRef();
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.changePic = this.changePic.bind(this);
	}

	static questions = [
		{
			name: "mission",
			maxChars: 150,
			minChars: 20,
			multiline: true,
			rows: 5,
			label: "Activity Mission",
			helperText: "A quick blurb of what this organization is all about"
		},
		{
			name: "purpose",
			label: "Activity Purpose",
			helperText: `This will serve as the official description of the club. Please include a brief statement about what is expected of general members involved in the club.`,
			minWords: 150,
			maxWords: 400,
			multiline: true,
			rows: 8
		},
		{
			name: "benefit",
			label: "Activity Benefit",
			helperText: "How will this activity benefit the Stuyvesant community? ",
			minWords: 200,
			maxWords: 400,
			multiline: true,
			rows: 8
		},
		{
			name: "appointmentProcedures",
			label: "Appointment Procedures",
			helperText:
				"What are the leadership positions and how are they appointed? Are there any specific protocols members are expected to follow? What is the policy for transfer of leadership between school years?",
			maxWords: 400,
			minWords: 150,
			multiline: true,
			rows: 8
		},
		{
			name: "uniqueness",
			label: "Uniqueness",
			helperText: "What makes your organization unique?",
			maxWords: 400,
			minWords: 75,
			multiline: true,
			rows: 8
		},
		{
			name: "extra",
			required: false,
			label: "What additional things would you like to share about your activity?",
			helperText:
				"(Optional) This information will be public, so if it’s private or a question for the Clubs and Pubs department, please let us know at clubpub@stuysu.org.",
			maxChars: 1000,
			multiline: true,
			rows: 7
		},
		{
			name: "meetingSchedule",
			label: "What's your activity's meeting schedule?",
			helperText: `Something like "Our meeting schedule varies throughout the year, but we meet at least once a month and up to 3 times in the Spring."`,
			minChars: 50,
			maxChars: 1000,
			multiline: true,
			rows: 6
		}
	];

	componentDidUpdate(prevProps, prevState, snapshot) {
		const newResponseFields = Object.keys(this.props.latestChanges);
		if (newResponseFields.length !== Object.keys(prevProps.latestChanges).length) {
			const responses = {};
			newResponseFields.forEach(field => {
				responses[field] = this.props.latestChanges[field].value;
			});
			this.setState(responses);
		}
	}

	changePic() {
		this.picRef.current.click();
	}

	handleFileUpload(ev) {
		const file = ev.target.files[0];

		if (file.size > 5 * 1000 * 1000) {
			this.setError("picture", "The picture must be less than 5MB");
			return;
		}

		if (!file.type.startsWith("image/")) {
			this.setError("picture", "The file uploaded must be a valid picture");
			return;
		}

		this.setState(state => {
			let editing = state.editing;
			if (!state.editing.includes("picture")) {
				editing = [...editing, "picture"];
			}

			return {
				picture: file,
				editing
			};
		});
	}

	render() {
		return (
			<CharterFormContext.Provider value={this.state}>
				<List>
					<ListItem>
						<div
							style={{
								width: "1000px",
								maxWidth: "100%"
							}}
						>
							<Typography>
								Picture -{" "}
								{this.state.editing.includes("picture") ? (
									<span style={{ color: "#7f8c8d" }}>Editing</span>
								) : (
									<span
										style={{
											color:
												this.props.latestChanges?.picture?.status === "approved"
													? "#27ae60"
													: this.props.latestChanges?.picture?.status === "denied"
													? "#e74c3c"
													: "#7f8c8d"
										}}
									>
										{capitalizeString(this.props.latestChanges?.picture?.status || "Not Submitted")}
									</span>
								)}
							</Typography>
							<br />
							<Avatar
								style={{ width: "200px", height: "200px" }}
								src={
									this.state.editing.includes("picture")
										? window.URL.createObjectURL(this.state.picture)
										: this.props.latestChanges?.picture?.value || this.props.org.charter.picture
								}
							/>
							<input
								type={"file"}
								style={{ display: "none" }}
								ref={this.picRef}
								accept="image/*"
								onChange={this.handleFileUpload}
							/>
							{this.state.editing.includes("picture") ? (
								<Button
									onClick={() => {
										this.setState({
											picture:
												this.props.latestChanges?.picture?.value ||
												this.props.org.charter.picture,
											editing: arrayToggle("picture", this.state.editing)
										});
									}}
									color={"secondary"}
								>
									Clear Uploaded Pic
								</Button>
							) : (
								<Button onClick={this.changePic} color={"secondary"} variant={"outlined"}>
									Upload New Picture
								</Button>
							)}
						</div>
					</ListItem>

					{CharterEditForm.questions.map(question => {
						const isEditing = this.state.editing.includes(question.name);

						const status = this.props.latestChanges[question.name]?.status || "Not Submitted";

						let statusColor = "#7f8c8d";

						if (status === "approved") {
							statusColor = "#27ae60";
						}

						if (statusColor === "rejected") {
							statusColor = "#e74c3c";
						}

						return (
							<ListItem>
								<div
									style={{
										width: "1000px",
										maxWidth: "90%"
									}}
								>
									<Typography>
										{question.label} -{" "}
										{isEditing ? (
											<span style={{ color: "#7f8c8d" }}>Editing</span>
										) : (
											<span
												style={{
													color: statusColor
												}}
											>
												{capitalizeString(status)}
											</span>
										)}
									</Typography>
									<br />
									{isEditing ? (
										<SmartCharterQuestion
											{...question}
											fullWidth
											onBlur={() => {
												if (
													this.props.latestChanges[question.name]?.value?.trim() ===
													this.state[question.name]?.trim()
												) {
													this.setState({
														editing: arrayToggle(question.name, this.state.editing)
													});
												}
											}}
										/>
									) : (
										<Typography color={"textSecondary"} variant={"subtitle2"}>
											{this.state[question.name]}
										</Typography>
									)}
								</div>
								{!isEditing && (
									<ListItemSecondaryAction>
										<Button
											onClick={() =>
												this.setState({
													editing: [...this.state.editing, question.name]
												})
											}
										>
											Edit
										</Button>
									</ListItemSecondaryAction>
								)}
							</ListItem>
						);
					})}
				</List>

				<div style={{ textAlign: "right", margin: "1rem" }}>
					<SaveButton
						disabled={
							!this.state.editing.length ||
							!this.state.editing.some(
								field => this.state[field] !== this.props.latestChanges[field]?.value
							)
						}
					/>
				</div>
			</CharterFormContext.Provider>
		);
	}
}

const MESSAGE_QUERY = gql`
	query($orgId: Int!) {
		organization(id: $orgId) {
			charterApprovalMessages {
				id
				user {
					name
					adminRoles {
						role
					}
					picture
				}
				message
				auto
				seen
				createdAt
			}
		}
	}
`;

const CREATE_MESSAGE_MUTATION = gql`
	mutation($orgId: Int!, $message: String!) {
		createCharterApprovalMessage(orgId: $orgId, message: $message) {
			id
		}
	}
`;

const ApprovalMessages = () => {
	const org = React.useContext(OrgContext);
	const { data, refetch } = useQuery(MESSAGE_QUERY, {
		variables: { orgId: org.id }
	});

	const [message, setMessage] = React.useState("");

	const [submitMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
		variables: { message, orgId: org.id }
	});
	const messageRef = React.createRef();

	React.useEffect(() => {
		messageRef.current.scrollTop = messageRef.current.scrollHeight;
	}, [messageRef]);

	const onSubmit = () => {
		submitMessage()
			.then(() => cache.reset())
			.then(() => refetch())
			.then(() => setMessage(""));
	};

	return (
		<>
			<h2>Comments With The ClubPub Department: </h2>
			<div
				style={{
					width: "100%",
					borderRadius: "10px",
					border: "solid 2px black",
					maxHeight: "500px",
					position: "relative",
					overflow: "auto"
				}}
				ref={messageRef}
			>
				<List>
					{data?.organization?.charterApprovalMessages?.map(message => {
						return (
							<ListItem>
								<ListItemAvatar>
									<Avatar src={message?.user?.picture} />
								</ListItemAvatar>
								<div>
									<p
										style={{
											color: message?.auto ? "grey" : "black"
										}}
									>
										{message?.user?.name} -{" "}
										{message?.auto
											? "Automatic Message"
											: message?.user?.adminRoles?.length
											? "ClubPub Team"
											: "Organization Admin"}
									</p>
									<p
										style={{
											fontStyle: message?.auto ? "italic" : "normal",
											color: message?.auto ? "grey" : "black",
											overflowWrap: "anywhere"
										}}
									>
										<Linkify
											options={{
												tagName: "span",
												format: function (value) {
													return (
														<Link href={value} target={"_blank"}>
															{value}
														</Link>
													);
												}
											}}
										>
											{message?.message}
										</Linkify>
									</p>
								</div>
							</ListItem>
						);
					})}
				</List>
				<div
					style={{
						position: "sticky",
						bottom: 0,
						padding: "1rem",
						background: "white",
						verticalAlign: "middle",
						display: "flex"
					}}
				>
					<TextField
						value={message}
						onChange={ev => setMessage(ev.target.value)}
						variant={"outlined"}
						placeholder={"Message for StuyActivities Admins"}
						style={{ flexGrow: 1 }}
					/>
					&nbsp;
					<Button variant={"contained"} color={"secondary"} onClick={onSubmit}>
						Send
					</Button>
				</div>
			</div>
		</>
	);
};

const CharterEdits = () => {
	const org = React.useContext(OrgContext);
	const { data } = useQuery(QUERY, { variables: { orgId: org.id } });
	const [latestChanges, setLatestChanges] = React.useState({});

	React.useEffect(() => {
		const newChanges = {};
		if (data) {
			data.charterEdits.forEach(edit => {
				edit.alteredFields.forEach(field => {
					const shouldUpdate = !newChanges[field] || newChanges[field]?.createdAt < new Date(edit.createdAt);

					if (shouldUpdate) {
						newChanges[field] = {
							submittingUser: edit.submittingUser,
							value: edit[field],
							status: edit.status,
							createdAt: new Date(edit.createdAt)
						};
					} else {
						console.log("shouldn't update");
					}
				});
			});

			setLatestChanges(newChanges);
		}
	}, [data]);

	return (
		<div>
			<Card style={{ padding: "0.5rem" }}>
				<h2 style={{ textAlign: "center" }}>Edit Charter:</h2>
				<CharterEditForm latestChanges={latestChanges} org={org} />
			</Card>
			<br />
			<ApprovalMessages />
		</div>
	);
};

export default CharterEdits;
