import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Typography } from "@material-ui/core";

import layout from "./../../../styles/Layout.module.css";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { OrgContext } from "../index";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import { AddPhotoAlternate, Close, EmojiEmotionsOutlined } from "@material-ui/icons";
import Picker from "emoji-picker-react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";
import Carousel from "react-multi-carousel";

import { find } from "linkifyjs";
import DynamicLinkPreview from "../../../comps/updates/DynamicLinkPreview";
import { gql, useMutation } from "@apollo/client";
import UpdateCard from "../../../comps/updates/UpdateCard";
import moment from "moment-timezone";

const useStyles = makeStyles({
	cardContent: {
		padding: "1rem"
	},
	picCarousel: {
		marginTop: "1rem"
	}
});

const responsive = {
	desktop: {
		breakpoint: { max: 4000, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
};

const CREATE_UPDATE = gql`
	mutation(
		$title: String!
		$content: String!
		$pictures: [UpdatePicUpload!]!
		$orgId: Int!
		$links: [String!]!
		$type: String!
		$notifyFaculty: Boolean!
		$notifyMembers: Boolean!
	) {
		createUpdate(
			title: $title
			content: $content
			pictures: $pictures
			orgId: $orgId
			links: $links
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
	const classes = useStyles();
	const snackbar = useSnackbar();

	const [link, setLink] = useState(null);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

	const [isPublic, setIsPublic] = useState(true);
	const [notifyMembers, setNotifyMembers] = useState(true);
	const [notifyFaculty, setNotifyFaculty] = useState(false);

	const [pictures, setPictures] = useState([]);

	const [submit, { loading }] = useMutation(CREATE_UPDATE, {
		variables: {
			orgId: org.id,
			title,
			content,
			pictures,
			notifyMembers,
			notifyFaculty,
			type: isPublic ? "public" : "private",
			links: link ? [link] : []
		},
		update: cache => {
			setTitle("");
			setContent("");
			setEmojiPickerOpen(false);
			setIsPublic(true);
			setNotifyFaculty(false);
			setNotifyMembers(true);
			setLink(null);
			setPictures([]);

			cache.reset().then(() => org.refetch());
		}
	});

	useEffect(() => {
		const links = find(content, "url");

		const href = links[0]?.href || null;

		if (link !== href) {
			setLink(href);
		}
	}, [content, link]);

	const onDrop = useCallback(
		acceptedFiles => {
			if (pictures.length > 10) {
				return snackbar.enqueueSnackbar("You cannot upload more than 10 images.");
			}

			const file = acceptedFiles[0];

			if (!file) {
				return snackbar.enqueueSnackbar("You are only allowed to upload image files less than 5MB");
			}

			const description = window.prompt("Provide a description for this picture.");

			setPictures(pics => pics.concat({ file, description }));
		},
		[pictures, snackbar]
	);

	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop,
		noClick: true,
		multiple: false,
		accept: "image/*",
		maxSize: 5000000
	});

	return (
		<div className={layout.container}>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
					<Card {...getRootProps()}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar alt={org?.name} src={org?.charter?.picture} />
								</ListItemAvatar>
								<ListItemText
									primary={org?.name}
									secondary={moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a")}
								/>
							</ListItem>
						</List>
						<input style={{ display: "none" }} {...getInputProps()} />
						<div className={classes.cardContent}>
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
							<IconButton onClick={open}>
								<AddPhotoAlternate />
							</IconButton>
							<IconButton
								color={emojiPickerOpen ? "primary" : "default"}
								onClick={setEmojiPickerOpen.bind(null, !emojiPickerOpen)}
							>
								<EmojiEmotionsOutlined />
							</IconButton>
							{emojiPickerOpen && (
								<div style={{ position: "absolute", background: "white", zIndex: 20 }}>
									<Picker
										onEmojiClick={(ev, emoji) => {
											setContent(content + emoji.emoji);
											setEmojiPickerOpen(false);
										}}
									/>
								</div>
							)}
							<TextField
								fullWidth
								label={"Content"}
								variant={"outlined"}
								multiline
								rows={5}
								value={content}
								placeholder={
									"Could be an update for your members or for the world to see. Feel free to include links, images, emojis, and anything else you'd like."
								}
								onChange={ev => setContent(ev.target.value)}
							/>

							{Boolean(pictures.length) && (
								<Carousel responsive={responsive} className={classes.picCarousel}>
									{pictures.map((pic, index) => (
										<div
											style={{
												position: "relative"
											}}
										>
											<IconButton
												style={{
													position: "absolute",
													right: "1rem",
													background: "rgba(0, 0, 0, 0.2)",
													borderRadius: "50%",
													color: "white",
													cursor: "pointer"
												}}
												onClick={() => {
													const pics = Array.from(pictures);
													pics.splice(index, 1);
													setPictures(pics);
												}}
											>
												<Close />
											</IconButton>
											<img
												src={window.URL.createObjectURL(pic.file)}
												alt={"Upload"}
												style={{
													objectFit: "contain",
													width: "100%",
													height: "300px"
												}}
											/>
											<Typography variant={"subtitle2"} align={"center"} color={"secondary"}>
												{pic.description}
											</Typography>
										</div>
									))}
								</Carousel>
							)}

							{link !== null && <DynamicLinkPreview url={link} />}

							<Grid component="label" container alignItems="center" spacing={1}>
								<Grid item>Members Only</Grid>
								<Grid item>
									<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
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
											/>
										}
										label="Notify Faculty Advisors"
									/>
								</Grid>
							</Grid>

							<Button color={"primary"} variant={"contained"} disabled={loading} onClick={submit}>
								Submit
							</Button>
						</div>
					</Card>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
					<Grid container spacing={2}>
						{org.updates.map(update => (
							<Grid item xs={12} key={update.id}>
								<UpdateCard {...update} organization={org} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Updates;
