import React from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "../ui/Loading";
import LinkPreview from "./LinkPreview";

const LINK_PREVIEW_QUERY = gql`
	query($url: String!) {
		linkPreview(url: $url) {
			title
			description
			siteName
			url
			image
		}
	}
`;

const DynamicLinkPreview = ({ url }) => {
	const { data, loading } = useQuery(LINK_PREVIEW_QUERY, {
		variables: { url }
	});

	if (loading) {
		return <Loading />;
	}

	if (!data.linkPreview?.title) {
		return null;
	}

	return <LinkPreview {...data.linkPreview} />;
};

export default DynamicLinkPreview;
