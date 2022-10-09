import React from "react";
import TinyEditor from "../../updates/TinyEditor";

const PageBodyEditor = ({ value, setValue, className, disabled }) => {
	return (
		<div className={className}>
			<p>Email Body:</p>
			<TinyEditor
				value={value}
				setValue={setValue}
				initHeight={500}
				showMenuBar={true}
				placeholder={"This is an update email to all club leaders."}
			/>
		</div>
	);
};

export default PageBodyEditor;
