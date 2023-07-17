import React from "react";
import Typography from "@mui/material/Typography";
import UserContext from "../comps/context/UserContext";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import BasicInfoForm from "../comps/pages/charter/BasicInfoForm";
import FlexCenter from "../comps/ui/FlexCenter";
import CharterQuestions from "../comps/pages/charter/CharterQuestions";
import AddLeaders from "../comps/pages/charter/AddLeaders";
import BeforeYouStart from "../comps/pages/charter/BeforeYouStart";
import Confirm from "../comps/pages/charter/Confirm";
import BackButton from "../comps/ui/BackButton";
import Tooltip from "@mui/material/Tooltip";
import SubmitCharter from "../comps/pages/charter/SubmitCharter";
import textValidator from "../utils/textValidator";
import SignInRequired from "../comps/ui/SignInRequired";

export const CharterFormContext = React.createContext({});

const classes = {
	container: {
		width: "1200px",
		maxWidth: "95vw",
		marginTop: "2rem"
	},
	navigationButtons: {
		paddingTop: "1rem",
		zIndex: 3,
		paddingLeft: "1rem",
		paddingBottom: "1rem",
		position: "sticky",
		bottom: 0,
		backgroundColor: "background.default"
	},
	stepper: {
		backgroundColor: "background.default",
		padding: "24px"
	},
	stepLabel: {
		cursor: "pointer"
	},
	backButton: {
		marginLeft: "1rem",
		marginBottom: 2
	}
};

const StylesWrapper = ({ children }) => {
	return children(classes);
};

export default class Charter extends React.Component {
	static contextType = UserContext;

	static numSteps = 5;

	static charterRequirementMap = {
		mission: { minChars: 20 },
		purpose: { minWords: 150 },
		benefit: { minWords: 200 },
		appointmentProcedures: { minWords: 150 },
		uniqueness: { minWords: 75 },
		meetingSchedule: { minChars: 50 },
		meetingDays: {}
	};

	static returningInfo = { minChars: 50 };

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
				errors.name = this.state?.name?.trim() ? false : "You must provide a name for your activity";

				errors.url = this.state?.url?.trim() ? errors.url || false : "You must choose a url for your activity";

				errors.commitmentLevel = this.state.commitmentLevel ? false : "You must select a commitment level";

				errors.tags = this.state?.tags?.length ? false : "You must select at least one tag";

				errors.keywords = this.state?.keywords?.filter(Boolean).length
					? false
					: "You must specify at least one keyword";
			}

			if (this.state.activeStep >= 2) {
				Object.keys(Charter.charterRequirementMap).forEach(field => {
					errors[field] = textValidator(this.state[field], Charter.charterRequirementMap[field])
						? false
						: "Fails to meet requirements";
				});

				if (!this.state?.meetingDays?.length) {
					errors.meetingDays = "You must select at least one day.";
				}

				if (this.state.returning && this.state.returningInfo?.length < Charter.returningInfo.minChars) {
					errors.returningInfo = "Fails to meet requirements";
				}
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
			Object.keys(this.state.errors).some(field => this.state.errors[field]) ||
			!this.state?.leaders?.length ||
			this.state?.leaders?.every(leader => leader.isFaculty); //at least one non-faculty
	}

	componentWillUnmount() {
		window.sessionStorage.setItem("charterForm", JSON.stringify(this.state));
	}

	componentDidMount() {
		const storedVal = window.sessionStorage.getItem("charterForm");

		if (storedVal) {
			const data = JSON.parse(storedVal);
			data.picture = null;
			this.setState(data);
		}

		window.onbeforeunload = () => {
			this.componentWillUnmount();
		};
	}

	render() {
		if (!this.context.signedIn) {
			return <SignInRequired />;
		}

		return (
			<StylesWrapper>
				{classes => (
					<CharterFormContext.Provider value={this.state}>
						<FlexCenter>
							<Box sx={classes.container}>
								<BackButton to={"/"} label={"Back To Home"} sx={classes.backButton} />
								<Typography variant={"h4"} style={{ textAlign: "center" }}>
									Chartering A New Activity
								</Typography>

								<Stepper sx={classes.stepper} activeStep={this.state.activeStep} orientation="vertical">
									<Step>
										<StepLabel
											sx={classes.stepLabel}
											onClick={() => this.setState({ activeStep: 0 })}
										>
											Before you start
										</StepLabel>
										<StepContent>
											<BeforeYouStart />
										</StepContent>
									</Step>
									<Step>
										<StepLabel
											error={["name", "url", "commitmentLevel", "tags", "keywords"].some(
												field => this.state.errors[field]
											)}
											sx={classes.stepLabel}
											onClick={() => this.setState({ activeStep: 1 })}
										>
											Basic Info
										</StepLabel>
										<StepContent>
											<BasicInfoForm />
										</StepContent>
									</Step>
									<Step>
										<StepLabel
											error={
												Object.keys(Charter.charterRequirementMap).some(
													field => this.state.errors[field]
												) || this.state.errors["returningInfo"]
											}
											sx={classes.stepLabel}
											onClick={() => this.setState({ activeStep: 2 })}
										>
											Charter Information
										</StepLabel>
										<StepContent>
											<CharterQuestions />
										</StepContent>
									</Step>
									<Step>
										<StepLabel
											sx={classes.stepLabel}
											onClick={() => this.setState({ activeStep: 3 })}
										>
											Leaders
										</StepLabel>
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
								<Box sx={classes.navigationButtons}>
									{this.state.activeStep < 4 && (
										<Tooltip
											disableInteractive
											disableHoverListener={this.state.activeStep !== 3 || !this.hasErrors()}
											title={
												"You need to fix the issues with your submission before you can continue"
											}
										>
											<span>
												<Button
													color={"secondary"}
													variant={"contained"}
													onClick={this.nextStep}
													disabled={this.state.activeStep === 3 && this.hasErrors()}
												>
													Next
												</Button>
											</span>
										</Tooltip>
									)}
									{this.state.activeStep >= 4 && <SubmitCharter />}
									&nbsp;
									<Button onClick={this.previousStep}>Back</Button>
								</Box>
							</Box>
						</FlexCenter>
					</CharterFormContext.Provider>
				)}
			</StylesWrapper>
		);
	}
}
