import React from "react";
import { Link } from "react-router-dom";

function Locals() {
	return (
		<div className='w-full'>
			<div className='w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-secondary'>
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
			<div className='px-32 pt-14 grid grid-cols-3 gap-6'>
				<Link
					to='/transportation'
					className='w-7/12 h-full shadow-md'>
					<div className='flex flex-col gap-2'>
						<h1 className='font-bold text-2xl text-white bg-primary rounded-t-md py-4 px-8'>
							Local Transportation
						</h1>
						<p className='p-4 rounded-b-md'>View Details</p>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Locals;
