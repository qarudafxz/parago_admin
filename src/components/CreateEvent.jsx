import React, { useState } from "react";
import { buildUrl } from "../utils/buildUrl";
import { getAdminId } from "../helpers/getAdminId";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import {
	AiOutlineExclamationCircle,
	AiOutlineCloseCircle,
} from "react-icons/ai";

function CreateEvent({ isCreateEvent, setIsCreateEvent }) {
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");
	const [eventAddr, setEventAddr] = useState("");
	const [price, setPrice] = useState(0);
	const [capacity, setCapacity] = useState(0);
	const [destinations, setDestinations] = useState([]);
	const adminID = getAdminId();

	const createEvent = async (e) => {
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

		try {
			await fetch(buildUrl("/event/create-event"), {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					creatorID: adminID,
					eventName,
					eventDesc,
					eventAddr,
					price,
					capacity,
					dateStart: destinations[0].date,
					dateEnd: destinations[destinations.length - 1].date,
					locations: [...destinations],
				}),
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddLocation = () => {
		setDestinations([
			...destinations,
			{ locName: "", desc: "", date: "", eventStart: "", eventEnd: "" },
		]);
	};

	const handleSetLocation = (index, field, value) => {
		const newDestinations = [...destinations];
		newDestinations[index] = {
			...newDestinations[index],
			[field]: value,
		};
		setDestinations(newDestinations);
	};

	const handleRemoveLocation = (e, index) => {
		e.preventDefault();
		const newDestinations = [...destinations];
		newDestinations.splice(index, 1);
		setDestinations(newDestinations);
	};

	return (
		<>
			<ToastContainer />
			{isCreateEvent && (
				<div
					className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
						blur ? "backdrop-blur-lg" : ""
					}`}>
					<motion.form
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.8,
							delay: 0.5,
							ease: [0, 0.71, 0.2, 1.01],
						}}
						className='flex flex-col gap-4 p-10 w-5/12 bg-white absolute z-10 left-62 top-20 bg-blend-overlay shadow-2xl'>
						<button
							onClick={() => setIsCreateEvent(!isCreateEvent)}
							className='text-primary flex justify-end'>
							<AiOutlineCloseCircle size={40} />
						</button>
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
							placeholder='Event Description'
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
								placeholder='Price'
								onChange={(e) => setPrice(e.target.value)}
								className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
							/>
							<input
								type='number'
								placeholder='Capacity'
								onChange={(e) => setCapacity(e.target.value)}
								className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
							/>
						</div>
						<div>
							<div className='flex flex-col gap-2'>
								<h1 className='text-xl font-semibold'>Destinations</h1>
								<p className='flex items-center gap-4 mb-2 text-gray'>
									<AiOutlineExclamationCircle /> Note that the dates of your destinations
									must be in sequence
								</p>
								{destinations.map((_location, index) => {
									return (
										<div
											key={index}
											className='flex flex-row items-center bg-gray-400 max-h-10'>
											<input
												type='text'
												placeholder='Location'
												name='locName'
												onChange={(e) =>
													handleSetLocation(index, "locName", e.target.value)
												}
											/>
											<textarea
												type='text'
												placeholder='Description'
												name='desc'
												onChange={(e) => handleSetLocation(index, "desc", e.target.value)}
											/>
											<input
												type='date'
												placeholder='Date'
												name='date'
												onChange={(e) => handleSetLocation(index, "date", e.target.value)}
											/>
											<input
												type='time'
												placeholder='Event Start'
												name='time'
												onChange={(e) =>
													handleSetLocation(index, "eventStart", e.target.value)
												}
											/>
											<input
												type='time'
												placeholder='Event End'
												name='time'
												onChange={(e) =>
													handleSetLocation(index, "eventEnd", e.target.value)
												}
											/>
											<button onClick={(e) => handleRemoveLocation(e, index)}>
												Remove
											</button>
										</div>
									);
								})}
							</div>
							<button
								onClick={handleAddLocation}
								type='button'
								className='bg-secondary text-white py-2 px-4 rounded-md mt-10'>
								Add Destination
							</button>
						</div>
						<button
							type='button'
							onClick={createEvent}
							className='bg-primary text-white py-2 px-4 rounded-md flex justify-center'>
							Create Event
						</button>
					</motion.form>
				</div>
			)}
		</>
	);
}

export default CreateEvent;
