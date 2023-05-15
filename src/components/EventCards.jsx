import React from "react";
import { Link } from "react-router-dom";

import { FaRegMoneyBillAlt, FaUsers } from "react-icons/fa";
import { TbKayak } from "react-icons/tb";

function EventCards({ fetchData }) {
	return (
		<>
			{fetchData &&
				fetchData.map((event) => {
					return (
						<div
							key={event._id}
							className='flex flex-col gap-3 p-10 shadow-2xl border border-[#d3d3d3] rounded-md'>
							<h1 className='text-3xl font-semibold text-primary'>
								{event.eventName}
							</h1>
							<p className='text-sm text-justify'>{event.eventDesc}</p>
							<div className='flex items-center gap-8 my-4'>
								<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
									<FaRegMoneyBillAlt />
									{event.price.toFixed(2)}
								</p>
								<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
									<FaUsers />
									{event.capacity}
								</p>{" "}
								<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
									<TbKayak />
									{event?.locations?.length}
								</p>
							</div>
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
						</div>
					);
				})}
		</>
	);
}

export default EventCards;
