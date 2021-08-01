import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EventEmitter from "events";
import React from "react";
import UserContext from "../context/UserContext";
import ReportContent from "./ReportContent";

const reportDialogEmitter = new EventEmitter();

export const triggerReportDialog = (open = true) => {
	reportDialogEmitter.emit(open ? "open" : "close");
};

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenWrapper = ({ children }) => {
	const isMobile = useMediaQuery("(max-width: 800px)");
	return children(isMobile);
};

class ReportDialog extends React.Component {
	static contextType = UserContext;

	constructor(props, context) {
		super(props, context);

		this.handleClose = () => {
			this.setState({
				open: false
			});
		};

		this.setState = this.setState.bind(this);

		this.state = {
			open: false,
			handleClose: this.handleClose
		};

		this.dialogOpenListener = this.dialogOpenListener.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	dialogOpenListener() {
		this.setState({ open: true });
	}

	componentDidMount() {
		reportDialogEmitter.on("open", this.dialogOpenListener);
		reportDialogEmitter.on("close", this.handleClose);
	}

	componentWillUnmount() {
		reportDialogEmitter.removeListener("open", this.dialogOpenListener);
		reportDialogEmitter.removeListener("close", this.handleClose);
	}

	render() {
		return (
			<FullScreenWrapper>
				{isMobile => (
					<Dialog
						fullScreen={isMobile}
						open={this.state.open}
						onClose={this.handleClose}
						TransitionComponent={Transition}
					>
						<ReportContent />
					</Dialog>
				)}
			</FullScreenWrapper>
		);
	}
}

export default ReportDialog;
