/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { getAdminId } from "../helpers/getAdminId.js";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function AddTranspo({ ...props }) {
	const [progress, setProgress] = useState(0);
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [availability, setAvailability] = useState(null);
	const [service, setService] = useState("");
	const [location, setLocation] = useState("");

	const adminID = getAdminId();

	const availabilities = [
		{
			label: "Available",
			value: true,
		},
		{
			label: "Not Available",
			value: false,
		},
	];

	const handleEsc = (e) => {
		if (e.key === "Escape") {
			props.setIsAdd(false);
		}
	};

	const addTransport = async (e) => {
		e.preventDefault();
		setProgress(30);

		if (
			!name ||
			!gender ||
			!contactNumber ||
			availability === null ||
			!service ||
			!location
		) {
			toast.error("Please input all fields!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setProgress(100);
			return;
		}

		const URL = import.meta.env.DEV
			? `http://localhost:3001/api/event/create-accoms/${adminID}`
			: `/api/event/create-accoms/${adminID}`;

		const toastConfig = {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		};

		try {
			const res = await fetch(URL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					gender,
					contactNumber,
					availability,
					service,
					location,
				}),
			});

			const data = await res.json();

			if (res.ok || res.status === 200) {
				toast.success(data.message, toastConfig);
			} else {
				toast.error("Server Error. Please try again!", toastConfig);
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleEsc);
		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	});

	return (
		<>
			<AnimatePresence>
				{props.isAdd && (
					<div
						className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
							blur ? "backdrop-blur-lg" : ""
						}`}>
						<ToastContainer />
						<motion.form
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.8,
								type: "spring",
								ease: [0, 0.71, 0.2, 0],
							}}
							className='flex flex-col gap-4 p-10 w-5/12 rounded-md bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl'>
							<div className='flex justify-end items-center gap-4'>
								<h1 className='font-thin text-[#808080]'>Press Esc to close</h1>
								<button
									type='button'
									onClick={() => props.setIsAdd(!props.isAdd)}
									className='text-primary'>
									<AiOutlineCloseCircle size={40} />
								</button>
							</div>
							<form className='flex flex-col gap-6 mt-6'>
								<div className='grid grid-cols-5 gap-8'>
									<label
										htmlFor='image'
										className='col-span-2 relative cursor-pointer bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md flex items-center justify-center'>
										<svg
											className='w-6 h-6 mr-2'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
										</svg>
										Upload Photo
										<input
											type='file'
											className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
										/>
									</label>
									<input
										type='text'
										placeholder="Driver's Name"
										className='col-span-3 py-2 pl-4 outline outline-zinc-200 focus: outline-none rounded-sm'
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<input
									type='text'
									placeholder='Gender'
									className='py-2 pl-4 outline outline-zinc-200 focus: outline-none rounded-sm'
									onChange={(e) => setGender(e.target.value)}
								/>
								<input
									type='text'
									placeholder='Contact Number'
									className='py-2 pl-4 outline outline-zinc-200 focus: outline-none rounded-sm'
									onChange={(e) => setContactNumber(e.target.value)}
								/>
								<Dropdown
									className='py-2 rounded-md text-primary focus:outline-none'
									options={availabilities}
									onChange={(availabilities) => setAvailability(availabilities?.value)}
									placeholder='Set Availability'
								/>
								<input
									type='text'
									placeholder='Service'
									className='py-2 pl-4 outline outline-zinc-200 focus: outline-none rounded-sm'
									onChange={(e) => setService(e.target.value)}
								/>
								<input
									type='text'
									placeholder='Location'
									className='py-2 pl-4 outline outline-zinc-200 focus: outline-none rounded-sm'
									onChange={(e) => setLocation(e.target.value)}
								/>
								<button
									type='submit'
									onClick={addTransport}
									className='py-3 mt-8 rounded-md text-white bg-primary hover:bg-[#3d52c7] duration-200'>
									Add Transportation
								</button>
							</form>
						</motion.form>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}

export default AddTranspo;
