import React from "react";
import SmartCharterQuestion from "./SmartCharterQuestion";
import { Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { CharterFormContext } from "./Charter";
import arrayToggle from "../../../utils/arrayToggle";
import capitalizeString from "../../../utils/capitalizeString";

const CharterQuestions = () => {
	const form = React.useContext(CharterFormContext);

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
				minChars={50}
				maxChars={1000}
				multiline
				rows={3}
			/>

			<Typography paragraph>
				What days do you plan to hold meetings? (select all that apply)
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
											onChange={() =>
												form.set({
													meetingDays: arrayToggle(
														day,
														form.meetingDays || []
													)
												})
											}
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

export default CharterQuestions;
