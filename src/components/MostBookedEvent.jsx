import React, { useState, useEffect } from "react";

import { buildUrl } from "../utils/buildUrl.js";
import { getAdminId } from "../helpers/getAdminId.js";

import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import { Skeleton } from "@mui/material";

function MostBookedEvent() {
	const adminID = getAdminId();
	const [event, setEvent] = useState({});
	const [loading, setLoading] = useState(false);

	const getEvent = async () => {
		try {
			setLoading(true);
			await fetch(
				buildUrl(`/event/top-event/${adminID}`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				})
			)
				.then((res) => res.json())
				.then((data) => {
					setEvent(data.topEvent);
				})
				.then(() => setLoading(false));
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	useEffect(() => {
		getEvent();
	}, []);

	return (
		<div>
			<div
				className='bg-[#131313] py-8 px-10 text-white relative bottom-10 left-20 shadow-2xl'
				style={{ width: "650px" }}>
				<div className='flex justify-between items-center'>
					<h1 className='text-zinc-300 font-extrabold md:text-2xl'>
						Most Booked Event
					</h1>
					<BsFillBookmarkCheckFill
						size={40}
						className='bg-zinc-800 p-2 rounded-md'
					/>
				</div>
				<p className='font-thin text-zinc-500 mt-1 md:text-sm'>
					Calculated based on the remaining pax of the event
				</p>
				{event ? (
					<div className='flex gap-8 items-center'>
						<div className='flex flex-col border border-zinc-800 p-4 mt-4'>
							<p className='text-zinc-600 font-medium text-sm'>Event Name</p>
							<h1 className='text-xl font-bold'>
								{loading ? <Skeleton /> : event?.eventName}
							</h1>
						</div>
						<div>
							<h1 className='font-bold text-primary md:text-6xl'>
								{loading ? <Skeleton /> : event?.capacity}
							</h1>
							<span className='text-zinc-300 font-thin text-xs flex gap-3 items-center'>
								<HiUserCircle size={20} />
								pax left
							</span>
						</div>
						<div className='flex flex-col gap-1'>
							<div className='flex gap-4 items-center '>
								<div className='flex flex-col'>
									<p className='text-xs'>Event Start</p>
									<h1 className='font-bold text-primary md:text-md'>
										{loading ? (
											<Skeleton />
										) : (
											new Date(event?.dateStart).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})
										)}
									</h1>
								</div>
								<div className='flex flex-col'>
									<p className='text-xs'>Event End</p>
									<h1 className='font-bold text-secondary md:text-md'>
										{loading ? (
											<Skeleton />
										) : (
											new Date(event?.dateStart).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})
										)}
									</h1>
								</div>
							</div>
							<h1 className='text-xs font-thin text-zinc-400'>
								Event created on{" "}
								{new Date(event?.createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</h1>
						</div>
					</div>
				) : (
					<h1 className='text-white font-bold text-4xl'>Event not found</h1>
				)}
			</div>
		</div>
	);
}

export default MostBookedEvent;
