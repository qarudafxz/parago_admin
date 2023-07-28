import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

import { AiOutlineCloseCircle } from "react-icons/ai";

function CreateEvent({ isCreateEvent, setIsCreateEvent }) {
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");
	const [eventAddr, setEventAddr] = useState("");
	const [price, setPrice] = useState(0);
	const [capacity, setCapacity] = useState(0);
	const [nights, setNights] = useState(0);
	const [days, setDays] = useState(0);
	const navigate = useNavigate();

	const createEventOnPress = (event) => {
		if (event.key === "e") setIsCreateEvent(true);
	};

	const handleFormCancellationPress = (event) => {
		if (event.key === "Escape") setIsCreateEvent(false);
	};

	const saveEvent = (e) => {
		e.preventDefault();
		if (!eventName || !eventDesc || !price || !capacity) {
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
			return;
		}

		if (eventDesc.length > 255) {
			toast.error("Event Description is too long!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			return;
		}

		if (capacity > 30) {
			toast.error("Maximum pax is 30. Subscribe to add 20 more paxes.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			return;
		}

		const eventData = {
			eventName,
			eventDesc,
			eventAddr,
			price,
			capacity,
			nights,
			days,
		};

		navigate("/itineraries", { state: { eventData } });
	};

	useEffect(() => {
		const handleCancelCreateEvent = (event) => {
			handleFormCancellationPress(event);
		};

		const handleCreateEvent = (event) => {
			createEventOnPress(event);
		};

		window.addEventListener("keydown", handleCancelCreateEvent);
		window.addEventListener("keydown", handleCreateEvent);

		return () => {
			window.removeEventListener("keydown", handleCancelCreateEvent);
			window.removeEventListener("keydown", handleCreateEvent);
		};
	}, []);

	return (
		<>
			<ToastContainer />
			<AnimatePresence>
				{isCreateEvent && (
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
									onClick={() => setIsCreateEvent(!isCreateEvent)}
									className='text-primary '>
									<AiOutlineCloseCircle size={40} />
								</button>
							</div>
							<div className='flex flex-row justify-between gap-6'>
								<label
									htmlFor='image'
									className='text-2xl font-bold'>
									Event Cover Image
								</label>
								<input
									type='file'
									name='image'
									id='image'
								/>
							</div>
							<input
								type='text'
								placeholder='Event Name'
								onChange={(e) => setEventName(e.target.value)}
								className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
							/>
							<textarea
								type='text'
								placeholder='Event Description (Maximum of 255 Characters only)'
								onChange={(e) => setEventDesc(e.target.value)}
								className='py-2 pl-4 outline outline-slate-400 h-48 focus: outline-none rounded-sm'
							/>
							<input
								type='text'
								placeholder='Event Address'
								onChange={(e) => setEventAddr(e.target.value)}
								className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
							/>

							<div className='grid grid-cols-2 gap-4'>
								<input
									type='number'
									placeholder='Number of Nights'
									onChange={(e) => setNights(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
								/>
								<input
									type='number'
									placeholder='Number of Days'
									onChange={(e) => setDays(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
								/>
								<input
									type='number'
									placeholder='Price'
									onChange={(e) => setPrice(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
								/>
								<input
									type='number'
									placeholder='Pax Available'
									onChange={(e) => setCapacity(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
								/>
							</div>
							<div></div>
							<button
								type='button'
								onClick={saveEvent}
								className='bg-primary text-white py-2 px-4 rounded-md flex justify-center'>
								Save Event
							</button>
						</motion.form>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}

export default CreateEvent;
