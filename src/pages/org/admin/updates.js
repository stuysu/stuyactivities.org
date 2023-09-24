import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Grid } from "@mui/material";

import layout from "./../../../styles/Layout.module.css";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { OrgContext } from "../index";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { gql, useMutation } from "@apollo/client";
import UpdateCard from "../../../comps/updates/UpdateCard";
import moment from "moment-timezone";
import TinyEditor from "../../../comps/updates/TinyEditor";

const classes = {
	cardContent: {
		padding: "1rem"
	}
};

const CREATE_UPDATE = gql`
	mutation (
		$title: NonEmptyString!
		$content: NonEmptyString!
		$orgId: Int!
		$type: updateTypes!
		$notifyFaculty: Boolean!
		$notifyMembers: Boolean!
	) {
		createUpdate(
			title: $title
			content: $content
			orgId: $orgId
			type: $type
			localPinned: false
			notifyFaculty: $notifyFaculty
			notifyMembers: $notifyMembers
		) {
			id
		}
	}
`;

const Updates = () => {
	const org = useContext(OrgContext);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const [isPublic, setIsPublic] = useState(true);
	const [notifyMembers, setNotifyMembers] = useState(true);
	const [notifyFaculty, setNotifyFaculty] = useState(false);

	const [submit, { loading }] = useMutation(CREATE_UPDATE, {
		variables: {
			orgId: org.id,
			title,
			content,
			notifyMembers,
			notifyFaculty,
			type: isPublic ? "public" : "private"
		},
		update: cache => {
			setTitle("");
			setContent("");
			setIsPublic(true);
			setNotifyFaculty(false);
			setNotifyMembers(true);

			cache.reset().then(() => org.refetch());
		}
	});

	if (org.locked === "LOCK") {
		return (
			<Typography variant={"h2"} style={{ textAlign: "center" }}>
				Locked activities may not make posts.
			</Typography>
		);
	}

	return (
		<div className={layout.container}>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
					<Card>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar alt={org?.name} src={org?.charter?.picture?.tinyThumbnail} />
								</ListItemAvatar>
								<ListItemText
									primary={org?.name}
									secondary={moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a")}
								/>
							</ListItem>
						</List>
						<input style={{ display: "none" }} />
						<Box sx={classes.cardContent}>
							<TextField
								fullWidth
								variant={"outlined"}
								value={title}
								label={"Title"}
								placeholder={
									Math.random() < 0.5
										? "e.g. Robotics Team Won Semi-Finals"
										: "e.g. Photos Assignment Due Next Week"
								}
								onChange={ev => setTitle(ev.target.value)}
							/>

							<TinyEditor
								value={content}
								setValue={setContent}
								placeholder={
									"Could be an update for your members or for the world to see. Feel free to include links, images, emojis, and anything else you'd like."
								}
							/>

							<Grid component="label" container alignItems="center" spacing={1}>
								<Grid item>Members Only</Grid>
								<Grid item>
									<Switch
										color="secondary"
										checked={isPublic}
										onChange={() => setIsPublic(!isPublic)}
									/>
								</Grid>
								<Grid item>Public</Grid>
							</Grid>

							<Grid container alignItems={"center"} spacing={2}>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={notifyMembers}
												onChange={() => setNotifyMembers(!notifyMembers)}
												color="secondary"
											/>
										}
										label="Notify Members"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={notifyFaculty}
												onChange={() => setNotifyFaculty(!notifyFaculty)}
												color="secondary"
											/>
										}
										label="Notify Faculty Advisors"
									/>
								</Grid>
							</Grid>

							<Button color={"primary"} variant={"contained"} disabled={loading} onClick={submit}>
								Submit
							</Button>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
					<Grid container spacing={2}>
						{org.updates.map(update => (
							<Grid item xs={12} key={update.id}>
								<UpdateCard {...update} organization={org} showDelete />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Updates;
