import React from "react";
import Link from "@material-ui/core/Link";
import Linkify from "linkifyjs/react";

const LinkifyText = ({ children, color = "secondary" }) => {
	return (
		<Linkify
			options={{
				tagName: "span",
				defaultProtocol: "http",
				format: function (value, type) {
					if (type === "email") {
						return (
							<Link href={`mailto:${value}`} target={"_blank"} color={"primary"}>
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
							<Link href={link} target={"_blank"} color={color}>
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
