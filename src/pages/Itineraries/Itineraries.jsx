// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl";
import { getAdminId } from "../../helpers/getAdminId";
import TopLoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import {
	AiOutlineExclamationCircle,
	AiOutlineArrowLeft,
	AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { toaster } from "../../helpers/toaster";
import { locType } from "../../data/loctype";
import { Caution } from "../../components/Caution";

function Itineraries() {
	// const [transpo, setTranspo] = useState("");
	// const [hotel, setHotel] = useState("");
	// const [food, setFood] = useState("");
	const [aiLoad, isAiLoad] = useState(true);
	const [back, setBack] = useState(false);

	const choices = ["Transportation", "Hotel", "Food"];

	const navigate = useNavigate();
	const location = useLocation();
	const { eventData } = location.state;
	const [progress, setProgress] = useState(0);
	const [destinations, setDestinations] = useState([]);
	const adminID = getAdminId();

	const menu = [
		{
			title: "Event Name",
			description: eventData.eventName,
			icon: null,
		},
		{
			title: "Event Description",
			description: eventData.eventDesc,
			icon: null,
		},
		{
			title: "",
			description: eventData.eventAddr,
			icon: <HiOutlineLocationMarker />,
		},
	];

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
			toaster("error", "Please provide itineraries!");

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
					toaster("error", data.message);
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

	const createItineraryOnPress = (e) => {
		if (
			e.key === "x" &&
			e.code === "KeyX" &&
			e.ctrlKey &&
			e.target.nodeName !== "INPUT"
		) {
			handleAddLocation();
		}
	};

	const generateItinerary = async (e) => {
		e.preventDefault();
		isAiLoad(false);

		try {
			const response = await axios.post(
				buildUrl("/event/generate"),
				{
					eventName: eventData.eventName,
					price: eventData.price,
					capacity: eventData.capacity,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				const data = response.data;
				const splitItinerary = data?.itineraries?.content.split("\n");
				const formatItinerary = splitItinerary
					.filter((line) => line.trim().length > 0)
					.map((line) => line.replace(/^\d\.\s?/, ""));

				setDestinations(
					...destinations,
					formatItinerary.map((itinerary) => {
						return {
							locName: "",
							locDesc: "",
							type: "",
							desc: itinerary,
							date: "",
							eventStart: "",
							eventEnd: "",
						};
					})
				);
				toaster("success", "Itinerary generated successfully!");
			}
		} catch (error) {
			console.error(error);
			toaster("error", "Server error, please try again later.");
		} finally {
			isAiLoad(true);
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
					<button
						onClick={() => setBack(true)}
						className='cursor-pointer'>
						<AiOutlineArrowLeft size={25} />
					</button>
				</motion.div>
				<h1 className='text-3xl font-extrabold'>Event Details</h1>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				{menu.map((item, idx) => {
					return (
						<div
							key={idx}
							className='flex flex-row gap-4 items-center border border-gray rounded-md py-2 pl-4 shadow-md'>
							<h1 className='text-xl font-semibold'>{item?.title}</h1>
							{item?.icon}
							<p>{item?.description}</p>
						</div>
					);
				})}

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
						title='Try to create itineraries generated by ChatGPT'
						placement='top'
						arrow>
						<button
							onClick={generateItinerary}
							className={`bg-primary text-white shadow-md rounded-md text-sm text-center px-4 py-2 ${
								!aiLoad && "disabled opacity-95 cursor-not-allowed"
							}`}>
							{aiLoad ? (
								"✨ Generate Itinerary"
							) : (
								<span className='flex gap-4 items-center text-white'>
									<motion.div
										animate={{
											rotate: 360,
										}}
										transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}>
										<AiOutlineLoading3Quarters size={15} />
									</motion.div>
									<p>Generating Itinerary</p>
								</span>
							)}
						</button>
					</Tooltip>
				</div>
			</div>
			<div className='mt-10'>
				<div className='flex flex-col'>
					<div className='flex flex-row justify-between items-center'>
						<h1 className='text-4xl font-semibold'>Itineraries</h1>
						<div className='flex flex-row gap-8 items-center'>
							<button
								onClick={handleAddLocation}
								type='button'
								className='flex gap-2 items-center bg-secondary text-white py-2 px-4 rounded-md'>
								Add Destination
								<span className='text-[10px] font-thin bg-[#d76500] px-[9px] py-1 rounded-md text-[#fdb474] border border-[#fdb474]'>
									CTRL X
								</span>
							</button>
						</div>
					</div>
					<h1>Intineraries: {destinations?.length}</h1>
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
											value={_location.desc}
											className='text-lg border border-zinc-300 p-2'
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
				<Caution
					back={back}
					setBack={setBack}
				/>
			</div>
		</div>
	);
}

export default Itineraries;
