/* eslint-disable react/prop-types */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Dropdown from "react-dropdown";
import { locType } from "../data/loctype.js";

export const AddPlace = ({ ...props }) => {
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [address, setAddress] = useState("");
	const [placeType, setPlaceType] = useState("");

	return (
		<>
			<>
				<AnimatePresence>
					{props.addPlace && (
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
									type: "spring",
									ease: [0, 0.71, 0.2, 0],
								}}
								className='flex flex-col gap-4 p-10 w-5/12 bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl'>
								<div className='flex justify-end items-center gap-4'>
									<h1 className='font-thin text-[#808080]'>Press Esc to close</h1>
									<button
										onClick={() => props.setAddPlace(false)}
										type='button'
										className='text-primary'>
										<AiOutlineCloseCircle size={40} />
									</button>
								</div>
								<div className='flex flex-row justify-between gap-6'>
									<label
										htmlFor='image'
										className='text-2xl font-bold'>
										Hidden Gem Cover Image
									</label>
									<input
										type='file'
										name='image'
										id='image'
									/>
								</div>
								<input
									type='text'
									placeholder='Place Name'
									onChange={(e) => setName(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus:outline-none rounded-sm focus:border-[2px] border-primary'
								/>
								<input
									type='text'
									onChange={(e) => setAddress(e.target.value)}
									placeholder='Place Address'
									className='py-2 pl-4 outline outline-slate-400 focus:outline-none rounded-sm focus:border-[2px] border-primary'
								/>
								<Dropdown
									options={locType}
									placeholder='Select Place Type'
									onChange={(locType) => setPlaceType(locType?.value)}
								/>
								<textarea
									type='text'
									onChange={(e) => setDesc(e.target.value)}
									placeholder='Place Description (Maximum of 255 Characters only)'
									className='py-2 pl-4 outline outline-slate-400 h-48 resize-none focus:outline-none rounded-sm focus:border-[2px] border-primary'
								/>
								<button
									onClick={() => props.addNewPlace(name, desc, address, placeType)}
									type='button'
									className='bg-primary text-white py-2 px-4 rounded-md flex justify-center'>
									Save Event
								</button>
							</motion.form>
						</div>
					)}
				</AnimatePresence>
			</>
		</>
	);
};
