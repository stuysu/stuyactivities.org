import React from "react";
import TextField from "@mui/material/TextField";
import { CharterFormContext } from "../../../pages/charter";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

const QUERY = gql`
	query Organization($url: String!) {
		organizationByUrl(url: $url) {
			url
		}
	}
`;

const urlRegex = new RegExp(/^[a-zA-Z0-9-]+$/);

const UrlSelection = () => {
	const form = React.useContext(CharterFormContext);

	const { data } = useQuery(QUERY, { variables: { url: form?.url || "" } });

	React.useEffect(() => {
		if (data?.organizationById) {
		}
	}, [data, form.errors]);

	return (
		<div>
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
					if (Boolean(data?.organizationById)) {
						form.setError("url", "There's already an activity at that url.");
					}
				}}
				error={Boolean(form?.errors?.url)}
			/>
		</div>
	);
};

export default UrlSelection;
