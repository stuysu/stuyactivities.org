import React from "react";
import Typography from "@material-ui/core/Typography";
import AppContext from "../../context/AppContext";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import BasicInfoForm from "./BasicInfoForm";
import FlexCenter from "../../ui/FlexCenter";
import CharterQuestions from "./CharterQuestions";
import AddLeaders from "./AddLeaders";
import BeforeYouStart from "./BeforeYouStart";
import Confirm from "./Confirm";
import BackButton from "../../ui/BackButton";
import Tooltip from "@material-ui/core/Tooltip";
import SubmitCharter from "./SubmitCharter";

// const numSteps = 3;

const textValidator = (text, requirements) => {
	if (requirements.minChars) {
		return text?.length > requirements.minChars;
	}

	if (requirements.minWords) {
		return text?.split(" ").filter(Boolean).length > requirements.minWords;
	}

	return true;
};

export const CharterFormContext = React.createContext({});

export default class Charter extends React.Component {
	static contextType = AppContext;

	static numSteps = 5;

	static charterRequirementMap = {
		mission: { minChars: 20 },
		purpose: { minWords: 150 },
		benefit: { minWords: 200 },
		appointmentProcedures: { minWords: 150 },
		uniqueness: { minWords: 75 },
		meetingSchedule: { minChars: 50 }
	};

	componentWillUnmount() {
		window.sessionStorage.setItem(
			"charterForm",
			JSON.stringify(this.state)
		);
	}

	componentDidMount() {
		const storedVal = window.sessionStorage.getItem("charterForm");

		if (storedVal) {
			this.setState(JSON.parse(storedVal));
		}

		window.onbeforeunload = () => {
			this.componentWillUnmount();
		};
	}

	constructor(props, context) {
		super(props, context);

		this.setState = this.setState.bind(this);

		this.setError = (field, value) => {
			this.setState(state => {
				if (state.errors[field] === value) {
					return null;
				}

				return { errors: { ...state.errors, [field]: value } };
			});
		};

		this.emptyCheck = field => {
			return () => {
				this.setState(state => {
					if (!state[field]) {
						this.setError(field, "This field cannot be left empty");
					}
					return null;
				});
			};
		};

		this.state = {
			set: this.setState,
			activeStep: 0,
			errors: {},
			setError: this.setError,
			emptyCheck: this.emptyCheck
		};

		this.beforeStepChange = () => {
			const errors = { ...this.state.errors };

			if (this.state.activeStep >= 1) {
				errors.name = this.state?.name?.trim()
					? false
					: "You must provide a name for your activity";

				errors.url = this.state?.url?.trim()
					? errors.url || false
					: "You must choose a url for your activity";

				errors.commitmentLevel = this.state.commitmentLevel
					? false
					: "You must select a commitment level";

				errors.tags = this.state?.tags?.length
					? false
					: "You must select at least one tag";

				errors.keywords = this.state?.keywords?.length
					? false
					: "You must specify at least one keyword";
			}

			if (this.state.activeStep >= 2) {
				Object.keys(Charter.charterRequirementMap).forEach(field => {
					errors[field] = textValidator(
						this.state[field],
						Charter.charterRequirementMap[field]
					)
						? false
						: "Fails to meet requirements";
				});
			}

			this.setState({ errors });
		};

		this.nextStep = () => {
			this.beforeStepChange();
			if (this.state.activeStep + 1 < Charter.numSteps) {
				this.setState(state => {
					return { activeStep: state.activeStep + 1 };
				});
			}
		};

		this.previousStep = () => {
			this.beforeStepChange();

			if (this.state.activeStep > 0) {
				this.setState(state => ({
					activeStep: state.activeStep - 1
				}));
			}
		};
		this.hasErrors = () =>
			Object.keys(this.state.errors).some(
				field => this.state.errors[field]
			) || !this.state?.leaders?.length;
	}

	render() {
		if (!this.context.signedIn) {
			return <p>You need to be signed in to charter a new club.</p>;
		}

		return (
			<CharterFormContext.Provider value={this.state}>
				<FlexCenter>
					<div
						style={{
							width: "1200px",
							maxWidth: "95vw",
							marginTop: "2rem"
						}}
					>
						<BackButton to={"/"} label={"Back To Home"} />
						<Typography
							variant={"h4"}
							style={{ textAlign: "center" }}
						>
							Chartering A New Activity
						</Typography>

						<Stepper
							activeStep={this.state.activeStep}
							orientation="vertical"
						>
							<Step>
								<StepLabel>Before you start</StepLabel>
								<StepContent>
									<BeforeYouStart />
								</StepContent>
							</Step>
							<Step>
								<StepLabel
									error={[
										"name",
										"url",
										"commitmentLevel",
										"tags"
									].some(field => this.state.errors[field])}
								>
									Basic Info
								</StepLabel>
								<StepContent>
									<BasicInfoForm />
								</StepContent>
							</Step>
							<Step>
								<StepLabel
									error={Object.keys(
										Charter.charterRequirementMap
									).some(field => this.state.errors[field])}
								>
									Charter Information
								</StepLabel>
								<StepContent>
									<CharterQuestions />
								</StepContent>
							</Step>
							<Step>
								<StepLabel>Leaders</StepLabel>
								<StepContent>
									<AddLeaders />
								</StepContent>
							</Step>
							<Step>
								<StepLabel>Confirm</StepLabel>
								<StepContent>
									<Confirm />
								</StepContent>
							</Step>
						</Stepper>
						<div
							style={{
								paddingLeft: "1rem",
								paddingBottom: "2rem"
							}}
						>
							{this.state.activeStep < 4 && (
								<Tooltip
									disableHoverListener={
										this.state.activeStep !== 3 ||
										!this.hasErrors()
									}
									title={
										"You need to fix the issues with your submission before you can continue"
									}
								>
									<span>
										<Button
											color={"secondary"}
											variant={"contained"}
											onClick={this.nextStep}
											disabled={
												this.state.activeStep === 3 &&
												this.hasErrors()
											}
										>
											Next
										</Button>
									</span>
								</Tooltip>
							)}
							{this.state.activeStep >= 4 && <SubmitCharter />}
							&nbsp;
							<Button onClick={this.previousStep}>Back</Button>
						</div>
					</div>
				</FlexCenter>
			</CharterFormContext.Provider>
		);
	}
}
