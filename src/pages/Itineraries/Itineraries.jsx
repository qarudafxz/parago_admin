// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl";
import { getAdminId } from "../../helpers/getAdminId";
import TopLoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { AiOutlineExclamationCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { Tooltip } from "@mui/material";

function Itineraries() {
	// const [transpo, setTranspo] = useState("");
	// const [hotel, setHotel] = useState("");
	// const [food, setFood] = useState("");

	const locType = [
		{ key: 1, value: "beach", label: "Beach" },
		{ key: 2, value: "mountain", label: "Mountain" },
		{ key: 3, value: "forest", label: "Forest" },
		{ key: 4, value: "lake", label: "Lake" },
		{ key: 5, value: "river", label: "River" },
		{ key: 6, value: "waterfall", label: "Waterfall" },
		{ key: 7, value: "cave", label: "Cave" },
		{ key: 8, value: "island", label: "Island" },
		{ key: 9, value: "museum", label: "Museum" },
		{ key: 10, value: "park", label: "Park" },
		{ key: 11, value: "zoo", label: "Zoo" },
		{ key: 12, value: "theme park", label: "Theme Park" },
		{ key: 13, value: "garden", label: "Garden" },
		{ key: 14, value: "church", label: "Church" },
		{ key: 15, value: "temple", label: "Temple" },
		{ key: 16, value: "mosque", label: "Mosque" },
		{ key: 17, value: "cathedral", label: "Cathedral" },
		{ key: 18, value: "castle", label: "Castle" },
	];

	const choices = ["Transportation", "Hotel", "Food"];

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
			destinations.some((destination) => {
				return Object.values(destination).some(
					(value) => value === null || value === undefined || value === ""
				);
			}) ||
			destinations.length === 0
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

		const municipality = localStorage
			.getItem("muni")
			.replace("Municipality of ", "");

		try {
			const res = await fetch(buildUrl("/event/create-event"), {
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
					municipality,
					price: eventData.price,
					capacity: eventData.capacity,
					dateStart: destinations[0].date,
					dateEnd: destinations[destinations.length - 1].date,
					nights: eventData.nights,
					days: eventData.days,
					locations: [...destinations],
				}),
			});

			if (res.ok) {
				setProgress(100);
				setTimeout(() => {
					navigate("/events");
				}, 1000);
			}

			if (!res.ok || res.status >= 401) {
				(async function () {
					const data = await res.json();

					toast.error(data.message, {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				})();
				setProgress(100);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddLocation = () => {
		setDestinations([
			...destinations,
			{
				locName: "",
				locDesc: "",
				type: "",
				desc: "",
				date: "",
				eventStart: "",
				eventEnd: "",
			},
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

	const createItineraryOnPress = (e) => {
		if (e.key === "`") {
			handleAddLocation();
		}
	};

	useEffect(() => {
		const handleCreateItinerary = (e) => {
			createItineraryOnPress(e);
		};

		window.addEventListener("keydown", handleCreateItinerary);

		return () => {
			window.removeEventListener("keydown", handleCreateItinerary);
		};
	});

	return (
		<div className='font-primary w-full p-10'>
			<ToastContainer />
			<TopLoadingBar
				color='#0043DC'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className='flex gap-2 items-center mb-4'>
				<motion.div
					whileHover={{
						initial: { x: 0 },
						x: -9.5,
					}}>
					<Link
						to='/events'
						className='cursor-pointer'>
						<AiOutlineArrowLeft size={25} />
					</Link>
				</motion.div>
				<h1 className='text-3xl font-extrabold'>Event Details</h1>
			</div>
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
					<Tooltip
						title='Try to create itineraries powered by a Generative AI (This feature is currently unaviailable)'
						placement='top'
						arrow>
						<button className='bg-primary opacity-80 text-white shadow-md rounded-md text-sm text-center px-4 py-2'>
							✨ Generate Itineraries
						</button>
					</Tooltip>
				</div>
			</div>
			<div className='mt-10'>
				<div className='flex flex-col'>
					<div className='flex flex-row justify-between items-center'>
						<h1 className='text-4xl font-semibold'>Itineraries</h1>
						<div className='flex flex-row gap-8 items-center'>
							<p className='font-thin text-[#808080]'>Press ` to create Destination</p>
							<button
								onClick={handleAddLocation}
								type='button'
								className='bg-secondary text-white py-2 px-4 rounded-md'>
								Add Destination
							</button>
						</div>
					</div>
					<h1>Intineraries: {counter}</h1>
					<p className='flex items-center gap-4 mb-2 text-gray'>
						<AiOutlineExclamationCircle /> Note that the dates of your itineraries
						must be in sequence
					</p>
					<div style={{ maxHeight: "600px", overflow: "auto" }}>
						<div className='w-full grid grid-rows-12 gap-2 scroll'>
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
											placeholder='Location Description'
											name='desc'
											onChange={(e) => handleSetLocation(index, "locDesc", e.target.value)}
										/>
										<Dropdown
											className='pl-2 py-2 rounded-md text-primary focus:outline-none'
											options={locType}
											onChange={(locType) =>
												handleSetLocation(index, "type", locType?.value)
											}
											placeholder='Destination Type'
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
										<Dropdown
											className='pl-2 py-2 rounded-md text-primary focus:outline-none'
											options={choices}
											// onChange={(choices) => handleAccommodation(choices?.value)}
											placeholder='Select Accommodation'
										/>
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
