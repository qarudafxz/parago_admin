import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

import { AiOutlineCloseCircle } from "react-icons/ai";

function EditProfile({ ...props }) {
	const handleFormEditProfile = (event) => {
		if (event.key === "Escape") props.setIsEdit(false);
	};

	useEffect(() => {
		const handleCancelEditProfile = (event) => {
			handleFormEditProfile(event);
		};

		const handleEditProfile = (event) => {
			editProfileOnPress(event);
		};

		window.addEventListener("keydown", handleCancelEditProfile);

		return () => {
			window.removeEventListener("keydown", handleCancelEditProfile);
		};
	}, []);
	return (
		<>
			<div>
				<ToastContainer />
				<AnimatePresence>
					{props.isEdit && (
						<div
							className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
								blur ? "backdrop-blur-lg" : ""
							}`}>
							<motion.form
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5 }}
								transition={{
									duration: 0.8,
									delay: 0.5,
									ease: [0, 0.71, 0.2, 1.01],
								}}
								className='flex flex-col gap-4 p-10 w-5/12 bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl'>
								<div className='flex justify-end items-center gap-4'>
									<h1 className='font-thin text-[#808080]'>Press Esc to close</h1>
									<button
										type='button'
										className='text-primary'
										onClick={() => props.setIsEdit(!props.isEdit)}>
										<AiOutlineCloseCircle size={40} />
									</button>
								</div>
								<div className='flex gap-4'>
									<input
										type='text'
										placeholder={props.myProfile.firstName}
										className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
									/>
									<input
										type='text'
										placeholder={props.myProfile.lastName}
										className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
									/>
								</div>
								<input
									type='text'
									placeholder='Event Address'
									className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
								/>

								<div className='grid grid-cols-2 gap-4'>
									<input
										type='number'
										placeholder='Number of Nights'
										className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
									/>
									<input
										type='number'
										placeholder='Number of Days'
										className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
									/>
									<input
										type='number'
										placeholder='Price'
										className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
									/>
									<input
										type='number'
										placeholder='Pax Available'
										className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
									/>
								</div>
								<div></div>
								<button
									type='button'
									className='bg-primary text-white py-2 px-4 rounded-md flex justify-center'>
									Save Event
								</button>
							</motion.form>
						</div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

export default EditProfile;