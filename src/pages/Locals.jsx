import React from "react";

function Locals() {
	return (
		<div className='w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-primary'>
			<h1 className='text-white'>
				Dashboard/<span className='text-white font-semibold'>Locals</span>
			</h1>
			<h1 className='text-4xl text-white font-bold'>
				View the local accomodations in your municipality!
			</h1>
			<p className='text-white font-thin w-7/12 mt-4'>
				View your local accomodations here. You can add details about the places'
				contact information by clicking specific category
			</p>
		</div>
	);
}

export default Locals;
