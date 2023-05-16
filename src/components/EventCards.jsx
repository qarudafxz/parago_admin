import React from "react";
import { Link } from "react-router-dom";

import { FaRegMoneyBillAlt, FaUsers } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";

import { Skeleton } from "@mui/material";

function EventCards({ fetchData, isLoaded }) {
	return (
		<>
			{fetchData &&
				fetchData.map((event) => {
					return (
						<div
							key={event._id}
							className='flex flex-col gap-3 p-10 shadow-2xl border border-[#d3d3d3] rounded-md'
							style={{ height: "350px" }} // Set a fixed height here
						>
							{isLoaded ? (
								<h1 className='text-3xl font-semibold text-primary'>
									{event.eventName}
								</h1>
							) : (
								<Skeleton
									variant='text'
									width={"100%"}
									height={90}
								/>
							)}
							{isLoaded ? (
								<p className='text-sm text-justify truncate'>{event.eventDesc}</p>
							) : (
								<>
									{[...Array(3)].map((_, index) => (
										<Skeleton
											key={index}
											variant='text'
											width={`${index > 1 ? 80 : 100}%`}
											height={30}
										/>
									))}
								</>
							)}
							<div className='flex items-center gap-8 my-4'>
								{isLoaded ? (
									<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
										<FaRegMoneyBillAlt />
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
											hour: "numeric",
											minute: "numeric",
											second: "numeric",
											hour12: true,
										})}
									</p>
									<div className='flex justify-between bg-[#eaeaea] py-4 px-4 rounded-lg items-center'>
										<p className='text-[#ababab]'>Check it out</p>
										<Link
											to={`/event/${event._id}`}
											state={{ id: event._id }}
											className='bg-primary py-2 px-4 rounded-md font-bold text-white'>
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
				})}
		</>
	);
}

export default EventCards;
