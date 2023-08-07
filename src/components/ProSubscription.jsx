import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";

import { free, subscribed } from "../data/benefits.js";

function ProSubscription({ ...props }) {
	return (
		<AnimatePresence>
			{props.isOpen && (
				<div
					className={`fixed inset-0 flex gap-4 items-center bg-black bg-opacity-60 justify-center backdrop-blur-lg`}>
					<motion.button
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -1000 }}
						onClick={() => props.setIsOpen(!props.isOpen)}>
						<AiOutlineCloseCircle
							className='text-white'
							size={40}
						/>
					</motion.button>
					<div className='flex flex-row w-6/12'>
						<motion.div
							key={1}
							initial={{ opacity: 0, y: -1000 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 1000 }}
							transition={{
								delay: 0.2,
								duration: 1.5,
								ease: [0, 0.71, 0.2, 1.01],
							}}
							className='p-8 bg-white rounded-2xl w-8/12 flex flex-col gap-4'
							style={{ height: "510px" }}>
							<h1 className='font-base text-primary'>Free</h1>
							<h1 className='font-bold text-[#202020] md:text-5xl xl:text-7xl'>
								₱ 0.00
								<span className='font-normal text-sm text-zinc-500'>/month</span>
							</h1>
							<p className='text-sm font-normal text-zinc-600 leading-relaxed'>
								The perfect opportunity for you to get started on organizing events.
							</p>
							<div className='flex flex-col gap-4 mt-6'>
								{free.map((item) => {
									return (
										<div className='flex gap-8'>
											<AiOutlineCheck
												className='text-primary'
												size={20}
											/>
											<h1 className='font-thin text-sm'>{item}</h1>
										</div>
									);
								})}
							</div>
							<div className='m-auto py-2 w-full bg-[#e7e7e7] rounded-md md:mt-14 xl:mt-8'>
								<h1 className='text-center text-zinc-400'>Current Subscription</h1>
							</div>
						</motion.div>
						<motion.div
							key={2}
							initial={{ opacity: 0, y: 1000 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -1000 }}
							transition={{
								duration: 1.5,
								delay: 0.4,
								ease: [0, 0.71, 0.2, 1.01],
							}}
							className='p-8 bg-primary w-10/12 rounded-2xl flex flex-col gap-4 text-white'>
							<h1 className='font-base text-secondary  px-3 py-1 rounded-md font-bold'>
								Pro+
							</h1>
							<h1 className='font-bold  md:text-5xl xl:text-7xl'>
								₱ 149.00
								<span className='font-normal text-sm text-zinc-200'>/month</span>
							</h1>
							<p className='text-sm font-thin leading-relaxed'>
								Unlock additional but promising features of ParaGO Admin.
							</p>
							<div className='flex flex-col gap-4 mt-6'>
								{subscribed.map((item) => {
									return (
										<div className='flex gap-8'>
											<AiOutlineCheck
												className='text-secondary'
												size={20}
											/>
											<h1 className='font-thin text-sm'>{item}</h1>
										</div>
									);
								})}
							</div>
							<Link
								to='/subscribe'
								className='mt-8 m-auto py-2 w-full border border-white rounded-md text-center text-white hover:bg-white duration-200 hover:text-primary'>
								Subscribe
							</Link>
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
}

export default ProSubscription;
