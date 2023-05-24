import React from "react";
import logo from "../assets/parago_blue.svg";
import parago from "../assets/parago_word.svg";

function Preloader() {
	return (
		<div className='relative top-64'>
			<img
				src={logo}
				alt='logo'
				className='w-2/12 fade-in m-auto'
			/>
			<img
				src={parago}
				alt='parago'
				className='w-2/12 m-auto fade-delay'
			/>
		</div>
	);
}

export default Preloader;
