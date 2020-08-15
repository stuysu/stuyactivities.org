import React from "react";
import Typography from "@material-ui/core/Typography";
import UserContext from "../../context/UserContext";
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
import { makeStyles } from "@material-ui/core/styles";
import textValidator from "../../../utils/textValidator";

// const numSteps = 3;

export const CharterFormContext = React.createContext({});

const useStyles = makeStyles(theme => ({
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
		background: theme.palette.background.default
	},
	stepper: {
		background: theme.palette.background.default
	},
	stepLabel: {
		cursor: "pointer"
	},
	backButton: {
		marginLeft: "1rem",
		marginBottom: theme.spacing(2)
	}
}));

const StylesWrapper = ({ children }) => {
	const classes = useStyles();
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

				errors.keywords = this.state?.keywords?.filter(Boolean).length
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

				if (!this.state?.meetingDays?.length) {
					errors.meetingDays = "You must select at least one day.";
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
			Object.keys(this.state.errors).some(
				field => this.state.errors[field]
			) || !this.state?.leaders?.length;
	}

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

	render() {
		if (!this.context.signedIn) {
			return <p>You need to be signed in to charter a new club.</p>;
		}

		return (
			<StylesWrapper>
				{classes => (
					<CharterFormContext.Provider value={this.state}>
						<FlexCenter>
							<div className={classes.container}>
								<BackButton
									to={"/"}
									label={"Back To Home"}
									className={classes.backButton}
								/>
								<Typography
									variant={"h4"}
									style={{ textAlign: "center" }}
								>
									Chartering A New Activity
								</Typography>

								<Stepper
									className={classes.stepper}
									activeStep={this.state.activeStep}
									orientation="vertical"
								>
									<Step>
										<StepLabel
											className={classes.stepLabel}
											onClick={() =>
												this.setState({ activeStep: 0 })
											}
										>
											Before you start
										</StepLabel>
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
												"tags",
												"keywords"
											].some(
												field =>
													this.state.errors[field]
											)}
											className={classes.stepLabel}
											onClick={() =>
												this.setState({ activeStep: 1 })
											}
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
											).some(
												field =>
													this.state.errors[field]
											)}
											className={classes.stepLabel}
											onClick={() =>
												this.setState({ activeStep: 2 })
											}
										>
											Charter Information
										</StepLabel>
										<StepContent>
											<CharterQuestions />
										</StepContent>
									</Step>
									<Step>
										<StepLabel
											className={classes.stepLabel}
											onClick={() =>
												this.setState({ activeStep: 3 })
											}
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
								<div className={classes.navigationButtons}>
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
														this.state
															.activeStep === 3 &&
														this.hasErrors()
													}
												>
													Next
												</Button>
											</span>
										</Tooltip>
									)}
									{this.state.activeStep >= 4 && (
										<SubmitCharter />
									)}
									&nbsp;
									<Button onClick={this.previousStep}>
										Back
									</Button>
								</div>
							</div>
						</FlexCenter>
					</CharterFormContext.Provider>
				)}
			</StylesWrapper>
		);
	}
}
