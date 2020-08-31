import React from "react";
import { CharterFormContext } from "../../charter/Charter";
import SmartCharterQuestion from "../../charter/SmartCharterQuestion";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import arrayToggle from "../../../../utils/arrayToggle";
import capitalizeString from "../../../../utils/capitalizeString";
import { gql, useQuery } from "@apollo/client";
import { OrgContext } from "../OrgRouter";

const QUERY = gql`
	query($id: Int!) {
		organization(id: $id) {
			charter {
				mission
				purpose
				benefit
				appointmentProcedures
				uniqueness
				meetingSchedule
				meetingDays
				commitmentLevel
				extra
			}
			charterEdits {
				alteredFields
				mission
				purpose
				benefit
				appointmentProcedures
				uniqueness
				meetingSchedule
				meetingDays
				commitmentLevel
				extra
			}
		}
	}
`;

const Changes = () => {
	const form = React.useContext(CharterFormContext);
	const org = React.useContext(OrgContext);
	const { data } = useQuery(QUERY, { variables: { id: org.id } });

	React.useEffect(() => {
		const fields = [
			"mission",
			"purpose",
			"benefit",
			"appointmentProcedures",
			"uniqueness",
			"meetingSchedule",
			"meetingDays",
			"commitmentLevel",
			"extra"
		];
		const mostRecentFields = {};

		if (data) {
			fields.forEach(field => {
				mostRecentFields[field] =
					data?.organization?.charter[field] ||
					data?.organization?.charterEdits?.find(edit =>
						edit.alteredFields.includes(field)
					)[field];
			});
			// form.set(mostRecentFields);
		}
	}, [data, form]);

	return (
		<div>
			<SmartCharterQuestion
				label={"Activity Mission"}
				helperText={
					"A quick blurb of what this organization is all about"
				}
				name={"mission"}
				maxChars={150}
				minChars={20}
				multiline
				rows={3}
			/>

			<SmartCharterQuestion
				name={"purpose"}
				label="Activity Purpose"
				helperText={`This will serve as the official description of the club. Please include a brief statement about what is expected of general members involved in the club.`}
				minWords={150}
				maxWords={400}
				multiline
				rows={5}
			/>

			<SmartCharterQuestion
				name={"benefit"}
				label={"Activity Benefit"}
				helperText={
					"How will this activity benefit the Stuyvesant community? "
				}
				minWords={200}
				maxWords={400}
				multiline
				rows={5}
			/>

			<SmartCharterQuestion
				name={"appointmentProcedures"}
				label={"Appointment Procedures"}
				helperText={
					"What are the leadership positions and how are they appointed? Are there any specific protocols members are expected to follow? What is the policy for transfer of leadership between school years?"
				}
				maxWords={400}
				minWords={150}
				multiline
				rows={5}
			/>

			<SmartCharterQuestion
				name={"uniqueness"}
				label={"Uniqueness"}
				helperText={"What makes your organization unique?"}
				maxWords={400}
				minWords={75}
				multiline
				rows={4}
			/>

			<SmartCharterQuestion
				name={"extra"}
				required={false}
				label={
					"What additional things would you like to share about your activity?"
				}
				helperText={
					"(Optional) This information will be public, so if it’s private or a question for the Clubs and Pubs department, please let us know at clubpubs@stuysu.org."
				}
				maxChars={1000}
				multiline
				rows={5}
			/>

			<SmartCharterQuestion
				name={"meetingSchedule"}
				label={"What's your activity's meeting schedule?"}
				helperText={`Something like "Our meeting schedule varies throughout the year, but we meet at least once a month and up to 3 times in the Spring."`}
				minChars={50}
				maxChars={1000}
				multiline
				rows={3}
			/>

			<Typography
				paragraph
				color={Boolean(form.errors.meetingDays) ? "error" : undefined}
			>
				What days do you plan to hold meetings? (select all that apply)
				*
			</Typography>

			<Grid container spacing={3}>
				{["monday", "tuesday", "wednesday", "thursday", "friday"].map(
					day => {
						return (
							<Grid item key={day}>
								<FormControlLabel
									control={
										<Checkbox
											checked={form?.meetingDays?.includes(
												day
											)}
											onChange={() => {
												form.setError(
													"meetingDays",
													false
												);
												form.set({
													meetingDays: arrayToggle(
														day,
														form.meetingDays || []
													)
												});
											}}
										/>
									}
									label={capitalizeString(day)}
								/>
							</Grid>
						);
					}
				)}
			</Grid>
		</div>
	);
};

class EditCharter extends React.Component {
	constructor(props) {
		super(props);

		this.setState = this.setState.bind(this);

		this.setError = (field, value) => {
			this.setState(state => {
				if (state.errors[field] === value) {
					return null;
				}

				return { errors: { ...state.errors, [field]: value } };
			});
		};

		this.state = {
			set: this.setState,
			errors: {},
			setError: this.setError
		};
	}

	render() {
		return (
			<div style={{ padding: "2rem" }}>
				<h1 style={{ textAlign: "center" }}>Edit Charter</h1>
				<CharterFormContext.Provider value={this.state}>
					<Changes />
				</CharterFormContext.Provider>
			</div>
		);
	}
}

export default EditCharter;
