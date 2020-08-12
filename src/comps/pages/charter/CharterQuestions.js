import React from "react";
import SmartCharterQuestion from "./SmartCharterQuestion";

const CharterQuestions = () => {
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
					"Are there any specific protocols members are expected to follow? What is the policy for transfer of leadership between school years?"
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
					"Optional) This information will be public, so if it’s private or a question for the Clubs and Pubs department, please let us know at clubpubs@stuysu.org."
				}
				maxChars={1000}
				multiline
				rows={5}
			/>
		</div>
	);
};

export default CharterQuestions;
