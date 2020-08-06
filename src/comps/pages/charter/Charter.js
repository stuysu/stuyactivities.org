import React from "react";
import Typography from "@material-ui/core/Typography";
import AppContext from "../../context/AppContext";

// const numSteps = 3;

export const CharterFormContext = React.createContext({});

export default class Charter extends React.Component {
	static contextType = AppContext;

	constructor(props, context) {
		super(props, context);

		this.setState = this.setState.bind(this);

		this.state = {
			set: this.setState
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
				</div>
			</CharterFormContext.Provider>
		);
	}
}
