import React from "react";
import EventEmitter from "events";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import AuthContext from "./AuthContext";
import AuthContent from "./AuthContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserContext from "../context/UserContext";

const loginDialogEmitter = new EventEmitter();

export const triggerLoginDialog = () => {
	loginDialogEmitter.emit("open");
};

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenWrapper = ({ children }) => {
	const isMobile = useMediaQuery("(max-width: 800px)");
	return children(isMobile);
};

class AuthDialog extends React.Component {
	static contextType = UserContext;

	constructor(props, context) {
		super(props, context);

		// console.log(this.context);

		this.handleClose = () => {
			this.setState({
				open: false
			});
		};

		this.setState = this.setState.bind(this);

		this.state = {
			open: false,
			page: "landing",
			unrecognizedEmail: "",
			handleClose: this.handleClose,
			set: this.setState
		};

		this.dialogOpenListener = this.dialogOpenListener.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	dialogOpenListener() {
		this.setState(state => {
			const newState = { open: true };

			if (state.page !== "landing" && state.page !== "unrecognized") {
				newState.page = "landing";
			}

			return newState;
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.context.signedIn && this.state.open) {
			this.setState({ open: false });
		}
	}

	componentDidMount() {
		loginDialogEmitter.on("open", this.dialogOpenListener);
	}

	componentWillUnmount() {
		loginDialogEmitter.removeListener("open", this.dialogOpenListener);
	}

	render() {
		return (
			<AuthContext.Provider value={this.state}>
				<FullScreenWrapper>
					{isMobile => (
						<Dialog
							fullScreen={isMobile}
							open={this.state.open}
							onClose={this.handleClose}
							TransitionComponent={Transition}
						>
							<AuthContent />
						</Dialog>
					)}
				</FullScreenWrapper>
			</AuthContext.Provider>
		);
	}
}

export default AuthDialog;
