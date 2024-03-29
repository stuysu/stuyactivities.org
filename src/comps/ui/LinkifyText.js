import React from "react";
import Link from "@mui/material/Link";
import Linkify from "linkify-react";

const LinkifyText = ({ children, color = "secondary", underline = "hover" }) => {
	return (
		<Linkify
			options={{
				tagName: "span",
				defaultProtocol: "http",
				format: function (value, type) {
					if (type === "email") {
						return (
							<Link href={`mailto:${value}`} target={"_blank"} color={"primary"} underline="hover">
								{value}
							</Link>
						);
					}

					if (type === "url") {
						let link = value;
						if (!link.startsWith("http://") && !link.startsWith("https://")) {
							link = `https://${link}`;
						}

						return (
							<Link href={link} target={"_blank"} color={color} underline={underline}>
								{value}
							</Link>
						);
					}
					return <span>{value}</span>;
				}
			}}
		>
			{children}
		</Linkify>
	);
};

export default LinkifyText;
