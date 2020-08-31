import React from "react";

import accessBlocked from "./../../img/vectors/ginger-cat-access-blocked.svg";
import FlexCenter from "./FlexCenter";

const SignInRequired = () => {
	return (
		<FlexCenter>
			<div>
				<img src={accessBlocked} alt={"Cat in front of a computer"} />
			</div>
		</FlexCenter>
	);
};

export default SignInRequired;
