import React from "react";
import SmartCharterQuestion from "./SmartCharterQuestion";
import { Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { CharterFormContext } from "../../../pages/charter";
import arrayToggle from "../../../utils/arrayToggle";
import capitalizeString from "../../../utils/capitalizeString";

const CharterQuestions = () => {
	const form = React.useContext(CharterFormContext);

	return (
		<div>
			<p>Please remember to write your answers in third person point of view.</p>
			<SmartCharterQuestion
				label={"Activity Mission"}
				helperText={"A quick blurb of what this organization is all about"}
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
				helperText={"How will this activity benefit the Stuyvesant community? "}
				minWords={200}
				maxWords={400}
				multiline
				rows={5}
			/>

			<SmartCharterQuestion
				name={"appointmentProcedures"}
				label={"Appointment and Impeachment Procedures"}
				helperText={
					"What are the leadership positions and how are they appointed? Are there any specific protocols members are expected to follow? What is the policy for transfer of leadership between school years? How will leaders be removed if necessary?"
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
				label={"What additional things would you like to share about your activity?"}
				helperText={
					"(Optional) This information will be public, so if it’s private or a question for the Clubs and Pubs department, please let us know at clubpub@stuysu.org."
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

			<Typography paragraph color={Boolean(form.errors.meetingDays) ? "error" : undefined}>
				What days do you plan to hold meetings? (select all that apply) *
			</Typography>

			<Grid container spacing={3} sx={{ marginBottom: "20px" }}>
				{["monday", "tuesday", "wednesday", "thursday", "friday"].map(day => {
					return (
						<Grid item key={day}>
							<FormControlLabel
								control={
									<Checkbox
										checked={form?.meetingDays?.includes(day)}
										onChange={() => {
											form.setError("meetingDays", false);
											form.set({
												meetingDays: arrayToggle(day, form.meetingDays || [])
											});
										}}
										color="secondary"
									/>
								}
								label={capitalizeString(day)}
							/>
						</Grid>
					);
				})}
			</Grid>

			<Typography>Are you chartering a returning club? If you are, you *MUST* check this box.</Typography>

			<FormControlLabel
				control={
					<Checkbox
						checked={form?.returning}
						onChange={() => {
							form.returningInfo = "";
							form.setError("returningInfo", false);

							form.set({
								returning: !form?.returning
							});
						}}
						color="secondary"
					/>
				}
				label={"Yes"}
			/>

			{form?.returning && (
				<SmartCharterQuestion
					name={"returningInfo"}
					label={"Why should we allow your club to be rechartered?"}
					helperText={`Something like "Last year, we hosted a guest speaker event with this person."`}
					minWords={50}
					maxWords={500}
					multiline
					rows={3}
				/>
			)}
		</div>
	);
};

export default CharterQuestions;
