import React from "react";
import image from "./../img/vectors/kingdom-under-construction.svg";

const OfflinePage = () => {
	return (
		<div style={{ textAlign: "center", marginTop: "20vh" }}>
			<h2>We're doing some quick maintenance right now.</h2>
			<h2>Try and check back in an hour from now.</h2>
			<h3>Happy Holidays!</h3>
			<img src={image} width={300} alt={"Kingdom under construction"} />
		</div>
	);
};

export default OfflinePage;
