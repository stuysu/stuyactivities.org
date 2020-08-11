import React from "react";
import Typography from "@material-ui/core/Typography";
import AppContext from "../../context/AppContext";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import BasicInfoForm from "./BasicInfoForm";

// const numSteps = 3;

export const CharterFormContext = React.createContext({});

export default class Charter extends React.Component {
	static contextType = AppContext;

	static numSteps = 3;

	constructor(props, context) {
		super(props, context);

		this.setState = this.setState.bind(this);

		this.state = {
			set: this.setState,
			activeStep: 0
		};

		this.nextStep = () => {
			if (this.state.activeStep + 1 < Charter.numSteps) {
				this.setState(state => ({
					activeStep: state.activeStep + 1
				}));
			}
		};

		this.previousStep = () => {
			if (this.state.activeStep > 0) {
				this.setState(state => ({
					activeStep: state.activeStep - 1
				}));
			}
		};
	}

	render() {
		if (!this.context.signedIn) {
			return <p>You need to be signed in to charter a new club.</p>;
		}

		return (
			<CharterFormContext.Provider value={this.state}>
				<div>
					<Typography variant={"h4"}>Let's get started</Typography>
					<Stepper
						activeStep={this.state.activeStep}
						orientation="vertical"
					>
						<Step>
							<StepLabel>Basic Info:</StepLabel>
							<StepContent>
								<BasicInfoForm />
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Second Step Hi</StepLabel>
							<StepContent>No no</StepContent>
						</Step>
					</Stepper>
					<Button
						color={"secondary"}
						variant={"contained"}
						onClick={this.nextStep}
					>
						Next
					</Button>
					<Button onClick={this.previousStep}>Back</Button>
				</div>
			</CharterFormContext.Provider>
		);
	}
}
