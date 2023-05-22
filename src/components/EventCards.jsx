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

function EventCards({ fetchData, isLoaded, setData }) {
	const [isClicked, setIsClicked] = useState(false);
	const [eventID, setEventID] = useState("");
	const adminID = getAdminId();

	const deleteEvent = async (id, e) => {
		e.preventDefault();
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

	return (
		<>
			{fetchData?.length > 0 ? (
				fetchData?.map((event) => {
					return (
						<div
							key={event._id}
							className='flex flex-col gap-3 p-10 shadow-md border border-[#d3d3d3] rounded-md'
							style={{ height: "430px" }} // Set a fixed height here
						>
							{isLoaded ? (
								<h1 className='text-3xl font-semibold text-primary flex items-center justify-between'>
									{event.eventName}
									<BsTrashFill
										size={30}
										className='cursor-pointer hover:text-secondary duration-150'
										type='button'
										onClick={() => {
											setIsClicked(true);
											setEventID(event._id);
										}}
									/>
								</h1>
							) : (
								<Skeleton
									variant='text'
									width={"100%"}
									height={90}
								/>
							)}
							{isLoaded ? (
								<p className='text-lg text-justify truncate pb-4'>{event.eventDesc}</p>
							) : (
								<Skeleton
									variant='text'
									width={"100%"}
									height={30}
								/>
							)}
							<div className='flex flex-row justify-between'>
								{isLoaded ? (
									<p className='text-sm text-justify font-thin flex items-center gap-4 w-6/12'>
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
										<p className='flex items-center gap-1 text-secondary'>
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
										<p className='flex items-center gap-1 text-primary'>
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
									<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
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
									<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
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
									<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
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
											className='bg-primary py-2 px-4 rounded-md font-bold text-white hover:bg-[#0032a8] duration-150'>
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
				<h1>No existing events.</h1>
			)}
			{isClicked && deleteConfirmationComponent(eventID)}
		</>
	);
}

export default EventCards;
