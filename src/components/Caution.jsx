import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosWarning } from "react-icons/io";

export const Caution = ({ ...props }) => {
	return (
		<>
			{props.back && (
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-md'>
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.8,
							ease: [0, 0.71, 0.2, 1.01],
						}}
						className='bg-white rounded-md p-7 place-items-center'>
						<IoIosWarning
							size={100}
							className='m-auto mb-4 text-primary'
						/>
						<h1 className='font-bold text-3xl text-center mb-4'>Return to events</h1>
						<h1 className='text-md font-thin text-gray text-md w-10/12 mx-auto text-center flex items-center justify-between'>
							Are you sure you want to return to events? You will lose all your
							progress.
						</h1>
						<div className='flex flex-row gap-4 mt-8 place-content-center'>
							<Link
								to='/events'
								type='button'
								className='bg-primary py-2 px-8 rounded-md font-semibold text-white hover:bg-[#0032a8] duration-150'>
								Yes
							</Link>
							<button
								onClick={() => props.setBack(false)}
								type='button'
								className='border border-secondary py-2 px-8 rounded-md font-semibold text-secondary'>
								No
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</>
	);
};
