import React from "react";
import { Link } from "react-router-dom";

function Transportation() {
	return (
		<>
			<div className='w-full'>
				<div className="w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-[url('https://i0.wp.com/touristspotsfinder.com/wp-content/uploads/2018/04/Top-10-Tourist-Spots-in-Agusan-del-Sur.jpg?fit=1200%2C629&ssl=1')]">
					<div className='backdrop-blur-sm p-4 w-8/12'>
						<h1 className='text-primary'>
							Dashboard/
							<span className='text-white font-semibold'>Transportations</span>
						</h1>
						<h1 className='text-4xl text-white font-bold'>
							Add transportation services to your tourists who visits your wonderful
							places
						</h1>
						<p className='text-white font-thin w-7/12 mt-4'>
							These are the hidden gems you wish for the tourists to explore. You can
							add details about the place by clicking edit
						</p>
					</div>
					<div></div>
				</div>
			</div>
		</>
	);
}

export default Transportation;
