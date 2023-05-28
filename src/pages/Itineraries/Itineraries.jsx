import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl";
import { getAdminId } from "../../helpers/getAdminId";
import TopLoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";

import { AiOutlineExclamationCircle } from "react-icons/ai";

function Itineraries() {
	const navigate = useNavigate();
	const location = useLocation();
	const { eventData } = location.state;
	const [progress, setProgress] = useState(0);
	const [destinations, setDestinations] = useState([]);
	const [counter, setCounter] = useState(0);
	const adminID = getAdminId();

	const createEvent = async (e) => {
		e.preventDefault();
		setProgress(50);

		if (
			(destinations.length == 0 || destinations[0] == "",
			destinations[1] == "",
			destinations[2] == "")
		) {
			toast.error("Please provide itineraries!", {
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

		try {
			await fetch(buildUrl("/event/create-event"), {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					creatorID: adminID,
					eventName: eventData.eventName,
					eventDesc: eventData.eventDesc,
					eventAddr: eventData.eventAddr,
					price: eventData.price,
					capacity: eventData.capacity,
					dateStart: destinations[0].date,
					dateEnd: destinations[destinations.length - 1].date,
					nights: eventData.nights,
					days: eventData.days,
					locations: [...destinations],
				}),
			}).then((res) => {
				if (res.ok) {
					setProgress(100);
					setTimeout(() => {
						navigate("/events");
					}, 1000);
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddLocation = () => {
		setDestinations([
			...destinations,
			{ locName: "", desc: "", date: "", eventStart: "", eventEnd: "" },
		]);
		setCounter(counter + 1);
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
		setCounter(counter - 1);
	};

	return (
		<div className='font-primary w-full p-10'>
			<ToastContainer />
			<TopLoadingBar
				color='#0043DC'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<h1 className='text-3xl font-extrabold mb-4'>Event Details</h1>
			<div className='grid grid-cols-2 gap-2'>
				<div className='flex flex-row gap-4 items-center border border-gray rounded-md py-2 pl-4 shadow-md'>
					<h1 className='text-xl font-semibold'>Event Name</h1>
					<p>{eventData.eventName}</p>
				</div>
				<div className='flex flex-row gap-4 items-center border border-gray rounded-md py-2 pl-4 shadow-md'>
					<h1 className='text-xl font-semibold'>Event Description</h1>
					<p>{eventData.eventDesc}</p>
				</div>
				<div className='flex flex-row gap-4 items-center  border border-gray rounded-md py-2 pl-4 shadow-md'>
					<HiOutlineLocationMarker />
					<p>{eventData.eventAddr}</p>
				</div>
				<div className='flex flex-row gap-4'>
					<div className='flex flex-row gap-4 items-center border border-secondary px-6 py-2 rounded-md text-secondary '>
						<BsSunFill />
						<p>{eventData.days}</p>
					</div>
					<div className='flex flex-row gap-4 items-center border border-primary px-6 py-2 rounded-md text-primary'>
						<BsFillMoonStarsFill />
						<p>{eventData.nights}</p>
					</div>
				</div>
			</div>
			<div className='mt-10'>
				<div className='flex flex-col'>
					<div className='flex flex-row justify-between items-center'>
						<h1 className='text-4xl font-semibold'>Itineraries</h1>
						<button
							onClick={handleAddLocation}
							type='button'
							className='bg-secondary text-white py-2 px-4 rounded-md mt-10'>
							Add Destination
						</button>
					</div>
					<h1>Intineraries: {counter}</h1>
					<p className='flex items-center gap-4 mb-2 text-gray'>
						<AiOutlineExclamationCircle /> Note that the dates of your itineraries
						must be in sequence
					</p>
					<div style={{ height: "40%", overflow: "auto" }}>
						{destinations.map((_location, index) => {
							return (
								<div
									key={index}
									className='flex flex-row justify-evenly items-center border-2 border-b-[#c5c5c5]'>
									<input
										type='text'
										placeholder='Location'
										name='locName'
										onChange={(e) => handleSetLocation(index, "locName", e.target.value)}
										className='py-2 pl-4'
									/>
									<textarea
										type='text'
										placeholder='Itinerary'
										name='desc'
										onChange={(e) => handleSetLocation(index, "desc", e.target.value)}
									/>
									<div>
										<p>Date: </p>
										<input
											type='date'
											placeholder='Date'
											name='date'
											onChange={(e) => handleSetLocation(index, "date", e.target.value)}
										/>
									</div>
									<div>
										<p>Time start: </p>
										<input
											type='time'
											placeholder='Event Start'
											name='time'
											onChange={(e) =>
												handleSetLocation(index, "eventStart", e.target.value)
											}
										/>
									</div>
									<div>
										<p>Time end:</p>
										<input
											type='time'
											placeholder='Event End'
											name='time'
											onChange={(e) =>
												handleSetLocation(index, "eventEnd", e.target.value)
											}
										/>
									</div>
									<button
										onClick={(e) => handleRemoveLocation(e, index)}
										className='bg-primary text-white py-4 px-6'>
										Remove
									</button>
								</div>
							);
						})}
					</div>
				</div>
				<button
					onClick={createEvent}
					className='absolute bottom-0 mb-4 bg-primary px-4 rounded-md py-2 text-white font-bold'>
					Create Event
				</button>
			</div>
		</div>
	);
}

export default Itineraries;
