import React, { useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { AiOutlineArrowLeft, AiFillPlusCircle } from "react-icons/ai";
function Tourism() {
	return (
		<div className='w-full'>
			<div
				className="w-full h-72 p-10 flex flex-col gap-2 shadow-2xl inset-0 bg-[url('https://beta.tourism.gov.ph/wp-content/uploads/2022/05/0-02-06-0a8ece934416044fa329fa986524202c0ed42c9c3c4a2f60c5eddb146d1be92f_a39c27b788e1c5c1.jpg')]"
				style={{
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}>
				<div className='p-4 w-full backdrop-blur-sm'>
					<h1 className='text-primary'>
						Dashboard/
						<span className='text-white font-semibold'>Tourism</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>
						Add tourist for your valued costumers for their guidance during their
						adventure
					</h1>
					<p className='text-white font-thin w-7/12 mt-4'>
						You can add details about the tourist responsible for the transportation
						with their personal information
					</p>
				</div>
				<div></div>
			</div>
			<div className='mt-10 px-14'>
				<div className='flex gap-4 items-center'>
					<motion.div
						whileHover={{
							initial: { x: 0 },
							x: -9.5,
						}}>
						<Link to='/locals'>
							<AiOutlineArrowLeft
								size={30}
								className='text-black'
							/>
						</Link>
					</motion.div>
					<div className='flex w-full justify-between items-center'>
						<h1>Locals</h1>
						<button
							onClick={() => setIsAdd(!isAdd)}
							className='flex flex-row gap-4 items-center text-xl font-semibold place-self-end mr-10 bg-primary px-4 py-2 rounded-md text-white hover:bg-[#0032a8] duration-150'>
							<AiFillPlusCircle size={30} />
							Add Tourist
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Tourism;
