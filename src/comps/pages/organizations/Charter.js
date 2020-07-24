import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import BasicInfoForm from "./charter/BasicInfoForm";
import TextField from "@material-ui/core/TextField";

const numSteps = 3;

export const CharterFormContext = React.createContext({});

export default class Charter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	calcNumWords(input) {
		return input?.split(" ").filter(Boolean).length || 0;
	}

	limitWords(input, limit = 400) {
		return input?.split(" ").splice(0, limit).join(" ");
	}
	onSubmit() {
		console.log(this.state);
	}

	render() {
		return (
			<div
				style={{
					width: "600px",
					marginLeft: `calc(50% - 300px)`,
					marginTop: "2rem"
				}}
			>
				<Typography variant={"h4"}>Let's get started</Typography>
				<br />
				<TextField
					color={"secondary"}
					fullWidth
					variant={"outlined"}
					label="Organization Name"
					value={this.state.name || ""}
					onChange={ev => this.setState({ name: ev.target.value })}
				/>
				<br />
				<br />
				<TextField
					color={"secondary"}
					fullWidth
					variant={"outlined"}
					value={this.state.url || ""}
					onChange={ev => this.setState({ url: ev.target.value })}
					label="Organization Url"
					// error={data.organization}
				/>
				<br />
				<br />

				<TextField
					color={"secondary"}
					fullWidth
					variant={"outlined"}
					value={this.state.mission || ""}
					onChange={ev =>
						this.setState({
							missionError: false,
							mission: ev.target.value.substr(0, 150)
						})
					}
					label="A short mission statement:"
					helperText={`Must be between 20 and 150 characters. Currently ${
						this.state?.mission?.length || 0
					} characters`}
					multiline
					rows={3}
					onBlur={() =>
						this.setState({
							missionError: this.state?.mission?.length < 20
						})
					}
					error={this.state.missionError}
					// error={data.organization}
				/>
				<br />
				<br />

				<TextField
					color={"secondary"}
					fullWidth
					variant={"outlined"}
					value={this.state.purpose || ""}
					onChange={ev =>
						this.setState({
							purposeError: false,
							purpose: this.limitWords(ev.target.value)
						})
					}
					label="What is this organization's purpose?"
					helperText={`This will serve as the official description of the club. Please include a brief statement about what is expected of general members involved in the club. Must be between 150 and 400 words. Currently ${this.calcNumWords(
						this.state.purpose
					)} words`}
					onBlur={() =>
						this.setState({
							purposeError:
								this.calcNumWords(this.state.purpose) < 150
						})
					}
					error={this.state.purposeError}
					multiline
					rows={5}
					// error={data.organization}
				/>
				<br />
				<br />

				<TextField
					color={"secondary"}
					fullWidth
					variant={"outlined"}
					value={this.state.benefit || ""}
					onChange={ev =>
						this.setState({
							benefit: this.limitWords(ev.target.value),
							benefitError: false
						})
					}
					label="How will this activity benefit the Stuyvesant community?"
					helperText={`Must be between 200 and 400 words. Currently ${this.calcNumWords(
						this.state.benefit
					)} words`}
					onBlur={() =>
						this.setState({
							benefitError:
								this.calcNumWords(this.state.benefit) < 200
						})
					}
					error={this.state.benefitError}
					multiline
					rows={5}
					// error={data.organization}
				/>
				<br />
				<br />

				<TextField
					color={"secondary"}
					fullWidth
					variant={"outlined"}
					value={this.state.appointmentProcedures || ""}
					onChange={ev =>
						this.setState({
							appointmentProceduresError: false,
							appointmentProcedures: this.limitWords(
								ev.target.value
							)
						})
					}
					label={
						"What are the appointment and impeachment protocols for leadership positions? "
					}
					helperText={`Are there any specific protocols members are expected to follow? What is the policy for transfer of leadership between school years? Must be between 150 and 400 words. Currently ${this.calcNumWords(
						this.state.appointmentProcedures
					)} words`}
					multiline
					rows={5}
					onBlur={() =>
						this.setState({
							appointmentProceduresError:
								this.calcNumWords(
									this.state.appointmentProcedures
								) < 150
						})
					}
					error={this.state.appointmentProceduresError}
				/>
				<br />
				<br />

				<TextField
					color={"secondary"}
					fullWidth
					variant={"outlined"}
					value={this.state.uniqueness || ""}
					onChange={ev =>
						this.setState({
							uniquenessError: false,
							uniqueness: this.limitWords(ev.target.value)
						})
					}
					label={"What makes your organization unique?"}
					helperText={`Must be between 75 and 400 words. Currently ${this.calcNumWords(
						this.state.uniqueness
					)} words`}
					error={this.state.uniquenessError}
					onBlur={() =>
						this.setState({
							uniquenessError:
								this.calcNumWords(this.state.uniqueness) < 75
						})
					}
					multiline
					rows={5}
					// error={data.organization}
				/>
				<br />
				<br />

				<TextField
					color={"secondary"}
					fullWidth
					variant={"outlined"}
					value={this.state.extra || ""}
					onChange={ev =>
						this.setState({
							extra: ev.target.value.substr(0, 1000)
						})
					}
					label={
						"What additional things would you like to share about your activity?"
					}
					helperText={`Optional) This information will be public, so if it’s private or a question for the Clubs and Pubs department, please let us know at clubpubs@stuysu.org. Must be less than 1000 characters. Currently ${
						this.state?.extra?.length || 0
					} characters`}
					multiline
					rows={5}
					// error={data.organization}
				/>

				<br />
				<br />

				<Button
					variant={"contained"}
					color={"primary"}
					onClick={this.onSubmit}
				>
					Submit
				</Button>
				<br />
				<br />
			</div>
		);
	}
}
