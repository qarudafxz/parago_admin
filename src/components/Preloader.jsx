import React from "react";
import logo from "../assets/parago_blue.svg";

function Preloader() {
	return (
		<img
			src={logo}
			alt='logo'
			className='w-2/12 fade-in relative m-auto top-72'
		/>
	);
}

export default Preloader;
