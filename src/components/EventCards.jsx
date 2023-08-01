import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAdminId } from "../helpers/getAdminId.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import { FaUsers, FaSearchLocation } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTrashFill, BsMoonStarsFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { HiSun } from "react-icons/hi";

import { Skeleton } from "@mui/material";
import TopLoadingBar from "react-top-loading-bar";

function EventCards({ fetchData, isLoaded, setData, fetchEvents }) {
	const [isClicked, setIsClicked] = useState(false);
	const [eventID, setEventID] = useState("");
	const adminID = getAdminId();
	const [progress, setProgress] = useState(0);

	const deleteEvent = async (id, e) => {
		e.preventDefault();
		setProgress(50);
		try {
			const url = import.meta.env.DEV
				? `http://localhost:3001/api/event/delete-event/${id}/`
				: `/api/event/delete-event/${id}/`;

			await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					adminID,
				}),
			}).then((res) => {
				if (res.ok) {
					setData((prevEvents) => prevEvents.filter((event) => event._id !== id));
					toast.success("Event successfully deleted", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
						theme: "light",
					});
					setProgress(100);
				}
				setIsClicked(false);
			});
		} catch (err) {
			console.error(err);
		}
	};

	const deleteConfirmationComponent = (eventID) => {
		return (
			<div>
				<TopLoadingBar
					color='#0043DC'
					progress={progress}
					height={10}
					onLoaderFinished={() => setProgress(0)}
				/>
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-md'>
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.8,
							delay: 0.5,
							ease: [0, 0.71, 0.2, 1.01],
						}}
						className='bg-white rounded-md px-28 py-14 place-items-center'>
						<TbTrash
							size={100}
							className='m-auto mb-4 text-primary'
						/>
						<h1 className='font-bold text-5xl text-center mb-4'>Are you sure?</h1>
						<h1 className='text-md font-thin text-gray flex items-center justify-between'>
							Are you sure you want to delete this event?
						</h1>
						<div className='flex flex-row gap-4 mt-8 place-content-center'>
							<button
								type='button'
								onClick={(e) => deleteEvent(eventID, e)}
								className='bg-primary py-2 px-8 rounded-md font-semibold text-white hover:bg-[#0032a8] duration-150'>
								Yes
							</button>
							<button
								type='button'
								onClick={() => setIsClicked(false)}
								className='border border-secondary py-2 px-8 rounded-md font-semibold text-secondary'>
								No
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		);
	};

	const checkEvent = async (eventID) => {
		const url = import.meta.env.DEV
			? `http://localhost:3001/api/event/check-event/${eventID}/`
			: `/api/event/check-event/${eventID}/`;
		try {
			await fetch(url, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					toast.success(data.message, {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
						theme: "light",
					});
					setTimeout(() => {
						fetchEvents();
					}, 4000);
				});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			{fetchData?.length > 0 ? (
				fetchData?.map((event) => {
					return (
						<div
							key={event._id}
							className='flex flex-col gap-3 shadow-md border border-[#d3d3d3] rounded-md md:p-5 xl:p-10'
							style={{
								height: `${
									window.innerWidth >= 1020 && window.innerWidth < 1620
										? "380px"
										: "430px"
								}`,
							}}>
							{isLoaded ? (
								<div className='flex justify-between'>
									<div className='flex gap-4'>
										<h1
											className={`font-semibold flex items-center justify-between ${
												!event.isFinished ? "text-primary" : "text-zinc-500 line-through"
											} md:text-lg xl:text-3xl`}>
											{event.eventName}{" "}
										</h1>
										<span className='text-zinc-500 text-xs font-thin'>
											{event.isFinished && "(finished)"}
										</span>
									</div>
									<div className='flex gap-4 items-center'>
										{!event.isFinished && (
											<button
												onClick={() => checkEvent(event._id)}
												className='border border-zinc-400 px-4 py-1 rounded-full text-zinc-400 hover:bg-zinc-900 duration-200 hover:text-white hover:border-none'>
												Done
											</button>
										)}
										<BsTrashFill
											size={30}
											className='cursor-pointer text-primary hover:text-secondary duration-150'
											type='button'
											onClick={() => {
												setIsClicked(true);
												setEventID(event._id);
											}}
										/>
									</div>
								</div>
							) : (
								<Skeleton
									variant='text'
									width={"100%"}
									height={90}
								/>
							)}
							{isLoaded ? (
								<p
									className={`text-justify truncate pb-4 ${
										event.isFinished && "text-zinc-500"
									} md:text-sm xl:text-lg`}>
									{event.eventDesc}
								</p>
							) : (
								<Skeleton
									variant='text'
									width={"100%"}
									height={30}
								/>
							)}
							<div className='flex flex-row justify-between'>
								{isLoaded ? (
									<p
										className={`text-sm text-justify font-thin flex items-center gap-4 w-6/12 ${
											event.isFinished && "text-zinc-500"
										}`}>
										<HiOutlineLocationMarker />
										{event.eventAddr}
									</p>
								) : (
									<Skeleton
										variant='text'
										width={"100%"}
										height={30}
									/>
								)}
								<div className='flex flex-row gap-4'>
									{isLoaded ? (
										<p
											className={`flex items-center gap-1 ${
												!event.isFinished ? "text-secondary" : "text-zinc-500"
											} md:text-xs xl:text-lg`}>
											<HiSun size={20} />
											{event.days > 1 ? `${event.days} days` : `${event.days} day`}
										</p>
									) : (
										<Skeleton
											variant='text'
											width={100}
											height={30}
										/>
									)}
									{isLoaded ? (
										<p
											className={`flex items-center gap-1 ${
												!event.isFinished ? "text-primary" : "text-zinc-500"
											} md:text-xs xl:text-lg`}>
											<BsMoonStarsFill size={20} />
											{event.nights > 1
												? `${event.nights} nights`
												: `${event.nights} night`}
										</p>
									) : (
										<Skeleton
											variant='text'
											width={100}
											height={30}
										/>
									)}
								</div>
							</div>
							<hr></hr>
							<div className='flex items-center gap-8 my-4'>
								{isLoaded ? (
									<p
										className={`flex flex-row gap-4 items-center px-4 py-2 rounded-md ${
											!event.isFinished
												? "text-primary border border-primary"
												: "text-zinc-500 border border-zinc-500"
										} md:text-xs xl:text-lg`}>
										<p>₱</p>
										{event.price.toFixed(2)}
									</p>
								) : (
									<Skeleton
										variant='text'
										width={100}
										height={85}
									/>
								)}
								{isLoaded ? (
									<p
										className={`flex flex-row gap-4 items-center px-4 py-2 rounded-md ${
											!event.isFinished
												? "text-primary border border-primary"
												: "text-zinc-500 border border-zinc-500"
										} md:text-xs xl:text-lg`}>
										<FaUsers />
										{event.capacity}
									</p>
								) : (
									<Skeleton
										variant='text'
										width={100}
										height={85}
									/>
								)}
								{isLoaded ? (
									<p
										className={`flex flex-row gap-4 items-center px-4 py-2 rounded-md ${
											!event.isFinished
												? "text-primary border border-primary"
												: "text-zinc-500 border border-zinc-500"
										} md:text-xs xl:text-lg`}>
										<FaSearchLocation />
										{event?.locations?.length}
									</p>
								) : (
									<Skeleton
										variant='text'
										width={100}
										height={85}
									/>
								)}
							</div>
							{isLoaded ? (
								<>
									<p className='text-xs'>
										Date Created:{" "}
										{new Date(event?.dateCreated).toLocaleDateString("en-us", {
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
											second: "numeric",
											hour12: true,
										})}
									</p>
									<div className='flex justify-between bg-[#eaeaea] py-4 px-4 rounded-lg items-center'>
										<p className='text-[#ababab] text-xs'>
											Check the full information of this event
										</p>
										<Link
											to={`/event/${event._id}`}
											state={{ id: event._id }}
											className={`py-2 px-4 rounded-md font-bold ${
												!event.isFinished
													? "text-white bg-primary hover:bg-[#0032a8] duration-150"
													: "text-zinc-700 bg-zinc-500"
											} md:text-md xl:text-lg`}>
											View Event
										</Link>
									</div>
								</>
							) : (
								<Skeleton
									variant='rectangular'
									width={"100%"}
									height={80}
								/>
							)}
						</div>
					);
				})
			) : (
				<div className='flex flex-col gap-2 place-content-center'>
					<h1 className='font-extrabold text-primary md:text-4xl xl:text-7xl'>
						No existing events
					</h1>
				</div>
			)}
			{isClicked && deleteConfirmationComponent(eventID)}
		</>
	);
}

export default EventCards;
