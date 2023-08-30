/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

import { buildUrl } from "../utils/buildUrl.js";
import { getAdminId } from "../helpers/getAdminId.js";

import { AiOutlineCloseCircle } from "react-icons/ai";

import DescCounter from "./DescCounter.jsx";

function CreateEvent({ isCreateEvent, setIsCreateEvent }) {
	const inputRef = useRef(null);
	const adminID = getAdminId();
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");
	const [eventAddr, setEventAddr] = useState("");
	const [price, setPrice] = useState(0);
	const [capacity, setCapacity] = useState(0);
	const [nights, setNights] = useState(0);
	const [days, setDays] = useState(0);
	const [myProfile, setMyProfile] = useState({});
	const navigate = useNavigate();

	const fetchProfile = async () => {
		try {
			const response = await fetch(buildUrl(`/auth/admin/${adminID}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch profile");
			}

			const data = await response.json();
			setMyProfile(data.admin);
		} catch (err) {
			console.error(err);
		}
	};

	const createEventOnPress = (event) => {
		if (event.key === "c" && event.code === "KeyC" && event.ctrlKey) {
			setIsCreateEvent(true);
		}
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

		if (!myProfile?.isSubscribed && capacity > 30) {
			toast.error("Maximum pax is 30. Subscribe to add more paxes.", {
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

	useEffect(() => {
		fetchProfile();

		if (isCreateEvent) {
			inputRef.current.focus();
		}
	}, [isCreateEvent]);

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
								type: "spring",
								ease: [0, 0.71, 0.2, 0],
							}}
							className='flex flex-col gap-4 p-10 w-5/12 bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl'>
							<div className='flex justify-end items-center gap-4'>
								<h1 className='font-thin text-[#808080]'>Press Esc to close</h1>
								<button
									type='button'
									className='text-primary'
									onClick={() => setIsCreateEvent(!isCreateEvent)}>
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
								ref={inputRef}
								onChange={(e) => setEventName(e.target.value)}
								className='py-2 pl-4 outline outline-slate-400 focus:outline-none rounded-sm focus:border-[2px] border-primary'
							/>
							<textarea
								type='text'
								placeholder='Event Description (Maximum of 255 Characters only)'
								onChange={(e) => setEventDesc(e.target.value)}
								className='py-2 pl-4 outline outline-slate-400 h-48 resize-none focus:outline-none rounded-sm focus:border-[2px] border-primary'
							/>
							<DescCounter desc={eventDesc} />
							<input
								type='text'
								placeholder='Event Address'
								onChange={(e) => setEventAddr(e.target.value)}
								className='py-2 pl-4 outline outline-slate-400 focus:outline-none rounded-sm focus:border-[2px] border-primary'
							/>

							<div className='grid grid-cols-2 gap-4'>
								<input
									type='number'
									placeholder='Number of Nights'
									onChange={(e) => setNights(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus:outline-none rounded-sm focus:border-[2px] border-primary'
								/>
								<input
									type='number'
									placeholder='Number of Days'
									onChange={(e) => setDays(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus:outline-none rounded-sm focus:border-[2px] border-primary'
								/>
								<input
									type='number'
									placeholder='Price'
									onChange={(e) => setPrice(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus:outline-none rounded-sm focus:border-[2px] border-primary'
								/>
								<input
									type='number'
									placeholder='Pax Available'
									onChange={(e) => setCapacity(e.target.value)}
									className='py-2 pl-4 outline outline-slate-400 focus:outline-none rounded-sm focus:border-[2px] border-primary'
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
