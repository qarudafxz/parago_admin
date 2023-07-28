import React from "react";

function Pro() {
	return (
		<div className='text-black bg-[#0a0a0a] rounded-md flex flex-col mx-6 px-3 py-5'>
			<div className='flex gap-1 place-content-center'>
				<h1 className='font-bold text-white'>ParaGO </h1>
				<span className='text-xs text-secondary bg-primary px-2 py-1 rounded-full relative bottom-2'>
					Pro+✨
				</span>
			</div>
			<p className='text-white text-xs text-center font-thin'>
				Subscribe now to get more 20+ capacity for your events
			</p>
			<button className='mt-2 py-2 px-3 font-semibold text-xs rounded-md text-white bg-secondary'>
				Subscribe
			</button>
		</div>
	);
}

export default Pro;