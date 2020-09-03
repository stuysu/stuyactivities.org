import React from "react";
import TextField from "@material-ui/core/TextField";
import { CharterFormContext } from "../../../pages/Charter";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

const QUERY = gql`
	query Organization($url: String!) {
		organization(url: $url) {
			url
		}
	}
`;

const urlRegex = new RegExp(/^[a-zA-Z0-9-]+$/);

const UrlSelection = ({ className }) => {
	const form = React.useContext(CharterFormContext);

	const { data } = useQuery(QUERY, { variables: { url: form?.url || "" } });

	React.useEffect(() => {
		if (data?.organization) {
		}
	}, [data, form.errors]);

	return (
		<div className={className}>
			<TextField
				variant={"outlined"}
				fullWidth
				label={"Activity Url"}
				value={form?.url || ""}
				required
				onChange={ev => {
					const safeUrl = ev.target.value
						.split("")
						.filter(i => urlRegex.test(i))
						.join("");

					form.set({ url: safeUrl });
					form.setError("url", false);
				}}
				helperText={
					<span>
						https://stuyactivities.org/{form?.url || "<url>"}
						{form?.errors?.url && (
							<span>
								<br />
								{form?.errors?.url}
							</span>
						)}
					</span>
				}
				onBlur={() => {
					if (Boolean(data?.organization)) {
						form.setError(
							"url",
							"There's already an activity at that url."
						);
					}
				}}
				error={Boolean(form?.errors?.url)}
			/>
		</div>
	);
};

export default UrlSelection;
