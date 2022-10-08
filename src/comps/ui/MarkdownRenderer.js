import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";
import LinkifyText from "./LinkifyText";

// Links are actually detected by linkify.js so ignore the links that react-markdown finds
const DecoyLink = ({ children }) => <span children={children} />;
const SmallText = props => (
	<Typography {...props} variant={"body2"} paragraph>
		<LinkifyText>{props.children}</LinkifyText>
	</Typography>
);
const LimitedHeadingTypography = ({ children, level }) => (
	<Typography variant={`h${level + 4 > 6 ? 6 : level + 4}`}>{children}</Typography>
);

const MarkdownRenderer = ({ children }) => {
	return (
		<ReactMarkdown
			source={children.replace(/\n/g, "\n\n")}
			disallowedTypes={["image"]}
			escapeHtml
			linkTarget={"_blank"}
			renderers={{
				link: DecoyLink,
				paragraph: SmallText,
				heading: LimitedHeadingTypography
			}}
		/>
	);
};

export default MarkdownRenderer;
