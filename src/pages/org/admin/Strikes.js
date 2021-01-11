import React from "react";
import { Button, List, ListItem, makeStyles, Typography } from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import { cache } from "../../../comps/context/ApolloProvider";
import Grid from "@material-ui/core/Grid";
import UserMemberships from "../../../comps/home/UserMemberships";
import UserMeetings from "../../../comps/home/UserMeetings";
import UserUpdates from "../../../comps/home/UserUpdates";
import moment from "moment-timezone";
import LinkifyText from "../../../comps/ui/LinkifyText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	}
}));

const CREATE_MESSAGE_MUTATION = gql`
	mutation($strikeId: Int!, $message: String!) {
		createStrikeComment(strikeId: $strikeId, message: $message) {
			id
		}
	}
`;

const QUERY = gql`
	query Strikes($url: String) {
		organization(url: $url) {
			strikes {
				weight
				reason
				createdAt
				strikeComments {
					strike
					user
					message
					auto
					seen
					createdAt
				}
			}
		}
	}
`;

export default function Strikes({ organization, match }) {
	const classes = useStyles();
	const [message, setMessage] = React.useState("");
	const [comments, setComments] = React.useState();

	const { data } = useQuery(QUERY, {
		variables: { url: match.params.orgUrl }
	});
	let array = data?.organization?.strikes;

	const [submitMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
		variables: { message, strikeId: organization.strikes.id }
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

	if (array === undefined || array.length === 0) {
		return (
			<div className={classes.margin}>
				<Typography>Your club doesn't have any strikes yet. Keep up the good work!</Typography>
			</div>
		);
	} else {
		return (
			<div className={classes.margin}>
				<Grid container>
					<Grid item xs={12} sm={7} md={8} lg={8} xl={8}>
						<List>
							{data?.organization?.strikes?.map((strikeData, value) => (
								<ListItem
									onClick={() => {
										setMessage(value);
									}}
								>
									<div>
										<Typography>Reason: {strikeData.reason}</Typography>
										<Typography>Weight: {strikeData.weight}</Typography>
										<Typography>
											Date:{" "}
											{new Date(strikeData.createdAt).toLocaleDateString(undefined, {
												year: "numeric",
												month: "long",
												day: "numeric"
											})}
										</Typography>
									</div>
								</ListItem>
							))}
						</List>
					</Grid>
					<Grid item xs={12} sm={5} md={4} lg={4} xl={4}>
						<>
							<h3>Messages:</h3>
							<div
								style={{
									width: "100%",
									borderRadius: "10px",
									border: "solid 2px black",
									maxHeight: "350px",
									position: "relative",
									overflow: "auto"
								}}
								ref={messageRef}
							>
								<List>
									{organization?.strikes?.strikeComments[message]?.map(message => {
										return (
											<ListItem>
												<ListItemAvatar>
													<Avatar src={message?.user?.picture} />
												</ListItemAvatar>
												<div style={{ display: "flex" }}>
													<div style={{ flexGrow: 1 }}>
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
																: "Organization Admin"}{" "}
															<span style={{ color: "grey" }}>
																({moment(message.createdAt).format("MM/DD/YY h:mma")})
															</span>
														</p>
														<p
															style={{
																fontStyle: message?.auto ? "italic" : "normal",
																color: message?.auto ? "grey" : "black",
																overflowWrap: "anywhere"
															}}
														>
															<LinkifyText color={"primary"}>
																{message?.message}
															</LinkifyText>
														</p>
													</div>
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
					</Grid>
				</Grid>
			</div>
		);
	}
}
