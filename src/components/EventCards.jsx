import React from "react";
import { Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaUsers, FaSearchLocation } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTrashFill } from "react-icons/bs";

import { Skeleton } from "@mui/material";

function EventCards({ fetchData, isLoaded, setData }) {
	const deleteEvent = async (id, e) => {
		e.preventDefault();
		try {
			const url = import.meta.env.DEV
				? `http://localhost:3001/api/event/delete-event/${id}`
				: `/api/event/delete-event/${id}`;

			await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
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
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			{fetchData.length > 0 ? (
				fetchData.map((event) => {
					return (
						<div
							key={event._id}
							className='flex flex-col gap-3 p-10 shadow-md border border-[#d3d3d3] rounded-md'
							style={{ height: "400px" }} // Set a fixed height here
						>
							{isLoaded ? (
								<h1 className='text-3xl font-semibold text-primary flex items-center justify-between'>
									{event.eventName}
									<BsTrashFill
										size={30}
										className='cursor-pointer hover:text-secondary duration-150'
										type='button'
										onClick={(e) => deleteEvent(event._id, e)}
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
								<p className='text-lg text-justify truncate'>{event.eventDesc}</p>
							) : (
								<Skeleton
									variant='text'
									width={"100%"}
									height={30}
								/>
							)}
							{isLoaded ? (
								<p className='text-sm text-justify font-thin flex items-center gap-4'>
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
		</>
	);
}

export default EventCards;
