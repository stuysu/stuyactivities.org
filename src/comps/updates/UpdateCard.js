import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Carousel from "react-multi-carousel";
import { Link, Typography } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import LinkPreview from "./LinkPreview";
import moment from "moment-timezone";
import UnstyledLink from "../ui/UnstyledLink";

const useStyles = makeStyles({
	cardContent: {
		padding: "0 1rem",
		overflowWrap: "anywhere"
	},
	card: {
		width: "100%"
	},
	ignoreLimit: {
		cursor: "pointer",
		"&:hover": {
			textDecoration: "underline"
		}
	}
});

const responsive = {
	desktop: {
		breakpoint: { max: 4000, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
};

const BlueLink = props => <Link {...props} color={"secondary"} />;
const SmallText = props => <Typography {...props} variant={"body2"} paragraph />;

const UpdateCard = ({ organization, title, content, pictures, links, createdAt, limit = true }) => {
	const classes = useStyles();

	const [ignoreLimit, setIgnoreLimit] = useState(false);
	let shortContent = content;

	let limited = false;

	if (!ignoreLimit && limit && typeof content === "string" && content.length > 500) {
		shortContent = content.substr(0, 500) + "...";
		limited = true;
	}

	return (
		<Card>
			<List>
				<UnstyledLink to={`/${organization.url}`}>
					<ListItem>
						<ListItemAvatar>
							<Avatar alt={organization?.name} src={organization?.charter?.picture} />
						</ListItemAvatar>
						<ListItemText
							primary={organization?.name}
							secondary={moment(createdAt).format("dddd, MMMM Do YYYY, h:mm a")}
						/>
					</ListItem>
				</UnstyledLink>
			</List>
			<div className={classes.cardContent}>
				<Typography variant={"h5"}>{title}</Typography>
				<ReactMarkdown
					source={shortContent.replace(/\n/g, "\n\n")}
					disallowedTypes={["image"]}
					escapeHtml
					linkTarget={"_blank"}
					renderers={{
						link: BlueLink,
						paragraph: SmallText
					}}
				/>

				{limited && !ignoreLimit && (
					<Typography color={"primary"} className={classes.ignoreLimit} onClick={() => setIgnoreLimit(true)}>
						Keep Reading
					</Typography>
				)}
				{Boolean(pictures.length) && (
					<Carousel responsive={responsive} className={classes.picCarousel}>
						{pictures.map(pic => (
							<div
								style={{
									position: "relative"
								}}
								key={pic.id}
							>
								<img
									src={pic.defaultUrl}
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
				{links?.length > 0 && links.map(link => <LinkPreview {...link} key={link.id} />)}
			</div>
		</Card>
	);
};

export default UpdateCard;
