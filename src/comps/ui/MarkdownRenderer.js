import React from "react";
import ReactMarkdown from "react-markdown";
import { Link, Typography } from "@material-ui/core";

const BlueLink = props => <Link {...props} color={"secondary"} />;
const SmallText = props => <Typography {...props} variant={"body2"} paragraph />;
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
				link: BlueLink,
				paragraph: SmallText,
				heading: LimitedHeadingTypography
			}}
		/>
	);
};

export default MarkdownRenderer;
