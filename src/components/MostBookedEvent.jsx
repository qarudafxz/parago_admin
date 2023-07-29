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
	const currentDate = new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

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
				.then(() => {
					setLoading(false);
				});
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
			<div className='flex flex-col font-primary shadow-md'>
				<div className='flex flex-row gap-16 justify-between p-10 bg-[#FFC964]'>
					<div className='flex flex-col'>
						<p className='text-left text-sm font-semibold'>Most Booked Event</p>
						{event ? (
							<div className='flex gap-4'>
								<div className='flex flex-col gap-1'>
									<h1 className='font-bold text-[#BD8419] md:text-6xl xl:text-7xl'>
										{loading ? (
											<Skeleton />
										) : (
											<div className='flex flex-col mt-2'>
												<p className='text-sm font-thin'>Event Name</p>
												<span className='text-4xl'>{event?.eventName}</span>
											</div>
										)}
									</h1>
									<p className='text-xl text-[#BD8419]'>
										{/* {fetchedData.admin?.eventsCreated > 1 ? "Events" : "Event"} Created */}
									</p>
								</div>
							</div>
						) : (
							<h1 className='text-3xl text-[#BD8419] font-extrabold'>
								No Events Found
							</h1>
						)}
					</div>
					{event && (
						<div className='flex flex-col gap-2'>
							<h1 className='text-left text-sm font-semibold'>Number of Bookings</h1>
							{loading ? (
								<Skeleton />
							) : (
								<div className='flex gap-2 items-center'>
									<h1 className='text-[#BD8419] font-bold text-7xl'>
										{event?.capacity}
									</h1>
									<div className='flex flex-col'>
										<HiUserCircle
											size={40}
											className='text-[#BD8419]'
										/>
										<p className='text-xs font-semibold text-[#BD8419]'>pax left</p>
									</div>
								</div>
							)}
						</div>
					)}
					<BsFillBookmarkCheckFill
						size={80}
						className='bg-[#F8FFF8] p-4 rounded-md text-[#BD8419]'
					/>
				</div>
				<div className='w-full p-8 bg-white'>
					<h1 className='text-2xl font-bold'>As of {currentDate}</h1>
				</div>
			</div>
		</div>
	);
}

export default MostBookedEvent;
